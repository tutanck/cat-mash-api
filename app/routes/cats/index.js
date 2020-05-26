const { Router } = require('express');
const { validationResult } = require('express-validator');
const { BadRequest } = require('http-errors');
const { list } = require('../../services/cats');

const router = Router();

router.get(
  '/list',

  [],

  async (req, res) => {
    try {
      validationResult(req).throw();
    } catch (errors) {
      throw new BadRequest({ errors: errors.array() });
    }

    const result = await list();
    return res.status(200).json(result);
  }
);

module.exports = router;
