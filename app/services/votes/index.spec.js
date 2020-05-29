const Cat = require('../../models/Cat');
const CatVote = require('../../models/CatVote');
const catsData = require('../../../public/data.json');
const { Types } = require('mongoose');
const { addVoteForCat, averageScoreForCat } = require('./index');

const cats = catsData.images;

jest.mock('../../models/Cat');
jest.mock('../../models/CatVote');

describe('addVoteForCat', () => {
  const catId = '5ecd3c3597ed1d0a2938b01c',
    vote = 1;

  const cat = { _id: catId, ...cats[0] };

  beforeEach(() => {
    Cat.findById.mockReturnValue({ orFail: async () => cat });
  });

  it(`
    should add a vote for a cat;
    `, async () => {
    // call
    await addVoteForCat(catId, vote);

    // expectations
    expect(Cat.findById).toHaveBeenCalledWith(catId);
    expect(CatVote.create).toHaveBeenCalledWith({
      cat_id: cat._id,
      value: vote,
    });
  });
});

describe('averageScoreForCat', () => {
  const catId = '5ecd3c3597ed1d0a2938b01c',
    score = 7;

  const cat = { _id: catId, ...cats[0] };

  beforeEach(() => {
    Cat.findById.mockReturnValue({ orFail: async () => cat });
    CatVote.aggregate.mockReturnValue([{ score: score }]);
  });

  it(`
    should return the average score for a cat;
    `, async () => {
    // call
    await averageScoreForCat(catId);

    // expectations
    expect(Cat.findById).toHaveBeenCalledWith(catId);
    expect(CatVote.aggregate).toHaveBeenCalledWith([
      { $match: { cat_id: new Types.ObjectId(cat._id) } },
      {
        $group: {
          _id: '$cat_id',
          score: { $sum: '$value' },
        },
      },
    ]);
  });
});
