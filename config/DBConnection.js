import mongoose from 'mongoose';

const DBConnection = () => {
  const URI = process.env.DATABASE_URI;

  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('Connected to database.');
    })
    .catch(() => {
      console.log('Error stablishing connection to the database.');
    });
};

export default DBConnection;
