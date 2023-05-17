import { createMusic } from '@/api';
import { MusicCreateParam } from '@/api/type';
import Dialog from '@/components/dialog';
import Layout from '@/components/layout';
import { useUploadFile } from '@/hooks/music';
import { verifyCover } from '@/utils';
import { LoadingButton } from '@mui/lab';
import { Box, Breadcrumbs, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { Upload } from 'antd';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineInbox } from 'react-icons/ai';
import { MdDelete, MdDoneAll, MdUpload } from 'react-icons/md';
import { toast } from 'react-toastify';
const { Dragger } = Upload;

function DMusicAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MusicCreateParam>();
  // const [musicData, setMusicData] = useState<MusicDetail | undefined>(undefined);
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [cover, setCover] = useState<string | null | undefined>('');
  const [mp3Url, setMP3Url] = useState<string | null | undefined>('');

  const uploadCover = useUploadFile((url?: string | null) => setCover(url));
  const uploadMP3 = useUploadFile((url?: string | null) => setMP3Url(url));

  const onSubmit = (data: MusicCreateParam) => {
    try {
      console.log('onSubmit!', { data });
      createMusic(data)
        .then((music) => {
          console.log('musicCreated!', { music });
          toast.success('成功添加音乐');
        })
        .catch((error) => toast.error(error));
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" onClick={() => router.push('/dashboard')}>
          仪表盘
        </Link>
        <Link color="inherit" onClick={() => router.push('/dashboard/music')}>
          音乐管理
        </Link>
        <Typography color="text.primary">添加音乐</Typography>
      </Breadcrumbs>
      <div className="flex flex-col gap-4">
        <Typography variant="h5">添加音乐</Typography>
        <Box component="form" className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Stack direction="row" className="items-start justify-between md:flex-col md:items-stretch" gap={2}>
            <Stack spacing={2} className="flex-1">
              <TextField
                error={!!errors?.id}
                helperText={errors?.id?.message}
                label="音乐ID 可不填自动生成"
                type="number"
                placeholder="音乐ID"
                {...register('id', { valueAsNumber: true })}
              />
              <TextField
                required
                error={!!errors?.title}
                label="音乐标题"
                placeholder="音乐标题"
                {...register('title', { required: true })}
              />
              <TextField error={!!errors?.description} label="音乐描述" multiline minRows={2} {...register('description')} />
              <TextField error={!!errors?.foreignArtist} required label="歌手名称" {...register('foreignArtist')} />
              <TextField
                error={!!errors?.lyric}
                className="row-span-2"
                label="lrc格式歌词"
                multiline
                minRows={3}
                {...register('lyric')}
              />
            </Stack>
            <Stack spacing={2} className="flex-1">
              <Stack spacing={2}>
                <TextField
                  required
                  label="封面图片"
                  error={!!errors?.coverUrl}
                  helperText={errors?.coverUrl?.message}
                  value={cover}
                  {...register('coverUrl', {
                    required: true,
                    pattern: {
                      value: /^(https?:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,13}(:[0-9]{1,5})?(\/.*)?$/,
                      message: '封面图url不合法！',
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
              <Stack spacing={2}>
                <TextField
                  error={!!errors?.url}
                  helperText={errors?.url?.message}
                  required
                  label="音乐资源文件（mp3）"
                  value={mp3Url}
                  {...register('url', {
                    required: true,
                    pattern: {
                      value: /^(https?:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,13}(:[0-9]{1,5})?(\/.*)?$/,
                      message: '音乐资源url不合法！',
                    },
                    onChange: (e: ChangeEvent) => {
                      setMP3Url((e.target as HTMLInputElement).value ?? '');
                    },
                  })}
                />
                <Dragger
                  className="dark:text-white"
                  customRequest={({ file, onSuccess, onError }) => {
                    uploadMP3(file as File)
                      .then(onSuccess)
                      .catch(onError);
                  }}
                  onDrop={(e) => console.log('Dropped files', e.dataTransfer.files)}
                >
                  <Typography variant="h5">
                    <AiOutlineInbox className="h-10 w-10" />
                  </Typography>
                  <Typography variant="body1">Click or drag mp3 file to this area to upload</Typography>
                  <Typography variant="body2" className="text-gray-500 dark:text-white/70">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                  </Typography>
                </Dragger>
              </Stack>
              <div className="flex items-center justify-end gap-4">
                <Button size="large" type="reset" variant="outlined" startIcon={<MdDelete />}>
                  重置
                </Button>
                <LoadingButton size="large" type="submit" loading={false} variant="contained" startIcon={<MdDoneAll />}>
                  确认添加
                </LoadingButton>
              </div>
            </Stack>
          </Stack>
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
DMusicAdd.getLayout = function getLayout(page: any) {
  return <Layout dashboard>{page}</Layout>;
};
export default DMusicAdd;
