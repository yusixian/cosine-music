import Layout from '@/components/layout';
import { Breadcrumbs, Link, Typography } from '@mui/material';

function DCategory() {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/dashboard">
          仪表盘
        </Link>
        <Typography color="text.primary">分类管理</Typography>
      </Breadcrumbs>
    </main>
  );
}

DCategory.getLayout = function getLayout(page: any) {
  return <Layout dashboard>{page}</Layout>;
};
export default DCategory;
