const robot = require('robotjs');

exports.sendKeys = (key) => {
  robot.keyTap(key);
  return key;
};
