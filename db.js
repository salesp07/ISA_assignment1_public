const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
mongoose.connect(process.env.MONGO_KEY);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;