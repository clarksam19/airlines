const jwt = require("jsonwebtoken");
const routeRouter = require("express").Router();
const Route = require("../models/route");
const User = require("../models/user");

routeRouter.get("/", async (req, res) => {
  const results = await Route.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  res.json(results.map((result) => result.toJSON()));
});

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

routeRouter.get("/:id", async (req, res) => {
  const result = await Route.findById(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).end();
  }
});

routeRouter.post("/", async (req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const route = new Route({
    airline: body.airline,
    src: body.src,
    dest: body.dest,
    user: user._id,
  });

  const savedRoute = await route.save();

  user.routes = user.routes.concat(savedRoute._id);
  await user.save();

  res.json(savedRoute.toJSON());
});

routeRouter.delete("/:id", async (req, res) => {
  await Route.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

routeRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const route = new Route({
    airline: body.content.airline,
    src: body.content.src,
    dest: body.content.dest,
  });

  Route.findByIdAndUpdate(req.params.id, content, { new: true })
    .then((updatedRoute) => {
      res.json(updatedRoute.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = routeRouter;
