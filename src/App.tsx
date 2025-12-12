import styled from 'styled-components';
import { Filters } from './components/filters/Filters';
import { Shops, type TFilter } from './components/shops/Shops';
import { useState } from 'react';

function App() {
  const [filters, setFilters] = useState<TFilter>({
    x: null,
    y: null,
    name: '',
  });

  return (
    <Page>
      <Title>Coffee Addicts</Title>
      <PageContent>
        <Filters onFiltersChange={setFilters} />
        <Shops {...filters} />
      </PageContent>
    </Page>
  );
}

export default App;

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #8a8a8aff;
  border-radius: 16px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
  }
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
