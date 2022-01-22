if (process.env.MODE_ENV === "production") {
  module.exports = require("./production");
} else {
  module.exports = require("./development");
}
