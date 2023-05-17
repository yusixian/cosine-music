import MusicManageTable from '@/components/dashboard/music/MusicManageTable';
import Layout from '@/components/layout';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
function DMusic() {
  const router = useRouter();
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4 pb-28">
      <Breadcrumbs>
        <Link className="cursor-pointer" color="inherit" underline="hover" onClick={() => router.push('/dashboard')}>
          仪表盘
        </Link>
        <Typography color="text.primary">音乐管理</Typography>
      </Breadcrumbs>
      <Stack className="flex-grow overflow-auto">
        <MusicManageTable />
      </Stack>
    </main>
  );
}
DMusic.getLayout = function getLayout(page: any) {
  return <Layout dashboard>{page}</Layout>;
};
export default DMusic;
