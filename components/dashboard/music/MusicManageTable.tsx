import EnhancedTableToolbar from '@/components/table/EnhancedTableToolbar';
import { MusicItem } from '@/hooks/dashboard/music';
import { useTableProps, useTableSortProps } from '@/hooks/table';
import { Button, Stack, Table, TableBody, TableCell, TableContainer } from '@mui/material';
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
import { useMemo } from 'react';
import { MdAdd } from 'react-icons/md';

function createData(id: number, title: string, coverUrl: string): MusicItem {
  return {
    id,
    title,
    coverUrl,
  };
}

const rows = [
  createData(1, 'Cupcake', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(2, 'Donut', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(3, 'Eclair', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(4, 'Frozen yoghurt', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(5, 'Fcascasc', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(6, 'axsacac', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(7, 'cwxassx', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(8, 'Sfwewsqw', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(9, 'Aef2d23', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(10, 'Cfwefwege', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(11, 'Fdqwdq', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
  createData(12, 'Gwfwe23ds', 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof MusicItem;
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
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof MusicItem) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof MusicItem) => (event: React.MouseEvent<unknown>) => {
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
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,

    selected,
    handleSelectAllClick,
    handleSelectClick,
    isSelected,

    dense,
    handleChangeDense,
  } = useTableProps<MusicItem>({ selectKey: 'id', rows });
  const { order, orderBy, handleRequestSort } = useTableSortProps<MusicItem>({ orderKey: 'id' });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows: MusicItem[] = useMemo(
    () =>
      stableSort(rows as any, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ) as MusicItem[],
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Stack className="w-full" spacing={2}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<MdAdd />}>
          添加音乐
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
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected((row as MusicItem).id);
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
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">
                      <Image src={row.coverUrl as string} height={80} alt={row.title} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Stack>
  );
}
