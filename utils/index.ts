import { toast } from 'react-toastify';

export const verifyCover = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    toast.error('You can only upload JPG/PNG file!');
    return false;
  }
  const isLt10M = file.size / 1024 / 1024 < 1;
  if (!isLt10M) {
    toast.error('Image must smaller than 1MB!');
    return false;
  }
  const hasCh = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/.test(file.name);
  if (hasCh) {
    toast.error('Upload file name must not contain Chinese!');
    return false;
  }
  return true;
};

/**
 * lrc格式歌词格式化
 */
type LrcObj = { time: number; text?: string };
export function lrcFormat(lrc?: string): LrcObj[] {
  if (!lrc) return [];
  const lyric: LrcObj[] = [];
  const lrcArr = lrc.split('\n');
  // 记录行数
  const row = lrcArr.length - 1;
  // 循环遍历lrcArr
  for (let i = 0; i < row; i++) {
    const itemArr = lrcArr[i].split(']');
    // 取出文字部分
    const text = itemArr.pop();
    // 取出时间部分
    itemArr.forEach((ele) => {
      const timeArr = ele
        .slice(1, ele.length - 1)
        .split(':')
        .map((v) => parseInt(v));
      let s = timeArr[0] * 60 + Math.ceil(timeArr[1]);
      // 存储到状态
      lyric.push({ time: s, text });
    });
  }
  console.log({ lyric });
  return lyric;
}
