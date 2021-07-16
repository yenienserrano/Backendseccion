const mcache = require("memory-cache");
const { CACHE_KEY } = require("../config");

module.exports = function (duration) {
  return (req, res, next) => {
    const key = CACHE_KEY + req.originUrl || req.url;
    const cacheBody = mcache.get(key);

    if (cacheBody) {
      return res.send(JSON.parse(cacheBody));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.get(key, body, duration * 100);
        res.sendResponse(body);
      };
      next();
    }
  };
};
