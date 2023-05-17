import { updateMusicPlayCount } from '@/api';
import { MusicDetail, MusicStatus } from '@/api/type';
import EnhancedTableHead, { HeadCell } from '@/components/table/EnhancedTableHead';
import EnhancedTableToolbar from '@/components/table/EnhancedTableToolbar';
import { useFetchMusicList, useMutationAuditMusic, useMutationBatchDeleteMusic } from '@/hooks/dashboard/music';
import { useTableProps, useTableSortProps } from '@/hooks/table';
import { globalMusicControllerAtom } from '@/store/music/state';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Image } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { MdAdd, MdDoneAll, MdEdit, MdPlayCircle, MdUnpublished, MdWarning } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

const chipColor: { [key in MusicStatus]: 'error' | 'success' | 'warning' } = {
  [MusicStatus.UNAUDITED]: 'warning',
  [MusicStatus.NORMAL]: 'success',
  [MusicStatus.BANNED]: 'error',
};
const chipLabel = {
  [MusicStatus.BANNED]: '不通过',
  [MusicStatus.UNAUDITED]: '待审核',
  [MusicStatus.NORMAL]: '通过',
};
const headCells: readonly HeadCell<MusicDetail>[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: '音乐ID',
  },
  {
    id: 'title',
    numeric: true,
    disablePadding: false,
    label: '音乐标题',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: '审核状态',
  },
  {
    id: 'coverUrl',
    numeric: true,
    disablePadding: false,
    label: '封面图片',
  },
  {
    id: 'foreignArtist',
    numeric: true,
    disablePadding: false,
    label: '歌手',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: '音乐描述',
  },
  {
    id: 'playCount',
    numeric: true,
    disablePadding: false,
    label: '播放量',
  },
  {
    id: 'tags',
    numeric: true,
    disablePadding: false,
    label: '标签',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: '创建日期',
  },
  {
    id: 'updatedAt',
    numeric: true,
    disablePadding: false,
    label: '更新日期',
  },
  {
    id: 'deletedAt',
    numeric: true,
    disablePadding: false,
    label: '删除日期',
  },
];

