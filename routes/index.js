/*
 * GET home page.
 */

exports.desktop = function (req, res) {
  res.render('desktop');
};

exports.mobile = function (req, res) {
  res.render('mobile');
};