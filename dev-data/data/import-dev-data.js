const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

/**
 * Connect to the database.
 * @returns None
 */
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

/**
 * Connects to the MongoDB database.
 * @returns None
 */
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful !'));

// READ JSON FILE
/**
 * A simple function that returns a list of tours.
 * @returns A list of tours.
 */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
// IMPORT DATA TO DATABASE
/**
 * Imports the data into the database.
 * @returns None
 */
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successful loaded !');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// DELETE ALL DATA FROM COLLECTION
/**
 * Deletes all data from the database.
 * @returns None
 */
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successful deleted !');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
