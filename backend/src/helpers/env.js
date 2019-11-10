require('dotenv').config();

const env = (key, _default = null) => {
  const result = process.env[key];

  if (!Number.isNaN(Number(result))) {
    return parseInt(result, 10);
  }

  if (result === 'false') {
    return false;
  }

  if (result === 'true') {
    return true;
  }

  return result === undefined ? _default : result;
};

module.exports = env;
