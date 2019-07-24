const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const SkillGroup = require('../models/SkillGroup');
const content = require('../content.json');

router.get('/', async function (req, res) {
  const skills = await Skill.find();
  const skillGroups = await SkillGroup.find();

  let obj = {
    title: 'Главная страница',
    content,
    skills,
    skillGroups
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/about', obj);
});

module.exports = router;