export default function MusicManageTable() {
  const router = useRouter();
  const [rows, setRows] = useState<MusicDetail[]>([]);

  const {
    page,
    rowsPerPage,
    total,
    setTotal,
    handleChangePage,
    handleChangeRowsPerPage,

    selected,
    handleSelectAllClick,
    handleSelectClick,
    isSelected,

    dense,
    handleChangeDense,
  } = useTableProps<MusicDetail>({ selectKey: 'id', rows });

  const { order, orderBy, handleRequestSort } = useTableSortProps<MusicDetail>({ orderKey: 'id' });
  const globalController = useRecoilValue(globalMusicControllerAtom);
  const { data, isLoading, refetch } = useFetchMusicList({ pageNum: page + 1, pageSize: rowsPerPage, order, orderBy });

  const mutationMusicAudit = useMutationAuditMusic({ onSuccess: () => refetch() });
  const mutationBatchDelete = useMutationBatchDeleteMusic({ onSuccess: () => refetch() });

  const batchAuditMusic = useCallback(
    (status: MusicStatus) => {
      console.log({ selected, status });
      if (selected.length === 0) {
        toast.error('请至少选择一首歌曲');
        return;
      }
      mutationMusicAudit.mutate({ musicIds: selected as number[], status });
    },
    [mutationMusicAudit, selected],
  );

  const batchDeleteMusic = useCallback(() => {
    console.log({ selected });
    if (selected.length === 0) {
      toast.error('请至少选择一首歌曲');
      return;
    }
    mutationBatchDelete.mutate({ musicIds: selected as number[] });
  }, [mutationBatchDelete, selected]);

  useEffect(() => {
    if (isLoading) return;
    const { list = [], total = 0 } = data ?? {};
    setRows(list);
    setTotal(total);
  }, [data, isLoading, setRows, setTotal]);

  return (
    <Stack className="w-full" spacing={2}>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="contained" onClick={() => router.push('/dashboard/music/add')} startIcon={<MdAdd />}>
          添加音乐
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            if (!selected.length) {
              toast.error('请至少选择一首歌曲');
              return;
            }
            router.push(`/dashboard/music/edit/${selected[0]}`);
          }}
          startIcon={<MdEdit />}
        >
          编辑音乐
        </Button>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <LoadingButton
            variant="contained"
            loading={mutationMusicAudit.isLoading}
            color="warning"
            onClick={() => batchAuditMusic(MusicStatus.UNAUDITED)}
            startIcon={<MdWarning />}
          >
            待审
          </LoadingButton>
          <LoadingButton
            color="success"
            variant="contained"
            loading={mutationMusicAudit.isLoading}
            onClick={() => batchAuditMusic(MusicStatus.NORMAL)}
            startIcon={<MdDoneAll />}
          >
            过审
          </LoadingButton>
          <LoadingButton
            color="error"
            variant="contained"
            loading={mutationMusicAudit.isLoading}
            onClick={() => batchAuditMusic(MusicStatus.BANNED)}
            startIcon={<MdUnpublished />}
          >
            封禁
          </LoadingButton>
        </ButtonGroup>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="紧密视图" />
      </div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} onDelete={batchDeleteMusic} title="所有音乐" />
        <TableContainer>
          {isLoading ? (
            <div className="flex w-full items-center justify-center py-8">
              <CircularProgress />
            </div>
          ) : (
            <Table aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead<MusicDetail>
                headCells={headCells}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected((row as MusicDetail).id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleSelectClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      className="cursor-pointer overflow-auto"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <div className="flex items-center gap-2">
                          {row.id}
                          <IconButton
                            color="primary"
                            aria-label="playing"
                            onClick={() => {
                              const len = globalController.list?.audios?.length;
                              globalController.list.add({
                                name: row.title,
                                artist: row.foreignArtist,
                                cover: row.coverUrl,
                                lrc: row.lyric,
                                url: row.url,
                              });
                              globalController.list.switch(len);
                              globalController.play();
                              updateMusicPlayCount(row.id).catch((e) => console.error(e));
                              toast.info(`${row.id} 已加入播放列表!`);
                            }}
                          >
                            <MdPlayCircle className="h-9 w-9" />
                          </IconButton>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="w-28 font-bold">{row.title}</div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="w-[5.5rem]">
                          <Chip className="px-2" color={chipColor[row.status]} label={chipLabel[row.status]} />
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <Image src={row.coverUrl as string} height={100} width={100} alt={row.title} />
                      </TableCell>
                      <TableCell align="center">
                        <div className="w-[5.5rem]">{row.foreignArtist}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="w-36">{row.description}</div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="w-[5.2rem]">{row.playCount}</div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex w-[7rem] flex-wrap items-center gap-2">
                          {row.tags.map(({ name, id }) => (
                            <Chip key={id} label={name} />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell align="center" className="whitespace-pre px-2">
                        <div className="w-[7rem]">{row.createdAt && dayjs(row.createdAt).format('YYYY-MM-DD\nHH:mm:ss')}</div>
                      </TableCell>
                      <TableCell align="center" className="whitespace-pre px-2">
                        <div className="w-[7rem]">{row?.updatedAt && dayjs(row.updatedAt).format('YYYY-MM-DD \nHH:mm:ss')}</div>
                      </TableCell>
                      <TableCell align="center" className="whitespace-pre px-2">
                        <div className="w-[7rem]">{row?.deletedAt && dayjs(row.deletedAt).format('YYYY-MM-DD \nHH:mm:ss')}</div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <div className="mt-4 flex items-center justify-between gap-2">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
          <Pagination
            color="primary"
            page={page + 1}
            onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
            count={data?.totalPages}
          />
        </div>
      </Paper>
    </Stack>
  );
}
