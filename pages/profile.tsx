import { MainLayout } from '../layouts';
import styled from 'styled-components';
import { useFetchUser } from '../utils/user';
import Router from 'next/router';

const StyledProfile = styled.div`
  
`;

export default function Profile() {
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
      <StyledProfile>
        <section style={{ color: 'darkblue', background: 'tomato', textAlign: 'center', padding: 30 }}>
          <h1>Profile Page</h1>
        </section>
        <p>Welcome to the Profile Page! Here is your profile information:</p>
        <pre>
          <code>{JSON.stringify(user, null, 2)}</code>
        </pre>
      </StyledProfile>
    </MainLayout>
  );
}
