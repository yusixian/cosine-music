import { useLogin, useRegister } from '@/hooks/user';
import { Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import Tabs from '../tabs/Tabs';

const { Tab, TabPanel, TabList } = Tabs;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const mutationLogin = useLogin();
  const mutationRegister = useRegister();

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Verify Param
    mutationLogin.mutate({ user_name: username, password });
  };

  const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Verify Param
    mutationRegister.mutate({ user_name: username, password });
  };

  return (
    <>
      <Tabs className="gap-2">
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>
        <TabPanel enableAnim>
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 py-4">
            <TextField
              onChange={(e) => setUsername(e.currentTarget.value)}
              required
              fullWidth
              id="username"
              label="Username"
              placeholder="用户名"
            />
            <TextField
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              placeholder="密码，至少6个字符"
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
        </TabPanel>
        <TabPanel enableAnim>
          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4 py-4">
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              placeholder="用户名"
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <TextField
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              placeholder="密码，至少6个字符"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <Button variant="contained" type="submit" color="secondary">
              Sign Up
            </Button>
          </form>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Login;
