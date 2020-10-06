import Link from 'next/link';
import { MainLayout } from '../layouts';
import style from '../styles/error.module.css';

const ErrorPage = () => {
  return (
    <MainLayout>
      <h1 className={style.error}>Error 404</h1>
      <p>
        Please{' '}
        <Link href="/">
          <a>go back</a>
        </Link>{' '}
        to safety
      </p>
    </MainLayout>
  );
};

export default ErrorPage;
