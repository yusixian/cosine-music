import MusicCard from '@/components/card/MusicCard';
import { useFetchRecommendMusicList } from '@/hooks/music';
import { CircularProgress, IconButton, Typography } from '@mui/material';
import { MdRefresh } from 'react-icons/md';

export default function RecommendMusics() {
  const { data, isLoading, refetch } = useFetchRecommendMusicList({});

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <Typography variant="h5" className="text-2xl font-bold">
          猜你喜欢
        </Typography>
        <IconButton color="primary" onClick={() => refetch()} aria-label="refresh">
          <MdRefresh />
        </IconButton>
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : data?.length ? (
        data.map((music) => {
          return <MusicCard key={music.id} music={music} />;
        })
      ) : null}
    </div>
  );
}
