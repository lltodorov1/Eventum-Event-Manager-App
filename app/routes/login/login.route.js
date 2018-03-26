const {
  Router,
} = require('express');

const passport = require('passport');

const init = (app, data) => {
  const router = new Router();

  router
  .get('/login', async (req, res) => {
    const context = {};
    res.render('./login/login', context);
  });

  app.post('/login',
  passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: false,
  }));

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.use('/', router);
};

module.exports = {
  init,
};
