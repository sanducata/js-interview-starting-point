import { useQuery } from '@tanstack/react-query';
import { getToken } from '../api/token';
import { getShops } from '../api/shops';
import { getDistance } from '../utils/utils';
import type { TFilter } from '../components/shops/Shops';
import { QUERY_KEYS } from '../api/constants';

export const usePrepareShops = ({ x, y, name }: TFilter) => {
  const { data: tokenData, isError: tokenError } = useQuery({
    queryKey: [QUERY_KEYS.TOKEN],
    queryFn: getToken,
  });

  const {
    data: shopsData,
    isFetching,
    isError: shopsError,
  } = useQuery({
    queryKey: [QUERY_KEYS.SHOPS],
    queryFn: () => getShops(tokenData),
    enabled: !!tokenData,
  });

  const hasUserPosition = x !== null && y !== null;

  const extendedShops =
    hasUserPosition && shopsData
      ? shopsData
          .map((shop) => ({
            ...shop,
            distance: getDistance({ x: x, y: y }, { x: shop.x, y: shop.y }),
          }))
          .sort((a, b) => a.distance - b.distance)
      : shopsData;

  const filteredShops =
    name && extendedShops && hasUserPosition
      ? extendedShops.filter((shop) =>
          shop.name.toLowerCase().includes(name.toLowerCase())
        )
      : extendedShops;

  return {
    shops: filteredShops,
    isLoading: isFetching || !shopsData,
    isError: tokenError || shopsError,
  };
};
