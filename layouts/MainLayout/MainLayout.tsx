import { FC, useState, createElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import style from './MainLayoutStyles.module.css';
import { UserProvider, useFetchUser } from '../../utils/user';

const { Header, Content, Sider } = Layout;

interface Props {
  title?: string;
  keywords?: string;
  description?: string;
  children: JSX.Element | JSX.Element[] | [];
}
export const MainLayout: FC<Props> = ({ title = `Next App`, keywords, description, children }): JSX.Element => {
  const { pathname } = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((prevState) => !prevState);

  const { user, loading } = useFetchUser();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider value={{ user, loading }}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={style.logo} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
              <Menu.Item key="/" icon={<HomeOutlined />}>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </Menu.Item>
              {user && !loading
                ? [
                    <Menu.Item key="/api/logout" icon={<CloudDownloadOutlined />}>
                      <Link href="/api/logout">
                        <a>Logout</a>
                      </Link>
                    </Menu.Item>,
                    <Menu.Item key="/profile" icon={<UserOutlined />}>
                      <Link href="/profile">
                        <a>Profile</a>
                      </Link>
                    </Menu.Item>,
                  ]
                : null}
              {!user && !loading ? (
                <Menu.Item key="/api/login" icon={<CloudUploadOutlined />}>
                  <Link href="/api/login">
                    <a>Login</a>
                  </Link>
                </Menu.Item>
              ) : null}
            </Menu>
          </Sider>
          <Layout className={style.siteLayout}>
            <Header className={style.siteLayoutBackground} style={{ padding: 0 }}>
              {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: style.trigger,
                onClick: toggle,
              })}
            </Header>
            <Content
              className={style.siteLayoutBackground}
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </UserProvider>
    </>
  );
};
