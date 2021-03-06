const { enrichCatList } = require('./enrich');
const Cat = require('../../models/Cat');

const list = async () => {
  const catList = await Cat.find();

  const enrichedCatList = await enrichCatList(catList);

  return enrichedCatList;
};

const match = async () => {
  const fightingCats = Cat.aggregate([{ $sample: { size: 2 } }]);

  return fightingCats;
};

module.exports = { list, match };
