import classNames from 'classnames';
import styled from 'styled-components';

const dummyShops = [
  {
    id: 2,
    name: 'Blue Bottle SF',
    x: '37.521',
    y: '-122.334',
  },
  {
    id: 1,
    name: 'Blue Bottle Seattle',
    x: '47.581',
    y: '-122.316',
  },
  {
    id: 3,
    name: 'Blue Bottle Moscow',
    x: '55.752',
    y: '37.595',
  },
  {
    id: 4,
    name: 'Blue Bottle Seattle2',
    x: '47.587',
    y: '-122.337',
  },
  {
    id: 5,
    name: 'Blue Bottle Rio De Janeiro',
    x: '-22.923',
    y: '-43.234',
  },
];

export const Shops = () => {
  return (
    <Div>
      <Title>Coffee shops</Title>
      {dummyShops.length > 0 ? (
        <ShopsList aria-label='Coffee shops list'>
          {dummyShops.map((shop, index) => (
            <ShopItem
              key={`${shop.id}-${index}`}
              className={classNames({ highlight: index < 3 })}
            >
              <ShopName>{shop.name}</ShopName>
              <ShopDetails>
                Distance: {shop.x}, {shop.y}
              </ShopDetails>
            </ShopItem>
          ))}
        </ShopsList>
      ) : (
        <p>Sorry, no coffee shops available in your area :(</p>
      )}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-top: 0;
`;

const ShopsList = styled.ul`
  list-style-type: none;
  padding: 20px 40px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #000;
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
