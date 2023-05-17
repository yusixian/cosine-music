import { updateTag } from '@/api';
import { TagUpdateParam } from '@/api/type';
import Layout from '@/components/layout';
import { useFetchTagById } from '@/hooks/dashboard/tag';
import { Box, Breadcrumbs, Button, CircularProgress, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdDelete, MdDoneAll } from 'react-icons/md';
import { toast } from 'react-toastify';

function DTagEdit() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const { data: initData, isLoading } = useFetchTagById(id);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TagUpdateParam>();

  const onSubmit = (data: TagUpdateParam) => {
    try {
      console.log('onSubmit!', { id, data });
      updateTag({ id, data }).then(() => {
        toast.success('更新成功！');
        router.push('/dashboard/tag');
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (!isLoading) {
      reset({
        name: initData?.name,
        color: initData?.color,
        icon: initData?.icon,
      });
    }
  }, [initData, isLoading, reset]);
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" className="cursor-pointer" underline="hover" onClick={() => router.push('/dashboard')}>
          仪表盘
        </Link>
        <Link color="inherit" className="cursor-pointer" underline="hover" onClick={() => router.push('/dashboard/tag')}>
          标签管理
        </Link>
        <Typography color="text.primary">编辑标签</Typography>
      </Breadcrumbs>
      <div className="flex flex-col gap-4">
        <Typography variant="h5">编辑标签</Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            component="form"
            className="flex flex-col gap-12"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
          >
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
                确认更改
              </Button>
            </div>
          </Box>
        )}
      </div>
    </main>
  );
}

DTagEdit.getLayout = function getLayout(page: any) {
  return <Layout dashboard>{page}</Layout>;
};
export default DTagEdit;
