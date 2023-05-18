import { useFetchMusicById } from '@/hooks/dashboard/music';
import { usePlayMusic } from '@/hooks/music';
import { lrcFormat } from '@/utils';
import { Chip, CircularProgress, Fab, Typography } from '@mui/material';
import { Empty } from 'antd';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { MdPlayArrow } from 'react-icons/md';

function MusicDetail() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const { data, isLoading } = useFetchMusicById(id);
  const { title, description, foreignArtist, playCount, coverUrl, lyric, tags } = data ?? {};
  const { playMusic } = usePlayMusic(data);
  const lrc = useMemo(() => lrcFormat(lyric), [lyric]);
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-3 p-4 pb-28">
      {isLoading ? (
        <CircularProgress />
      ) : data ? (
        <div className="flex w-full gap-4">
          <div className="flex flex-col items-center gap-4">
            <img src={coverUrl} alt={title + 'cover'} className="h-52 w-52" />
            <div className="flex items-center justify-center">
              <Fab color="primary" className="z-0" onClick={playMusic}>
                <MdPlayArrow className="h-10 w-10" />
              </Fab>
            </div>
          </div>
          <div className="flex flex-grow flex-col gap-2">
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {description}
            </Typography>
            <Typography component="div" className="text-base text-gray-400">
              歌手： {foreignArtist}
            </Typography>
            {tags?.length ? (
              <Typography variant="subtitle1" color="text.secondary" component="div" className="flex flex-wrap items-center">
                标签：
                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((tag) => (
                    <Chip key={tag.id} label={tag.name} />
                  ))}
                </div>
              </Typography>
            ) : null}
            <Typography variant="subtitle2" color="text.secondary" component="div">
              {playCount} 次播放
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" className="mt-4 whitespace-pre-wrap" component="div">
              {lrc?.length ? (
                lrc.map(({ text, time }, idx) => (
                  <p className="whitespace-pre-wrap" key={`lrc_${idx}_${time}`}>
                    {text ? text : '\n'}
                  </p>
                ))
              ) : (
                <Empty description="暂时没有歌词哦！" />
              )}
            </Typography>
          </div>
        </div>
      ) : (
        <Empty description="弄错了？没有这首歌" />
      )}
    </div>
  );
}

export default MusicDetail;
