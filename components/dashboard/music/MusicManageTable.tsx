import { fetchMusicList } from '@/api';
import { MusicDetail, OrderType } from '@/api/type';
import EnhancedTableToolbar from '@/components/table/EnhancedTableToolbar';
import { useFetchMusicList } from '@/hooks/dashboard/music';
import { useTableProps, useTableSortProps } from '@/hooks/table';
import { Button, CircularProgress, Stack, Table, TableBody, TableCell, TableContainer } from '@mui/material';
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
import { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdPlayCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

interface HeadCell {
  disablePadding: boolean;
  id: keyof MusicDetail;
  label: string;
  numeric: boolean;
}

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
    id: 'coverUrl',
    numeric: true,
    disablePadding: false,
    label: '封面图片',
  },
  {
    id: 'playCount',
    numeric: true,
    disablePadding: false,
    label: '播放量',
  },
  {
    id: 'artist',
    numeric: true,
    disablePadding: false,
    label: '歌手',
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

  const { data, isLoading } = useFetchMusicList({ pageNum: page + 1, pageSize: rowsPerPage, order, orderBy });
  console.log({ order, orderBy, rows });
  useEffect(() => {
    if (isLoading) return;
    const { list = [], total = 0 } = data ?? {};
    setRows(list);
    setTotal(total);
  }, [data, isLoading, setRows, setTotal]);

  return (
    <Stack className="w-full" spacing={2}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => router.push('/dashboard/music/add')} startIcon={<MdAdd />}>
          添加音乐
        </Button>
        <Button variant="outlined" startIcon={<MdEdit />}>
          编辑音乐
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            fetchMusicList({})
              .then((data) => {
                toast.success('Yes');
                console.log(data);
              })
              .catch((e) => toast.error(e));
          }}
          startIcon={<MdAdd />}
        >
          Test
        </Button>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="紧密视图" />
      </Stack>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} title="所有音乐" />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
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
                    sx={{ cursor: 'pointer' }}
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
                      <div className="flex items-center">
                        {row.id} <MdPlayCircle onClick={() => toast.info(`${row.id} playing!`)} className="h-9 w-9" />
                      </div>
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">
                      <Image src={row.coverUrl as string} height={80} alt={row.title} />
                    </TableCell>
                    <TableCell align="right">{row.playCount}</TableCell>
                    <TableCell align="right">{row.artist}</TableCell>
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
