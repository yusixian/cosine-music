import { UserSex } from '@/api/type';
import Card from '@/components/card';
import LoginDialog from '@/components/user/LoginDialog';
import { userInfoAtom, userLoginDialogAtom } from '@/store/user/state';
import { Avatar, Button, Divider, Stack } from '@mui/material';
import { AiOutlineMan, AiOutlineQuestion, AiOutlineWoman } from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const sexIconMap = {
  [UserSex.UNKNOWN]: <AiOutlineQuestion className="h-9 w-9 md:h-6 md:w-6" />,
  [UserSex.FEMALE]: <AiOutlineWoman className="h-9 w-9 text-pink-500 md:h-6 md:w-6" />,
  [UserSex.MALE]: <AiOutlineMan className="h-9 w-9 text-blue-500 md:h-6 md:w-6" />,
};
export default function My() {
  const setLoginOpen = useSetRecoilState(userLoginDialogAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      {userInfo ? (
        <Card>
          <div className="flex gap-4">
            <Avatar
              alt={userInfo?.user_name}
              className="h-40 w-40 cursor-pointer md:h-20 md:w-20"
              src={userInfo?.avatar || '/img/default_avatar.png'}
            />
            <div className="flex-grow">
              <div className="flex flex-wrap items-center justify-between gap-4 text-lg">
                <div>
                  <p className="text-2xl font-bold">{userInfo?.name}</p>
                  <p className="text-gray-500">@{userInfo?.name || userInfo?.user_name}</p>
                </div>
                <Stack direction="row" className="flex-grow flex-wrap" spacing={2}>
                  <p className="flex items-center justify-center">
                    {sexIconMap[userInfo?.sex ?? 0]}
                    {UserSex[userInfo?.sex ?? 0]}
                  </p>
                  <p className="flex items-center justify-center">所在地：{userInfo?.city ?? '未知'}</p>
                  <p className="flex items-center justify-center">邮箱：{userInfo?.email ?? '未知'}</p>
                </Stack>
                <Button variant="contained" size="large">
                  编辑个人资料
                </Button>
              </div>
              <Divider className="my-4" />
              <div>粉丝 关注 歌单</div>
            </div>
          </div>
        </Card>
      ) : (
        <>
          <Card title="暂未登录">
            <Button size="large" variant="contained" onClick={() => setLoginOpen(true)}>
              立即登陆
            </Button>
          </Card>
          <LoginDialog />
        </>
      )}
    </main>
  );
}
