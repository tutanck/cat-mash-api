const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { blue, green, redBright } = require('chalk');
const Cat = require('./models/Cat');
const data = require('../public/data.json');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const dbURL = 'mongodb://localhost:27017/catmash';

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', async () => {
    console.log(green('Mongoose is connected to Mongodb.'));

    const catList = await Cat.find();

    if (catList.length !== 0) {
      console.log(redBright('[Warning] : Database was not empty !'));
      return;
    }

    const catImages = data.images;

    await Cat.insertMany(catImages.map((cat) => new Cat(cat).toJSON()));

    app.listen(process.env.PORT);
    console.log(blue(`Express ready !`));
  });
}

module.exports = app;
