import BannerManageTable from '@/components/dashboard/banner/BannerManageTable';
import Layout from '@/components/layout';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';

function DHome() {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4 pb-28">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/dashboard">
          仪表盘
        </Link>
        <Typography color="text.primary">首页管理</Typography>
      </Breadcrumbs>
      <Stack className="flex-grow overflow-auto">
        <BannerManageTable />
      </Stack>
    </main>
  );
}

DHome.getLayout = function getLayout(page: any) {
  return <Layout dashboard>{page}</Layout>;
};
export default DHome;
