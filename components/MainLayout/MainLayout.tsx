import { FC, useState } from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
// User Context
import { UserProvider, useFetchUser } from '../../lib/UserContext';
// Components
import { MainMenu, MainContent } from '../';

interface Props {
  title?: string;
  keywords?: string;
  description?: string;
  children: JSX.Element | JSX.Element[] | [];
}
export const MainLayout: FC<Props> = ({ title = `Next App`, keywords, description, children }): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const onToggle = () => setCollapsed((prevState) => !prevState);
  const { user, loading } = useFetchUser();

  return (
    <UserProvider value={{ user, loading }}>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <MainMenu collapsed={collapsed} />
        <MainContent collapsed={collapsed} onToggle={onToggle}>
          {children}
        </MainContent>
      </Layout>
    </UserProvider>
  );
};
