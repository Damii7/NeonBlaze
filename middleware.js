const isLoggedIn = (req, res, next) => {
    console.log(req.path);
    console.log(req.user);
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      return next(); // If user is authenticated, proceed to the next middleware/route handler
    }
    res.redirect('/login'); // If user is not authenticated, redirect to login page
  };
  
  const saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
  };
  
  module.exports = { isLoggedIn, saveRedirectUrl };
  