import { MusicDetail } from '@/api/type';
import DashboardLayout from '@/components/dashboard/layout';
import Dialog from '@/components/dialog';
import { useUploadCover } from '@/hooks/music';
import { verifyCover } from '@/utils';
import { LoadingButton, Masonry } from '@mui/lab';
import { Box, Breadcrumbs, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { Upload, UploadProps } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineInbox } from 'react-icons/ai';
import { MdDelete, MdDoneAll, MdUpload } from 'react-icons/md';
import { toast } from 'react-toastify';
const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      toast.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      toast.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

function DMusicAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MusicDetail>();
  // const [musicData, setMusicData] = useState<MusicDetail | undefined>(undefined);

  const [previewOpen, setPreviewOpen] = useState(false);

  const [cover, setCover] = useState<string | null | undefined>('');

  const uploadCover = useUploadCover((url?: string | null) => setCover(url));

  const onSubmit = (data: MusicDetail) => {
    console.log('onSubmit!', { data });
    console.log({ errors });
    // setMusicData(data);
  };

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/dashboard">
          仪表盘
        </Link>
        <Link color="inherit" href="/dashboard/music">
          音乐管理
        </Link>
        <Typography color="text.primary">添加音乐</Typography>
      </Breadcrumbs>

      <div className="flex flex-col gap-4">
        <Typography variant="h5">添加音乐</Typography>

        <Box component="form" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Masonry columns={3} spacing={4}>
            <TextField required label="音乐标题" placeholder="音乐标题" {...register('title', { required: true })} />
            <TextField className="flex-grow" required label="音乐描述" multiline minRows={4} {...register('description')} />
            <Stack spacing={2}>
              <TextField
                required
                label="封面图片"
                value={cover}
                {...register('coverUrl', {
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
            <TextField required label="歌手名称" {...register('artist', { required: true })} />
            <TextField required label="lrc格式歌词" multiline minRows={3} {...register('lyric')} />
            <Stack spacing={2}>
              <TextField
                required
                label="音乐资源文件（mp3）"
                value={cover}
                {...register('coverUrl', {
                  onChange: (e: ChangeEvent) => {
                    setCover((e.target as HTMLInputElement).value ?? '');
                  },
                })}
              />
              <Dragger className="dark:text-white" {...props}>
                <Typography variant="h5">
                  <AiOutlineInbox className="h-10 w-10" />
                </Typography>
                <Typography variant="body1">Click or drag mp3 file to this area to upload</Typography>
                <Typography variant="body2" className="text-gray-500 dark:text-white/70">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                </Typography>
              </Dragger>
            </Stack>
          </Masonry>
          <div className="flex items-center justify-end gap-4">
            <Button size="large" type="reset" variant="outlined" startIcon={<MdDelete />}>
              重置
            </Button>
            <LoadingButton size="large" type="submit" loading={false} variant="contained" startIcon={<MdDoneAll />}>
              确认添加
            </LoadingButton>
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
DMusicAdd.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default DMusicAdd;
