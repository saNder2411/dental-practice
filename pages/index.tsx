import { MainLayout } from '../components';

const Index = () => {
  return (
    <MainLayout title={`Next App`}>
      <section style={{ background: 'tomato', textAlign: 'center', padding: 30 }}>
        <h2>Home Page</h2>
      </section>
    </MainLayout>
  );
};

export default Index;
