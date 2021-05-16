import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ProductProps, RestaurantProps } from '../../dtos';

const { persistAtom } = recoilPersist();

const cartState = atom({
  key: 'cartState',
  default: {
    restaurant: {},
    products: []
  },
  effects_UNSTABLE: [persistAtom]
});

export default cartState;