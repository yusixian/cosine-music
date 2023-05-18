import { createBanner } from '@/api';
import { BannerCreateParam } from '@/api/type';
import Dialog from '@/components/dialog';
import Layout from '@/components/layout';
import { useUploadFile } from '@/hooks/music';
import { verifyCover } from '@/utils';
import { Box, Breadcrumbs, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { Upload } from 'antd';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdDelete, MdDoneAll, MdUpload } from 'react-icons/md';
import { toast } from 'react-toastify';

function DBannerAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BannerCreateParam>();
  const router = useRouter();
  const [cover, setCover] = useState<string | null | undefined>('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const uploadCover = useUploadFile((url?: string | null) => setCover(url));

  const onSubmit = (data: BannerCreateParam) => {
    try {
      console.log('onSubmit!', { data });
      createBanner(data)
        .then((banner) => {
          console.log('bannerCreated!', { banner });
          toast.success('成功添加轮播图！');
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
        <Link color="inherit" className="cursor-pointer" underline="hover" onClick={() => router.push('/dashboard/banner')}>
          轮播图管理
        </Link>
        <Typography color="text.primary">添加轮播图</Typography>
      </Breadcrumbs>
      <div className="flex flex-col gap-4">
        <Typography variant="h5">添加轮播图</Typography>
        <Box component="form" className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <TextField
              required
              error={!!errors?.title}
              label="轮播图标题"
              placeholder="轮播图标题"
              {...register('title', { required: true })}
            />
            <TextField error={!!errors?.description} label="轮播图描述" placeholder="轮播图描述" {...register('description')} />
            <TextField
              error={!!errors?.description}
              label="轮播图跳转链接"
              placeholder="轮播图跳转链接"
              {...register('href')}
            />
            <Stack spacing={2}>
              <TextField
                required
                label="轮播图图片url"
                error={!!errors?.url}
                helperText={errors?.url?.message}
                value={cover}
                {...register('url', {
                  required: true,
                  pattern: {
                    value: /^(https?:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,13}(:[0-9]{1,5})?(\/.*)?$/,
                    message: '图片url不合法！',
                  },
                  onChange: (e: ChangeEvent) => {
                    setCover((e.target as HTMLInputElement).value ?? '');
                  },
                })}
              />
              <div className="w-28 overflow-hidden">
                <Upload
                  beforeUpload={(file) => verifyCover(file)}
                  customRequest={({ file, onSuccess, onError }) => {
                    uploadCover(file as File)
                      .then(onSuccess)
                      .catch(onError);
                  }}
                  style={{ width: '100%' }}
                  listType="picture-card"
                  onPreview={() => setPreviewOpen(true)}
                  fileList={
                    cover
                      ? [
                          {
                            uid: cover,
                            name: 'cover',
                            status: 'done',
                            url: cover,
                          },
                        ]
                      : []
                  }
                  maxCount={1}
                  onRemove={() => setCover('')}
                >
                  {!cover && (
                    <Button className="flex flex-col items-center">
                      <MdUpload className="h-9 w-9" /> Upload
                    </Button>
                  )}
                </Upload>
              </div>
            </Stack>
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
        <Dialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          showCloseButton
          title="cover"
          render={() => <img alt="cover" className="h-full w-full" src={cover || ''} />}
        />
      </div>
    </main>
  );
}
DBannerAdd.getLayout = function getLayout(page: any) {
  return <Layout dashboard>{page}</Layout>;
};
export default DBannerAdd;
