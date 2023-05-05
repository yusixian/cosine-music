import DashboardLayout from '@/components/dashboard/layout';
import { Breadcrumbs, Link, Typography } from '@mui/material';

function DTag() {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/dashboard">
          仪表盘
        </Link>
        <Typography color="text.primary">标签管理</Typography>
      </Breadcrumbs>
    </main>
  );
}

DTag.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default DTag;
