const db = require('./db');

exports.getTodaysPicks = async (req, res) => {
  const picks = await db.selectTodaysPicks(req.query.category);
  if (picks.length != 0) {
    res.status(200).json(picks);
  } else {
    res.status(404).send();
  }
};

exports.getCategory = async (req, res) => {
  const category = await db.selectCategory(req.params.name);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).send();
  }
};

exports.postUser = async (req, res) => {
  const newUser = await db.insertUser(
    req.body.fn,
    req.body.ln,
    req.body.email,
    req.body.phone,
    req.body.password);
  res.status(201).send(newUser);
};
