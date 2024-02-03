// db connection
const mongoose = require("mongoose");

const { CommentSchema } = require("./schema/commentSchema");
const { EventSchema } = require("./schema/eventSchema");
const { RatingSchema } = require("./schema/ratingSchema")
const { TicketSchema } = require("./schema/ticketSchema");
const { UserSchema } = require("./schema/userSchema");

const connectionUri = `mongodb+srv://eventmanagement:eventmanagement@cluster0.3sxtrw4.mongodb.net/eventmanagement?retryWrites=true&w=majority`;

mongoose.connect(connectionUri, {
  useUnifiedTopology: true,
  autoIndex: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

// Model definitions
const commentModel = mongoose.model("Comment", CommentSchema);
const eventModel = mongoose.model("Events", EventSchema);
const ratingModel = mongoose.model("Rating", RatingSchema);
const ticketModel = mongoose.model("Tickets", TicketSchema);
const userModel = mongoose.model("Users", UserSchema);

module.exports = {
  db,
  userModel,
  commentModel,
  eventModel,
  ticketModel,
  ratingModel
};
