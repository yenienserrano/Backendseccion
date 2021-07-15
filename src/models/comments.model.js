const { Schema, Model } = require("mongoose");

const CommentSchema = new Schema({
  idea: { type: String, required: true },
  description: { type: String },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    autopopulate: true,
  },
});

CommentSchema.plugin(require("mongoose-autopopulate"));

module.exports = Model.bind("comment", CommentSchema);
