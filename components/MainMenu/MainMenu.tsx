import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';
import { UserOutlined, CloudUploadOutlined, CloudDownloadOutlined, HomeOutlined } from '@ant-design/icons';
// Styled Components
import * as SC from './MainMenuStyled';
// User Context
import { useUser } from '../../lib/UserContext';

interface Props {
  collapsed: boolean;
}

export const MainMenu: FC<Props> = ({ collapsed }): JSX.Element => {
  const { user, loading } = useUser();
  const { pathname } = useRouter();
  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <SC.MainMenu>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          {user && !loading
            ? [
                <Menu.Item key="/profile" icon={<UserOutlined />}>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </Menu.Item>,
                <Menu.Item key="/api/logout" icon={<CloudDownloadOutlined />}>
                  <Link href="/api/logout">
                    <a>Logout</a>
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
      </SC.MainMenu>
    </Layout.Sider>
  );
};
