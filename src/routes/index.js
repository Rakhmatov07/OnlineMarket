const auth = require("./auth.route");
const contact = require('./contact.route');
const product = require('./product.route');
const review = require('./review.route');

module.exports = [auth, contact, product, review];