const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("routes");

  res.json(users.map((user) => user.toJSON()));
});

usersRouter.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).populate(
    "routes",
    { airline: 1, src: 1, dest: 1 }
  );
  res.json(user.toJSON());
});

module.exports = usersRouter;
