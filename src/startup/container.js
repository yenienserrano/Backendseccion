const { createContainer, asClass, asValue, asFunction } = require("awilix");

//config

const config = require("../config");
const app = require(".");

//Services
const HomeService = require("../services/home.service");

//controller
const HomeController = require("../controllers/home.controller");

//routes
const { HomeRoutes } = require("../routers/index.routes");
const Routes = require("../routers");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({ HomeService: asClass(HomeService).singleton() })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
  });

module.exports = container;
