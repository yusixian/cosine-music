import Card from '@/components/card';
import { useIsMounted } from '@/hooks/useIsMounted';
import { Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FaGithub, FaStar } from 'react-icons/fa';

export default function About() {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Card title="About">
        <div className="flex flex-col gap-2">
          <p>
            cosine-music 是一个前后端均开源的音乐网站，其前端使用 Next.js + TypeScript + Tailwind CSS
            开发的音乐推荐网站，组件库采用
            <Link href="https://mui.com/" target="_blank" className="mx-1">
              Material UI
            </Link>
            , Github 地址为
            <Link href="https://github.com/yusixian/cosine-music" target="_blank" className="mx-1">
              https://github.com/yusixian/cosine-music
            </Link>
          </p>
          <p>
            后端使用 Express +
            <Link href="https://www.prisma.io/" target="_blank" className="mx-1">
              Prisma
            </Link>
            搭建, Github 地址为
            <Link href="https://github.com/yusixian/cosine-music-backend" target="_blank" className="mx-1">
              https://github.com/yusixian/cosine-music-backend
            </Link>
          </p>
          <List className="w-full text-lg">
            <ListItem>
              <ListItemButton onClick={() => window.open('https://github.com/yusixian/cosine-music', '_blank')}>
                <ListItemIcon>
                  <FaGithub className="h-10 w-10" />
                </ListItemIcon>
                <ListItemText primary="cosine-music 前端" className="text-lg" />
                <FaStar className="mr-2 h-6 w-6 fill-yellow-400" />
                Star
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => window.open('https://github.com/yusixian/cosine-music-backend', '_blank')}>
                <ListItemIcon>
                  <FaGithub className="h-10 w-10" />
                </ListItemIcon>
                <ListItemText primary="cosine-music 后端" className="text-lg" />
                <FaStar className="mr-2 h-6 w-6 fill-yellow-400" />
                Star
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Card>
    </main>
  );
}
