const { Router } = require('express');
const { validationResult } = require('express-validator');
const { list, match } = require('../../services/cats');

const router = Router();

router.get(
  '/list',

  [],

  async (req, res) => {
    try {
      validationResult(req).throw();
    } catch (errors) {
      res.status(404).json(errors.array());
    }

    const result = await list();
    return res.status(200).json(result);
  },
);

router.get(
  '/match',

  [],

  async (req, res) => {
    try {
      validationResult(req).throw();
    } catch (errors) {
      res.status(404).json(errors.array());
    }

    const result = await match();
    return res.status(200).json(result);
  },
);

module.exports = router;
