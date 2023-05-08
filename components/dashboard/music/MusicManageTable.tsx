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
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { MdAdd, MdEdit, MdPlayCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

function createData(id: number, title: string, coverUrl: string, playCount: number, artist?: string, url?: string): MusicItem {
  return {
    id,
    title,
    coverUrl,
    playCount,
    artist,
    url,
  };
}

const rows = [
  createData(
    2036803051,
    'メフィスト',
    'http://p1.music.126.net/WNfyUA0wK-5FfdKxFpG6sw==/109951168526842833.jpg?param=130y130',
    10422201,
    '女王蜂',
  ),
  createData(
    2034742057,
    'アイドル',
    'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130',
    2132,
    'YOASOBI	',
  ),
  createData(
    481624926,
    '夕暮',
    'http://p2.music.126.net/_FEnDSt4bLuaJZ3ibgC9Gw==/109951162992550196.jpg?param=130y130',
    1252,
    'Kevinz / 心华',
    'https://backblaze.cosine.ren/music/1378048029_%E5%A4%95%E6%9A%AE.mp3',
  ),
  createData(
    2026565329,
    'Da Capo',
    'http://p2.music.126.net/awzv1LpuBJiKTeB7roh_Aw==/109951168434956885.jpg?param=130y130',
    39312,
    'HOYO-MiX',
  ),
  createData(
    2014336709,
    '我不曾忘记',
    'http://p1.music.126.net/dM_2lEqG7ZP7l0NjoApPFg==/109951168232666774.jpg?param=130y130',
    3002112,
    '花玲 / 张安琪 / 沐霏',
  ),
  createData(
    1968300695,
    '如果仅靠谎言将我的世界照亮',
    'http://p1.music.126.net/mxEjZiDzjVAKfeWuciInTw==/109951167730738022.jpg?param=130y130',
    3100,
    'COP',
    'https://backblaze.cosine.ren/music/1968300695_%E5%A6%82%E6%9E%9C%E4%BB%85%E9%9D%A0%E8%B0%8E%E8%A8%80%E5%B0%86%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C%E7%85%A7%E4%BA%AE.mp3',
  ),
  createData(
    1983534049,
    '如果突然想起我',
    'http://p1.music.126.net/TlmxUEBp68EH4CMe4ROXqQ==/109951167898737755.jpg?param=130y130',
    20121,
    '喵☆酱 / 花玲',
  ),
  createData(
    1375725396,
    'Cyberangel',
    'http://p1.music.126.net/TAiliOjM10DlKiL56fPIMw==/109951163737497396.jpg?param=130y130',
    32192,
    'Hanser',
  ),
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
  const router = useRouter();
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
        <Button variant="contained" onClick={() => router.push('/dashboard/music/add')} startIcon={<MdAdd />}>
          添加音乐
        </Button>
        <Button variant="outlined" startIcon={<MdEdit />}>
          编辑音乐
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
