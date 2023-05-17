import MusicManageTable from '@/components/dashboard/music/MusicManageTable';
import Layout from '@/components/layout';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
function DMusic() {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4 pb-28">
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
  return <Layout dashboard>{page}</Layout>;
};
export default DMusic;
