import DashboardLayout from '@/components/dashboard/layout';
import { Breadcrumbs, Link, Typography } from '@mui/material';

function DMusic() {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/dashboard">
          仪表盘
        </Link>
        <Typography color="text.primary">音乐管理</Typography>
      </Breadcrumbs>
      <div className="h-60 w-full">1111</div>
      <div className="h-60 w-full">1111</div>
      <div className="h-60 w-full">1111</div>
      <div className="h-60 w-full">1111</div>
      <div className="h-60 w-full">1111</div>
      <div className="h-60 w-full">1111</div>
      <div className="h-60 w-full">22222</div>
    </main>
  );
}
DMusic.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default DMusic;
