import TagManageTable from '@/components/dashboard/tag/TagManageTable';
import Layout from '@/components/layout';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

function DTag() {
  const router = useRouter();
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4 pb-28">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" className="cursor-pointer" underline="hover" onClick={() => router.push('/dashboard')}>
          仪表盘
        </Link>
        <Typography color="text.primary">标签管理</Typography>
      </Breadcrumbs>
      <Stack className="flex-grow overflow-auto">
        <TagManageTable />
      </Stack>
    </main>
  );
}

DTag.getLayout = function getLayout(page: any) {
  return <Layout dashboard>{page}</Layout>;
};
export default DTag;
