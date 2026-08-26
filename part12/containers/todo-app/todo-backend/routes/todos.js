const express = require('express');
const { Todo } = require('../mongo');
const redis = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  const currentCount = parseInt(await redis.getAsync('added_todos') || 0);
  await redis.setAsync('added_todos', currentCount + 1);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  try {
    req.todo = await Todo.findById(id)
    if (!req.todo) return res.sendStatus(404)
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid ID format' })
  };
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo by ID */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;

  if (text !== undefined) {
    if (typeof text !== 'string') {
      return res.status(400).send({ error: '"text" must be a string' });
    };
    
    req.todo.text = text;
  };

  if (done !== undefined) {
    if (typeof done !== 'boolean') {
      return res.status(400).send({ error: '"done" must be a boolean' });
    };

    req.todo.done = done;
  };

  const updatedTodo = await req.todo.save();
  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;