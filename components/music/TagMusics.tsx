import { useFetchTagList } from '@/hooks/tag';
import { Chip, CircularProgress } from '@mui/material';
import { useState } from 'react';

export default function TagMusics() {
  // const { data, isLoading } = useFetchPublicMusicList({ order: 'desc', orderBy: 'createdAt' });
  const { data, isLoading } = useFetchTagList({});
  const [selectedTags, setSelectedTags] = useState<{ [key: number]: string | null }>({});
  console.log({ selectedTags });
  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
