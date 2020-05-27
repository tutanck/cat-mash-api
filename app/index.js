const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { blue, green } = require('chalk');
const Cat = require('./models/Cat');
const data = require('../public/data.json');

const dotenv = require('dotenv');
dotenv.config();

const catsRouter = require('./routes/cats');
const votesRouter = require('./routes/votes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/cats', catsRouter);
app.use('/votes', votesRouter);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.dbURL, {
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

    if (catList.length === 0) {
      await Cat.insertMany(data.images.map((cat) => new Cat(cat).toJSON()));
    }

    app.listen(process.env.PORT);
    console.log(blue(`Express ready !`));
  });
}

module.exports = app;
