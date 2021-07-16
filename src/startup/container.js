const { createContainer, asClass, asValue, asFunction } = require("awilix");

//config

const config = require("../config");
const app = require(".");

//Services
const {
  HomeService,
  UserService,
  IdeaService,
  CommentService,
} = require("../services");

//controller
const HomeController = require("../controllers/home.controller");

//routes
const { HomeRoutes } = require("../routers/index.routes");
const Routes = require("../routers");

//models
const { User, Comment, Idea } = require("../models");

//repositories
const {
  CommentRepository,
  IdeaRepository,
  UserRepository,
} = require("../repositories");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
  })
  .register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
  });

module.exports = container;
