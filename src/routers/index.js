const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { ErrorMiddleware, NotFoundMiddleware } = require("../middlewares");
require("express-async-errors");
const swaggerUI = require("swagger-ui-express");
const { SWAGGER_PATH } = require("../config");
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function ({
  HomeRoutes,
  UserRoutes,
  IdeaRoutes,
  CommentRoutes,
  AuthRoutes,
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  apiRouter.use(express.json()).use(cors()).use(helmet()).use(compression());

  apiRouter.use("/home", HomeRoutes);
  apiRouter.use("/user", UserRoutes);
  apiRouter.use("/idea", IdeaRoutes);
  apiRouter.use("/comment", CommentRoutes);
  apiRouter.use("/auth", AuthRoutes);

  router.use("/v1/api", apiRouter);
  router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
