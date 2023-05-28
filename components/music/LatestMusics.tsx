import MusicCard from '@/components/card/MusicCard';
import { useFetchPublicMusicList } from '@/hooks/music';
import { Masonry } from '@mui/lab';
import { CircularProgress, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function LatestMusics() {
  const [pageNum, setPage] = useState(1);
  const { data, isLoading } = useFetchPublicMusicList({ pageNum, order: 'desc', orderBy: 'createdAt' });
  const isMdScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className="flex flex-col gap-4 pb-20">
      <Typography variant="h5" className="text-2xl font-bold">
        新歌速递
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {data?.list?.length ? (
            <Masonry columns={isMdScreen ? 1 : 2} spacing={2}>
              {data.list.map((music) => {
                return <MusicCard key={music.id} music={music} />;
              })}
            </Masonry>
          ) : null}
          <Pagination
            page={pageNum}
            onChange={(e, page) => setPage(page)}
            count={data?.totalPages}
            color="primary"
            showFirstButton
            showLastButton
          />
        </>
      )}
    </div>
  );
}
