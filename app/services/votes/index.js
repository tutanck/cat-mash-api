const Cat = require('../../models/Cat');
const CatVote = require('../../models/CatVote');
const { Types } = require('mongoose');

const addVoteForCat = async (catId, vote) => {
  const cat = await Cat.findById(catId).orFail();

  return CatVote.create({
    cat_id: cat._id,
    value: vote,
  });
};

const averageScoreForCat = async (catId) => {
  const cat = await Cat.findById(catId).orFail();

  const sum = await CatVote.aggregate([
    { $match: { cat_id: new Types.ObjectId(cat._id) } },
    {
      $group: {
        _id: '$cat_id',
        score: { $sum: '$value' },
      },
    },
  ]);

  const score = sum[0] ? sum[0].score : null;

  return score;
};

module.exports = { addVoteForCat, averageScoreForCat };
