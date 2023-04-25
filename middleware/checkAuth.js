module.exports = {

    // If authentication succeeds, call the next() function
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/");
    },
};
