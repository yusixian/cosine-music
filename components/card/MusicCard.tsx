import { MusicDetail } from '@/api/type';
import { usePlayMusic } from '@/hooks/music';
import { Box, Card, CardContent, CardMedia, Fab, Skeleton, Typography } from '@mui/material';
import { MdPlayArrow } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

type MusicCardProps = {
  music?: MusicDetail;
  className?: string;
};
export default function MusicCard({ music, className }: MusicCardProps) {
  const { title, description, foreignArtist, playCount, coverUrl } = music ?? {};
  const { playMusic } = usePlayMusic(music);
  return (
    <Card className={twMerge('flex', className)}>
      <Box className="relative flex flex-grow flex-col">
        <CardContent>
          {music ? (
            <>
              <Typography component="div" variant="h6">
                {title}
              </Typography>
              <Typography component="div" className="text-xs text-gray-400">
                {foreignArtist}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {description}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" component="div">
                {playCount} 次播放
              </Typography>
            </>
          ) : (
            <>
              <Skeleton variant="rectangular" className="w-full" />
              <Skeleton variant="rectangular" className="mt-2 w-full" />
            </>
          )}
        </CardContent>
        {music && (
          <div className="absolute right-2 bottom-2 flex items-center justify-center">
            <Fab color="primary" className="z-0" size="small" onClick={playMusic}>
              <MdPlayArrow className="h-7 w-7" />
            </Fab>
          </div>
        )}
      </Box>
      {coverUrl ? (
        <CardMedia component="img" className="h-full w-36 object-cover" image={coverUrl} alt={`${title} cover`} />
      ) : (
        <Skeleton variant="rectangular" className="h-full w-36" />
      )}
    </Card>
  );
}
