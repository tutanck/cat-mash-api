const { averageScoreForCat } = require('../votes');

const enrichCat = async (cat) => {
  const score = await averageScoreForCat(cat._id);

  const richCat = {
    ...cat.toJSON(),
    score: score,
  };

  return richCat;
};

const enrichCatList = async (catList) => {
  return Promise.all(catList.map((cat) => enrichCat(cat)));
};

module.exports = { enrichCat, enrichCatList };
