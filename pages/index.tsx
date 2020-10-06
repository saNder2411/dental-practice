import { MainLayout } from '../layouts';

const Index = () => {
  return (
    <MainLayout title={`Next App`}>
      <section style={{ color: 'darkblue', background: 'tomato', textAlign: 'center', padding: 30, width: '100%', marginBottom: 'auto' }}>
        <h1>Home Page</h1>
      </section>
    </MainLayout>
  );
};

export default Index;
