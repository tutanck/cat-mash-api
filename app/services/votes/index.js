const Cat = require('../../models/Cat');
const CatVote = require('../../models/CatVote');

const addVoteForCat = async (catId, vote) => {
  const cat = await Cat.findById(catId).orFail();

  return CatVote.create({
    cat_id: cat._id,
    value: vote,
  });
};

module.exports = { addVoteForCat };
