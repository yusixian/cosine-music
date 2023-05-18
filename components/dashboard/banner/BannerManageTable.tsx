import { Banner } from '@/api/type';
import EnhancedTableHead, { HeadCell } from '@/components/table/EnhancedTableHead';
import EnhancedTableToolbar from '@/components/table/EnhancedTableToolbar';
import { useMutationBatchDeleteBanner } from '@/hooks/dashboard/banner';
import { useTableProps, useTableSortProps } from '@/hooks/table';
import { useFetchBannerList } from '@/hooks/banner';
import { Button, Chip, CircularProgress, Pagination, Stack, Table, TableBody, TableCell, TableContainer } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { MdAdd, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import { BannerStatus } from '@/api/type';
import { Image } from 'antd';

const headCells: readonly HeadCell<Banner>[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: '轮播图ID',
  },
  {
    id: 'title',
    numeric: true,
    disablePadding: false,
    label: '标题',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: '描述',
  },
  {
    id: 'url',
    numeric: true,
    disablePadding: false,
    label: '图片',
  },
  {
    id: 'href',
    numeric: true,
    disablePadding: false,
    label: '链接',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: '状态',
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
];

export default function BannerManageTable() {
  const router = useRouter();
  const [rows, setRows] = useState<Banner[]>([]);

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
  } = useTableProps<Banner>({ selectKey: 'id', rows });

  const { order, orderBy, handleRequestSort } = useTableSortProps<Banner>({ orderKey: 'id' });
  const { data, isLoading, refetch } = useFetchBannerList({ pageNum: page + 1, pageSize: rowsPerPage, order, orderBy });

  const mutationBatchDelete = useMutationBatchDeleteBanner({ onSuccess: () => refetch() });

  const batchDeleteBanner = useCallback(() => {
    console.log({ selected });
    if (selected.length === 0) {
      toast.error('请至少选择一个轮播图');
      return;
    }
    mutationBatchDelete.mutate({ bannerIds: selected as number[] });
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
        <Button variant="contained" onClick={() => router.push('/dashboard/banner/add')} startIcon={<MdAdd />}>
          添加轮播图
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            if (!selected.length) {
              toast.error('请至少选择一个轮播图');
              return;
            }
            router.push(`/dashboard/banner/edit/${selected[0]}`);
          }}
          startIcon={<MdEdit />}
        >
          编辑轮播图
        </Button>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="紧密视图" />
      </div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} onDelete={batchDeleteBanner} title="所有轮播图" />
        <TableContainer>
          {isLoading ? (
            <div className="flex w-full items-center justify-center py-8">
              <CircularProgress />
            </div>
          ) : (
            <Table aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead<Banner>
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
                  const isItemSelected = isSelected(row.id);
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
                        <div className="w-20">{row.id}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="w-24">{row.title}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="w-24">{row.description}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex flex-col items-center gap-1">
                          {row.url} <Image className="h-20" src={row.url} alt={`${row.id} cover`} />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="min-w-20 overflow-auto">{row.href}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="w-20">
                          {row.status === BannerStatus.BANNED ? (
                            <Chip color="error" label="封禁" />
                          ) : (
                            <Chip color="success" label="正常" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell align="center" className="whitespace-pre px-2">
                        <div className="min-w-20">{row.createdAt && dayjs(row.createdAt).format('YYYY-MM-DD\nHH:mm:ss')}</div>
                      </TableCell>
                      <TableCell align="center" className="whitespace-pre px-2">
                        <div className="min-w-20">{row?.updatedAt && dayjs(row.updatedAt).format('YYYY-MM-DD \nHH:mm:ss')}</div>
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
