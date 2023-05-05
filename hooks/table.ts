import { useState } from 'react';

export function useTableProps<T>({ rows, selectKey }: { rows: T[]; selectKey: keyof T }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 分页
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // select
  const [selected, setSelected] = useState<readonly T[keyof T][]>([]);
  const isSelected = (selectValue: T[keyof T]) => selected.indexOf(selectValue) !== -1;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n[selectKey]);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (event: React.MouseEvent<unknown>, selectValue: T[keyof T]) => {
    const selectedIndex = selected.indexOf(selectValue);
    let newSelected: readonly T[keyof T][] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, selectValue);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  // 紧密性调节
  const [dense, setDense] = useState(false);
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return {
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
  };
}

export function useTableSortProps<T>({ orderKey }: { orderKey: keyof T }) {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(orderKey);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return {
    order,
    orderBy,
    handleRequestSort,
  };
}
