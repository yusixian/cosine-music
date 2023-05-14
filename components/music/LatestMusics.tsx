import MusicCard from '@/components/card/MusicCard';
import { useFetchPublicMusicList } from '@/hooks/music';
import { CircularProgress } from '@mui/material';

export default function LatestMusics() {
  const { data, isLoading } = useFetchPublicMusicList({ order: 'desc', orderBy: 'createdAt' });
  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {data?.list?.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              {data.list.map((music) => {
                return <MusicCard key={music.id} music={music} />;
              })}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
