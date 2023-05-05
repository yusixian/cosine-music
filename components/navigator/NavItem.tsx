import { UserType } from '@/api/type';
import { userInfoAtom } from '@/store/user/state';
import { Button } from '@mui/material';
import clsx, { ClassValue } from 'clsx';
import { Variants, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { MdSend } from 'react-icons/md';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

type NavItemProps = {
  selected?: boolean;
  name?: string;
  icon?: JSX.Element;
  onClick: () => void;
  className?: ClassValue;
  type?: UserType;
  indicatorClass?: string;
};
function NavItem({ selected, icon, name, onClick, className, indicatorClass, type }: NavItemProps) {
  const userInfo = useRecoilValue(userInfoAtom);

  if (type === UserType.ADMIN && userInfo?.type === UserType.ADMIN)
    return (
      <motion.div variants={itemVariants}>
        <Button onClick={onClick} variant="contained" size="large" endIcon={<MdSend />}>
          {name}
        </Button>
      </motion.div>
    );
  return (
    <motion.div
      variants={itemVariants}
      className={clsx(
        'relative flex cursor-pointer justify-center text-xl hover:opacity-70',
        {
          'text-primary': selected,
        },
        className,
      )}
      onClick={onClick}
    >
      {icon}
      {name}
      {selected && (
        <motion.div
          className={clsx('absolute inset-x-0 -bottom-1 border-t-2 border-primary', indicatorClass)}
          layoutId="header_tab_selected"
        />
      )}
    </motion.div>
  );
}
export default NavItem;
