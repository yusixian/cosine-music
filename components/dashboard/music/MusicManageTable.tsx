import { updateMusicPlayCount } from '@/api';
import { MusicDetail, MusicStatus, OrderType } from '@/api/type';
import EnhancedTableToolbar from '@/components/table/EnhancedTableToolbar';
import { useFetchMusicList, useMutationAuditMusic } from '@/hooks/dashboard/music';
import { useTableProps, useTableSortProps } from '@/hooks/table';
import { globalMusicControllerAtom } from '@/store/music/state';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
} from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Image } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { MdAdd, MdDoneAll, MdEdit, MdPlayCircle, MdUnpublished, MdWarning } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

interface HeadCell {
  disablePadding: boolean;
  id: keyof MusicDetail;
  label: string;
  numeric: boolean;
}
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
const headCells: readonly HeadCell[] = [
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
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof MusicDetail) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: OrderType;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof MusicDetail) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

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
        <Button variant="outlined" startIcon={<MdEdit />}>
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

        <Button
          variant="contained"
          onClick={() => {
            console.log({ selected });
          }}
          startIcon={<MdAdd />}
        >
          Test
        </Button>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="紧密视图" />
      </div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} title="所有音乐" />
        <TableContainer>
          <Table sx={{ minWidth: 850 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {isLoading && (
                <div className="flex w-full items-center justify-center py-8">
                  <CircularProgress />
                </div>
              )}
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
                            globalController.list.add({
                              name: row.title,
                              artist: row.foreignArtist,
                              cover: row.coverUrl,
                              lrc: row.lyric,
                              url: row.url,
                            });
                            updateMusicPlayCount(row.id).catch((e) => console.error(e));
                            toast.info(`${row.id} 已加入播放列表!`);
                          }}
                        >
                          <MdPlayCircle className="h-9 w-9" />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">
                      <Chip className="px-3" color={chipColor[row.status]} label={chipLabel[row.status]} />
                    </TableCell>
                    <TableCell align="center">
                      <Image src={row.coverUrl as string} height={100} width={100} alt={row.title} />
                    </TableCell>
                    <TableCell align="center">{row.foreignArtist}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.playCount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Stack>
  );
}
