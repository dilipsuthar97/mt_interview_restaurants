import {Ajax} from '_services';

const Common = {
  getRestaurants: () => {
    const route = '/restaurants_list';
    return Ajax.request(route, {method: Ajax.GET});
  },
};

export default Common;
