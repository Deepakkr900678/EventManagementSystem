//map routes here
const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");
const ticketRouter = require("./routes/ticket");
const commentRouter = require("./routes/comment");

module.exports = function(app){
    app.use("/api/v1", userRouter);
    app.use('/api/v1', eventRouter);
    app.use('/api/v1', ticketRouter);
    app.use('/api/v1', commentRouter);
}