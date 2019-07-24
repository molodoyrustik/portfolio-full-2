const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async function (req, res) {
  const posts = await Post.find();
  let obj = {
    title: 'Главная страница',
    posts
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/blog', obj);
});

module.exports = router;