import TagMusics from '@/components/music/TagMusics';
import { Typography } from '@mui/material';

export default function Tag() {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <div className="flex flex-col gap-4">
        <Typography variant="h5" className="text-2xl font-bold">
          音乐分类
        </Typography>
        <TagMusics />
      </div>
    </main>
  );
}
