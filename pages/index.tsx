import Carousel from '@/components/carousel';
import { motion } from 'framer-motion';
const mockImgList = [
  'http://p1.music.126.net/4-p1-neKoUcs2upgNzauvw==/109951168591510929.jpg',
  'http://p1.music.126.net/Z3QBDOPH1d2--BfQLfne1A==/109951168591523785.jpg',
  'http://p1.music.126.net/UUzRjApt3MehCaO4j1dWhA==/109951168591515119.jpg',
  'http://p1.music.126.net/CNy6RMBZKe19e4cibhtSDQ==/109951168591526848.jpg',
  'http://p1.music.126.net/dYwHfmRB-d8JmgMsKvxgww==/109951168591672334.jpg',
];
export default function Home() {
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
      <Carousel interval={1500} wrapperClass="flex items-center justify-center" width={1024} height={398}>
        {mockImgList.map((v) => (
          <img src={v} width={1024} height={398} alt={v} key={v} />
        ))}
      </Carousel>
    </motion.div>
  );
}
