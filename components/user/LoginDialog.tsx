import Dialog from '@/components/dialog';
import { userLoginDialogAtom } from '@/store/user/state';
import { useRecoilState } from 'recoil';
import Login from './Login';

export default function LoginDialog() {
  const [open, setOpen] = useRecoilState(userLoginDialogAtom);
  return <Dialog showCloseButton className="p-8" open={open} onOpenChange={setOpen} render={() => <Login />} />;
}
