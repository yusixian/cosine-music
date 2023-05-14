import Layout from '@/components/layout';
import { Breadcrumbs, Link, Typography } from '@mui/material';

function DPlaylist() {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/dashboard">
          仪表盘
        </Link>
        <Typography color="text.primary">歌单管理</Typography>
      </Breadcrumbs>
    </main>
  );
}

DPlaylist.getLayout = function getLayout(page: any) {
  return <Layout dashboard>{page}</Layout>;
};
export default DPlaylist;
