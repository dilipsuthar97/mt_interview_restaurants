/**
 * Note:
 * DAO stands for - Data Access Object
 */

import {Q} from '@nozbe/watermelondb';
import database from '../db';

// -------------------- All days records ---------------
const restaurants = database.collections.get('restaurants');

export default {
  // Observe live records --------------------
  observeRestaurants: (order = 'desc') =>
    restaurants.query(Q.experimentalSortBy('created_at', order)).observe(),

  // Create new restaurant --------------------
  createDay: async newRestaurant => {
    return database.write(async () => {
      return restaurants.create(restaurant => {
        restaurant = newRestaurant;
      });
    });
  },

  // delete all days --------------------
  deleteAll: async () => {
    return database.write(async () => {
      return restaurants.query().destroyAllPermanently();
    });
  },
};
