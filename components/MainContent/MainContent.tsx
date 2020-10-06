import { FC, createElement } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// Styled Components
import * as SC from './MainContentStyled';

const { Header, Content } = Layout;

interface Props {
  collapsed: boolean;
  onToggle: () => void;
  children: JSX.Element | JSX.Element[] | [];
}

export const MainContent: FC<Props> = ({ collapsed, onToggle, children }): JSX.Element => {
  return (
    <SC.MainContent>
      <Layout>
        <Header className="siteLayoutBackground">
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: onToggle,
          })}
        </Header>
        <Content className="mainContent">{children}</Content>
      </Layout>
    </SC.MainContent>
  );
};
