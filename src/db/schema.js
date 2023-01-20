import {appSchema, tableSchema} from '@nozbe/watermelondb';

// --------------- TABLE SCHEMA ---------------
export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'restaurants',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'latitude', type: 'string'},
        {name: 'longitude', type: 'string'},
        {name: 'rating', type: 'number'},
        {name: 'total_review', type: 'number'},
        {name: 'description', type: 'string'},
        {name: 'mobile', type: 'string'},
        {name: 'images', type: 'string'},
      ],
    }),
  ],
});
