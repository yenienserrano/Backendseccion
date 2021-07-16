const { Router } = require("express");
const { CacheTimeHelper } = require("../helpers");
const {
  AuthMiddleware,
  ParseIntMiddleware,
  CacheMiddleware,
} = require("../middlewares");

module.exports = function ({ UserController }) {
  const router = Router();

  router.get(
    "",
    [
      AuthMiddleware,
      ParseIntMiddleware,
      CacheMiddleware(CacheTimeHelper.ONE_HOUR),
    ],
    UserController.getAll
  );
  router.get("/:userId", UserController.get);
  router.patch("/:userId", UserController.update);
  router.delete("/:userId", UserController.delete);

  return router;
};
