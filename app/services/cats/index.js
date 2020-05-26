const Cat = require('../../models/Cat');

const list = async () => {
  const cats = await Cat.find();

  return cats;
};

module.exports = { list };
