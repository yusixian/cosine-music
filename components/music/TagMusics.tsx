import { useFetchPublicMusicList } from '@/hooks/music';
import { useFetchTagList } from '@/hooks/tag';
import { Chip, CircularProgress, Pagination } from '@mui/material';
import { useState } from 'react';
import MusicCard from '../card/MusicCard';
import { Empty } from 'antd';

export default function TagMusics() {
  const [pageNum, setPage] = useState(1);
  const { data, isLoading } = useFetchTagList({});
  const [selectedTags, setSelectedTags] = useState<{ [key: number]: string | null }>({});
  console.log({ selectedTags });
  const { data: musicData, isLoading: musicLoading } = useFetchPublicMusicList({
    pageNum,
    order: 'desc',
    orderBy: 'createdAt',
    tagNames: Object.values(selectedTags).filter((v) => v !== null) as string[],
  });

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="flex flex-col gap-4">
          {data?.list?.length ? (
            <div className="flex flex-wrap items-center gap-4">
              {data.list.map((tag) => {
                return (
                  <Chip
                    label={tag.name}
                    key={`Tag${tag.id}`}
                    color={selectedTags?.[tag.id] ? 'primary' : 'default'}
                    onDelete={
                      selectedTags?.[tag.id] ? () => setSelectedTags((prev) => ({ ...prev, [tag.id]: null })) : undefined
                    }
                    variant="outlined"
                    onClick={() => setSelectedTags((prev) => ({ ...prev, [tag.id]: tag.name }))}
                  />
                );
              })}
            </div>
          ) : null}
          {musicLoading ? (
            <CircularProgress />
          ) : musicData?.list?.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              {musicData.list.map((music) => {
                return <MusicCard key={music.id} music={music} />;
              })}
            </div>
          ) : (
            <Empty />
          )}
          {musicData?.totalPages ? (
            <Pagination
              className="w-full"
              page={pageNum}
              onChange={(e, page) => setPage(page)}
              count={musicData?.totalPages}
              color="primary"
              showFirstButton
              showLastButton
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
