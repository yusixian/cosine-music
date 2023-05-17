import { useFetchTagList } from '@/hooks/tag';
import { CircularProgress, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type TagSelectorProps = {
  className?: string;
  onChange?: (value: string[]) => void;
  tags?: string[];
};
export default function TagSelector({ className, onChange, tags }: TagSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(tags ?? []);
  const { data, isLoading } = useFetchTagList({});

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const values = typeof value === 'string' ? value.split(',') : value;
    onChange?.(values);
    setSelectedTags(values);
  };

  useEffect(() => {
    setSelectedTags(tags ?? []);
  }, [setSelectedTags, tags]);
  return (
    <FormControl className={twMerge('w-full', className)}>
      <InputLabel>音乐标签</InputLabel>
      <Select
        className="w-full"
        multiple
        label="音乐标签"
        value={selectedTags}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="音乐标签" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          data?.list.map((tag) => (
            <MenuItem key={tag.id} value={tag.name} className={selectedTags.indexOf(tag.name) === -1 ? '' : 'font-bold'}>
              {tag.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
