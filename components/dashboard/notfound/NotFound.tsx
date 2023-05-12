import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';

export default function NotFound({ message, onClick }: { message?: string; onClick: () => void }) {
  const router = useRouter();
  return (
    <Stack component="main" className="p-10" spacing={2} sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      <div className="text-xl font-bold">{message ?? '404 | This page could not be found.'}</div>
      <Button variant="contained" size="large" onClick={onClick ?? (() => router.push('/'))}>
        返回主页
      </Button>
    </Stack>
  );
}
