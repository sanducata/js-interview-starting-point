import styled from 'styled-components';
import { Filters } from './components/filters/Filters';
import { Shops } from './components/shops/Shops';

function App() {
  return (
    <Page>
      <Title>Coffee Addicts</Title>
      <PageContent>
        <Filters />
        <Shops />
      </PageContent>
    </Page>
  );
}

export default App;

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #000;
  border-radius: 16px;
  padding: 20px 40px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-align: center;
`;

const PageContent = styled.div`
  display: flex;
  gap: 50px;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
