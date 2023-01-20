import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

// --------------- SCHEMA & MODELS ---------------
import schema from './schema';
import migrations from './Model/migrations';
import Restaurant from './Model/Restaurant';

// --------------- DATABASE ---------------
const adapter = new SQLiteAdapter({
  dbName: 'restaurantsDb',
  schema,
  migrations,
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
    console.log('Database error => ', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Restaurant],
});

export default database;
