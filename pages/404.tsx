import Link from 'next/link';
import { MainLayout } from '../components';
import { Alert } from 'antd';

const ErrorPage = () => {
  return (
    <MainLayout>
      <Alert message="Error 404 page not found!" description={`Please go back to safety`} type="error" showIcon />
      <p style={{padding: '20px 30px'}}>
        <Link href="/">
          <a>Go back</a>
        </Link>
      </p>
    </MainLayout>
  );
};

export default ErrorPage;
