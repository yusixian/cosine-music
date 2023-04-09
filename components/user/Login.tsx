import { ChangeEvent, FormEvent, useState } from 'react';
import Tabs from '../tabs/Tabs';

const { Tab, TabPanel, TabList } = Tabs;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Handle login submit
  };

  const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Handle signup submit
  };

  return (
    <>
      <Tabs id="test" className="gap-2" defaultActive={1}>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>
        <TabPanel enableAnim>
          <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-2 text-lg font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                className="rounded-lg border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="rounded-lg border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button type="submit" className="rounded-lg bg-blue-500 px-4 py-2 text-white">
              Login
            </button>
          </form>
        </TabPanel>
        <TabPanel enableAnim>
          <form onSubmit={handleSignupSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-2 text-lg font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                className="rounded-lg border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="rounded-lg border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button type="submit" className="rounded-lg bg-green-500 px-4 py-2 text-white">
              Sign Up
            </button>
          </form>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Login;
