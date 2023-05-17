import { createTag } from '@/api';
import { TagCreateParam } from '@/api/type';
import Layout from '@/components/layout';
import { Box, Breadcrumbs, Button, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { MdDelete, MdDoneAll } from 'react-icons/md';
import { toast } from 'react-toastify';

function DTagAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TagCreateParam>();
  const router = useRouter();

  const onSubmit = (data: TagCreateParam) => {
    try {
      console.log('onSubmit!', { data });
      createTag(data)
        .then((tag) => {
          console.log('tagCreated!', { tag });
          toast.success('成功添加标签！');
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" className="cursor-pointer" underline="hover" onClick={() => router.push('/dashboard')}>
          仪表盘
        </Link>
        <Link color="inherit" className="cursor-pointer" underline="hover" onClick={() => router.push('/dashboard/tag')}>
          标签管理
        </Link>
        <Typography color="text.primary">添加标签</Typography>
      </Breadcrumbs>
      <div className="flex flex-col gap-4">
        <Typography variant="h5">添加标签</Typography>
        <Box component="form" className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <TextField
              required
              error={!!errors?.name}
              label="标签名称"
              placeholder="标签名称"
              {...register('name', { required: true })}
            />
            <TextField error={!!errors?.color} label="标签颜色" placeholder="标签颜色" {...register('color')} />
            <TextField error={!!errors?.icon} label="标签图标" placeholder="标签图标" {...register('icon')} />
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button size="large" type="reset" variant="outlined" startIcon={<MdDelete />}>
              重置
            </Button>
            <Button size="large" type="submit" variant="contained" startIcon={<MdDoneAll />}>
              确认添加
            </Button>
          </div>
        </Box>
      </div>
    </main>
  );
}
DTagAdd.getLayout = function getLayout(page: any) {
  return <Layout dashboard>{page}</Layout>;
};
export default DTagAdd;
