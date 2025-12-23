const moongose = require('mongoose');

const DBConnect = async () => {
  try {
    await moongose.connect(process.env.DB_CONNECTION_STRING);
      console.log('Database connected successfully');
      } catch (error) {
        console.error('Database connection failed', error);
      }
};

module.exports = DBConnect;
