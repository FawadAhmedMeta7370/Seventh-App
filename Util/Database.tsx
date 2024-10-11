import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import Place from '../Models/Place';

enablePromise(true);

const connectDB = async () => {
  return openDatabase(
    {name: 'places.db'},
    () => {
      console.log('Connection success!');
    },
    error => {
      console.log('Error Connecting DB', error);
    },
  );
};
export async function init() {
  try {
    await connectDB().then(database => {
      database.transaction(tx => {
        // Create a new table with the correct schema (no inline comments in SQL)
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            long REAL NOT NULL
          )`,
          [],
          () => {
            console.log('Table created successfully');
          },
          error => {
            console.log('Error creating table:', error);
          },
        );
      });
    });
    console.log('Database initialized successfully');
  } catch (error) {
    console.log('Failed to initialize Database', error);
  }
}

export async function insertPlace(place) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      await connectDB().then(database => {
        database.transaction(
          tx => {
            tx.executeSql(
              `INSERT INTO places (title, imageUri, address, lat, long) VALUES (?, ?, ?, ?, ?)`,
              [
                place.title,
                place.imageUri,
                place.address,
                place.location.lat,
                place.location.long, // Make sure it's "long", not "lng"
              ],
              (_, result) => {
                console.log('Insert result', result);
                resolve(result);
              },
              error => {
                console.log('Error while inserting:', error);
                reject(error);
              },
            );
          },
          transactionError => {
            console.error('Transaction error:', transactionError);
            reject(transactionError);
          },
        );
      });
    } catch (error) {
      console.log('Insert Place Error:', error);
      reject(error);
    }
  });
  return promise;
}

export async function fetchPlaces() {
  const promise = new Promise(async (resolve, reject) => {
    await connectDB().then(database => {
      database.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM places',
          [],
          (_, result) => {
            let places = [];
            for (let i = 0; i < result.rows.length; i++) {
              const dp = result.rows.item(i);
              let p = new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  long: dp.long,
                },
                dp.id,
              );
              places.push(p);
            }
            console.log('Fetched places:', places);
            resolve(places);
          },
          (_, error) => {
            reject(error);
          },
        );
      });
    });
  });

  return promise;
}

export async function fetchPlaceDetails(id: any) {
  try {
    return new Promise(async (resolve, reject) => {
      await connectDB().then(database => {
        database.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM places WHERE id = ?',
            [id],
            (_, result) => {
              const dbPlace = result.rows.item(0);
              const place = new Place(
                dbPlace.title,
                dbPlace.imageUri,
                {
                  lat: dbPlace.lat,
                  long: dbPlace.long,
                  address: dbPlace.address,
                }, // Use "long" here
                dbPlace.id,
              );
              resolve(place);
            },
            (_, error) => {
              reject(error);
            },
          );
        });
      });
    });
  } catch (error) {
    console.log('Error fetching place details:', error);
  }
}
