import classNames from 'classnames';
import styled from 'styled-components';
import { usePrepareShops } from '../../hooks/usePrepareShops';

export type TFilter = {
  x: number | null;
  y: number | null;
  name: string;
};

export const Shops = (filters: TFilter) => {
  const { shops, isLoading, isError } = usePrepareShops(filters);
  const { x, y } = filters;
  const hasUserPosition = x !== null && y !== null;

  const renderContent = () => {
    if (isError) {
      return <p>Something went wrong while fetching coffee shops.</p>;
    }

    if (isLoading) {
      return <p>Loading coffee shops...</p>;
    }

    if (shops?.length === 0) {
      return <p>Sorry, no coffee shops available in your area :(</p>;
    }

    return (
      <>
        <p>
          Top 3 closest coffee shops to the user position
          <span>{!hasUserPosition ? ' will be' : ' are'}</span> highlighted.
          {!hasUserPosition && <span> Please provide coordinates.</span>}
        </p>
        <ShopsList aria-label='Coffee shops list'>
          {shops?.map((shop, index) => (
            <ShopItem
              key={`${shop.id}-${index}`}
              className={classNames({
                highlight: hasUserPosition && index < 3,
              })}
            >
              <ShopName>{shop.name}</ShopName>
              <ShopDetails>
                {shop.distance
                  ? `Distance: ${shop.distance}`
                  : `Coordinates: ${shop.x}, ${shop.y}`}
              </ShopDetails>
            </ShopItem>
          ))}
        </ShopsList>
      </>
    );
  };

  return (
    <Div>
      <Title>Coffee shops</Title>
      {renderContent()}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h2`
  margin: 0;
`;

const ShopsList = styled.ul`
  list-style-type: none;
  padding: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #8a8a8aff;
  border-radius: 12px;
`;

const ShopItem = styled.li`
  &.highlight {
    color: #18aff0;
  }
`;

const ShopName = styled.h3`
  margin: 0;
`;

const ShopDetails = styled.p`
  margin: 0;
`;
