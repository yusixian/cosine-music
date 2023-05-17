import MusicCard from '@/components/card/MusicCard';
import { useFetchPublicMusicList } from '@/hooks/music';
import { CircularProgress, Pagination } from '@mui/material';
import { useState } from 'react';

export default function LatestMusics() {
  const [pageNum, setPage] = useState(1);
  const { data, isLoading } = useFetchPublicMusicList({ pageNum, order: 'desc', orderBy: 'createdAt' });

  return (
    <div className="flex flex-col gap-4 pb-20">
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
