const { enrichCatList } = require('./enrich');
const Cat = require('../../models/Cat');

const list = async () => {
  const catList = await Cat.find();

  const enrichedCatList = await enrichCatList(catList);

  return enrichedCatList;
};

module.exports = { list };
