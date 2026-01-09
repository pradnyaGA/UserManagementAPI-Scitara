// app-memory-validator.js
const express = require('express');
const { body, param, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// Middleware: handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get(
  '/users/:id',
  param('id').isInt().withMessage('User ID must be an integer'),
  handleValidationErrors,
  (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  }
);

// POST new user
app.post(
  '/users',
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required')
  ],
  handleValidationErrors,
  (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  }
);

// PUT update user
app.put(
  '/users/:id',
  [
    param('id').isInt().withMessage('User ID must be an integer'),
    body('name').optional().isString().withMessage('Name must be a string'),
    body('email').optional().isEmail().withMessage('Email must be valid')
  ],
  handleValidationErrors,
  (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  }
);

// DELETE user
app.delete(
  '/users/:id',
  param('id').isInt().withMessage('User ID must be an integer'),
  handleValidationErrors,
  (req, res) => {
    const id = parseInt(req.params.id);
    const exists = users.some(u => u.id === id);
    if (!exists) return res.status(404).json({ error: 'User not found' });

    users = users.filter(u => u.id !== id);
    res.status(204).send();
  }
);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => console.log('In-Memory API with validator running on port 3000'));