const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  dest: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

routeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
