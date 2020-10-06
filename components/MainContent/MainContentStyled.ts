import styled from 'styled-components';
import { Layout } from 'antd';

export const MainContent = styled(Layout)`
  background: #fff;
  & .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  & .trigger:hover {
    color: #1890ff;
  }

  & .siteLayoutBackground {
    padding: 0;
    background: #fff;
  }

  & .mainContent {
    margin: 24px 16px;
    padding: 24;
    min-height: 1000px;
    background: #fff;
  }
`;
