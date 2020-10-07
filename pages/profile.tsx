import Router from 'next/router';
import { Card } from 'antd';
// Components
import { MainLayout } from '../components';
// User Context
import { useFetchUser } from '../lib/UserContext';

const Profile = () => {
  const { user, loading } = useFetchUser();

  if (loading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }
  if (!user && !loading) {
    Router.replace('/');
  }

  return (
    <MainLayout>
      <section style={{ background: 'tomato', textAlign: 'center', padding: 30 }}>
        <h2>Profile Page</h2>
      </section>
      <Card title="Welcome to the Profile Page! Here is your profile information:" bordered={false}>
        <pre>
          <code>{JSON.stringify(user, null, 2)}</code>
        </pre>
      </Card>
    </MainLayout>
  );
};

export default Profile;
