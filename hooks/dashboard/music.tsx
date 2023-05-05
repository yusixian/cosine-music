export type MusicItem = {
  id: number;
  title: string;
  coverUrl?: string; // 封面图片路径
  // playCount: number; // 播放量
  // artist?: string; // 歌手名称
  // artistId?: number; // 歌手id
  // lyricAuthorId?: number; // 歌词贡献者id
  // status: MusicStatus; // 0:未审核 1:正常 2:封禁
  // createdAt: string;
  // updatedAt?: string;
  // deletedAt?: string;
};
// export function useMusicShortenColumn() {
//   const columns = useMemo<ColumnDef<MusicItem>[]>(
//     () => [
//       {
//         accessorKey: 'id',
//         header: () => <p className="text-left">音乐ID</p>,
//       },
//       {
//         accessorKey: 'title',
//         header: '音乐标题',
//       },
//       {
//         accessorKey: 'coverUrl',
//         header: '音乐封面',
//         cell: ({ getValue, row }) => <Image src={getValue<string>()} alt={row.original.title} className="h-9 w-9" />,
//       },
//     ],
//     [],
//   );
//   return columns;
// }
