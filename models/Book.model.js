const mongoose =require("mongoose");

const { Schema, model } = mongoose;

const bookSchema = Schema ({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  fiction: Boolean,
  checked: {
    type: Boolean,
    default: false
  },
},{
  timestamps: true,
});

const Book = model("Book", bookSchema);
module.exports = Book;
