import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { MdDelete, MdFilterList } from 'react-icons/md';
import { alpha } from '@mui/material/styles';

interface EnhancedTableToolbarProps {
  numSelected: number;
  title?: string;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, title } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton color="error">
            <MdDelete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton color="primary">
            <MdFilterList />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
