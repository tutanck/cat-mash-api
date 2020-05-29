const { list, match } = require('./index');
const Cat = require('../../models/Cat');
const { enrichCatList } = require('./enrich');
const catsData = require('../../../public/data.json');

const cats = catsData.images;

jest.mock('./enrich');
jest.mock('../../models/Cat');

describe('list', () => {
  const enrichment = {
    richProperty1: 'richValue1',
    richProperty2: 'richValue2',
    richProperty3: 'richValue3',
  };

  beforeEach(() => {
    Cat.find.mockResolvedValue(cats);

    enrichCatList.mockImplementation(async (list) =>
      list.map((el) => ({ ...el, ...enrichment })),
    );
  });

  it(`
    should find all cats;
    then enrich the found cats with enrichment properties;
    `, async () => {
    // call
    const result = await list();

    // expectations
    expect(Cat.find).toHaveBeenCalled();

    expect(enrichCatList).toHaveBeenCalledWith(cats);

    expect(result).toEqual(cats.map((cat) => ({ ...cat, ...enrichment })));
  });
});

describe('match', () => {
  beforeEach(() => {
    Cat.aggregate.mockResolvedValue([cats[0], cats[1]]);
  });

  it(`
      should select 2 random cats      
      `, async () => {
    // call
    const result = await match();

    // expectations
    expect(Cat.aggregate).toHaveBeenCalledWith([{ $sample: { size: 2 } }]);

    expect(result).toEqual([cats[0], cats[1]]);
  });
});
