const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const config = require('../config.json');
const Work = require('../models/Work');

router.get('/', async function (req, res) {
  const works = await Work.find();
  let obj = {
    title: 'Мои работы',
    works,
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/works', obj);
});

router.post('/', async function (req, res) {
  try {
   if (!req.body.name || !req.body.email || !req.body.text) {
     return res.json({ flag: false, message: 'Укажите данные!' });
   }

   const transporter = nodemailer.createTransport(smtpTransport(config.mail.smtp));

   const mailOptions = {
     from: config.mail.smtp.auth.user,
     to: 'molodoybaja@gmail.com',
     subject: config.mail.subject,
     text: req
     .body
     .text
     .trim()
     .slice(0, 500) + `\n Отправлено с: <${req.body.email}>`
   };

   await transporter.sendMail(mailOptions);
   res.json({ flag: true, message: 'Письмо успешно отправлено' });
  } catch(err) {
    return res.json({ flag: false, message: 'При отправке письма на сервере произошла ошибка' });
  }
});

module.exports = router;