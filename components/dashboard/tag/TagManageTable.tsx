import { Tag } from '@/api/type';
import EnhancedTableHead, { HeadCell } from '@/components/table/EnhancedTableHead';
import EnhancedTableToolbar from '@/components/table/EnhancedTableToolbar';
import { useMutationBatchDeleteTag } from '@/hooks/dashboard/tag';
import { useTableProps, useTableSortProps } from '@/hooks/table';
import { useFetchTagList } from '@/hooks/tag';
import { Button, CircularProgress, Pagination, Stack, Table, TableBody, TableCell, TableContainer } from '@mui/material';
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

const headCells: readonly HeadCell<Tag>[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: '标签ID',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: '标签名称',
  },
  {
    id: 'color',
    numeric: true,
    disablePadding: false,
    label: '标签颜色',
  },
  {
    id: 'icon',
    numeric: true,
    disablePadding: false,
    label: '标签图标',
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

export default function TagManageTable() {
  const router = useRouter();
  const [rows, setRows] = useState<Tag[]>([]);

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
  } = useTableProps<Tag>({ selectKey: 'id', rows });

  const { order, orderBy, handleRequestSort } = useTableSortProps<Tag>({ orderKey: 'id' });
  const { data, isLoading, refetch } = useFetchTagList({ pageNum: page + 1, pageSize: rowsPerPage, order, orderBy });

  const mutationBatchDelete = useMutationBatchDeleteTag({ onSuccess: () => refetch() });

  const batchDeleteTag = useCallback(() => {
    console.log({ selected });
    if (selected.length === 0) {
      toast.error('请至少选择一个标签');
      return;
    }
    mutationBatchDelete.mutate({ tagIds: selected as number[] });
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
        <Button variant="contained" onClick={() => router.push('/dashboard/tag/add')} startIcon={<MdAdd />}>
          添加标签
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            if (!selected.length) {
              toast.error('请至少选择一首歌曲');
              return;
            }
            router.push(`/dashboard/tag/edit/${selected[0]}`);
          }}
          startIcon={<MdEdit />}
        >
          编辑标签
        </Button>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="紧密视图" />
      </div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} onDelete={batchDeleteTag} title="所有音乐" />
        <TableContainer>
          {isLoading ? (
            <div className="flex w-full items-center justify-center py-8">
              <CircularProgress />
            </div>
          ) : (
            <Table aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead<Tag>
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
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.color}</TableCell>
                      <TableCell align="right">{row.icon}</TableCell>
                      <TableCell align="center" className="whitespace-pre px-2">
                        {row.createdAt && dayjs(row.createdAt).format('YYYY-MM-DD\nHH:mm:ss')}
                      </TableCell>
                      <TableCell align="center" className="whitespace-pre px-2">
                        {row?.updatedAt && dayjs(row.updatedAt).format('YYYY-MM-DD \nHH:mm:ss')}
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
