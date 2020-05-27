const { Router } = require('express');
const { param, body, validationResult } = require('express-validator');
const { addVoteForCat } = require('../../services/votes');

const router = Router();

router.post(
  '/add/by/cat/:catId',

  [param('catId').isMongoId(), body('vote').isInt({ min: 1, max: 1 })],

  async (req, res) => {
    try {
      validationResult(req).throw();
    } catch (errors) {
      res.status(404).json(errors.array());
    }

    const { catId } = req.params;
    const { vote } = req.body;

    const result = await addVoteForCat(catId, Number(vote));

    return res.status(200).json(result);
  }
);

module.exports = router;
