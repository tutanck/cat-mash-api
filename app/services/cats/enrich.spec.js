const { averageScoreForCat } = require('../votes');
const { enrichCat, enrichCatList } = require('./enrich');

const catsData = require('../../../public/data.json');

const cats = catsData.images;

const score = 3;

const superCat = (cat) => ({ ...cat, toJSON: () => cat });

jest.mock('../votes');
jest.mock('../../models/Cat');

beforeEach(() => {
  averageScoreForCat.mockResolvedValue(score);
});

describe('enrichCat', () => {
  const cat = { _id: 1, ...cats[0] };

  it(`
    should enrich a cat with its average score;
    `, async () => {
    // call
    const result = await enrichCat(superCat(cat));

    // expectations
    expect(averageScoreForCat).toHaveBeenCalledWith(cat._id);

    expect(result).toEqual({
      ...cat,
      score: score,
    });
  });
});

describe('enrichEcList', () => {
  it(`
    should enrich all cats with their respective scores;
    `, async () => {
    // call
    const result = await enrichCatList(cats.map(superCat));

    // expectations
    expect(result).toEqual(
      cats.map((cat) => ({
        ...cat,
        score: 3,
      })),
    );
  });
});
