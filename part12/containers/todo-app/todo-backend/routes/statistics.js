const express = require('express');
const router = express.Router();
const redis = require('../redis');

router.get('/', async (req, res) => {
  const addedTodos = parseInt(await redis.getAsync('added_todos') || 0);
  res.json({ added_todos: addedTodos });
});

module.exports = router;