import MusicCard from '@/components/card/MusicCard';
import Carousel from '@/components/carousel';
import LatestMusics from '@/components/music/LatestMusics';
import { useFetchBannerList } from '@/hooks/banner';
import { CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Home() {
  const { data, isLoading } = useFetchBannerList({});
  return (
    <motion.div
      initial={{ y: 100, scale: 0, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.8,
      }}
      className="mx-auto flex max-w-screen-lg flex-col items-center gap-3 p-4"
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Carousel interval={1500} wrapperClass="flex items-center justify-center" width={1024} height={398}>
          {data?.list?.map(({ id, title, url }) => (
            <img src={url} width={1024} height={398} alt={title} key={id} />
          ))}
        </Carousel>
      )}
      <div className="grid w-full grid-cols-4 items-stretch gap-4 md:grid-cols-1">
        <div className="col-span-3 flex flex-col gap-4 md:col-span-1">
          <Typography variant="h5" className="text-2xl font-bold">
            新歌速递
          </Typography>
          <LatestMusics />
        </div>
        <div className="flex flex-col gap-4">
          <Typography variant="h5" className="text-2xl font-bold">
            猜你喜欢
          </Typography>
          <MusicCard />
        </div>
      </div>
    </motion.div>
  );
}
