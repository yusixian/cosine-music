import DashboardLayout from '@/components/dashboard/layout';
import MusicManageTable from '@/components/dashboard/music/MusicManageTable';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
function DMusic() {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/dashboard">
          仪表盘
        </Link>
        <Typography color="text.primary">音乐管理</Typography>
      </Breadcrumbs>
      <Stack className="h- flex-grow overflow-auto">
        <MusicManageTable />
      </Stack>
    </main>
  );
}
DMusic.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default DMusic;
