import Card from '@/components/card';
import Login from '@/components/user/Login';

export default function My() {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-3 p-4">
      <Card title="My" desc="我的" />
      <Login />
    </main>
  );
}
