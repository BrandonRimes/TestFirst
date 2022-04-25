const { Router } = require("express");
const Book = require("../models/Book.model");
const bookRouter = Router();

bookRouter.post("/create", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.send(book);
  } catch (error) {
    console.log(error);
  }
})

bookRouter.patch("/checkout/:id", async (req, res) => {
  try {
    const book = await Book.findOne({_id: req.params.id});
    book.set(req.body);
    await book.save();
    res.send(book);
  } catch (error) {
    console.log(error);
  }
});

bookRouter.patch("/checkedin/:id", async (req, res) => {
  try {
    const book = await Book.findOne({_id: req.params.id});
    book.set(req.body);
    await book.save();
    res.send(book);
  } catch (error) {
    console.log(error);
  }
});

bookRouter.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.sendStatus(404);
    console.log(error);
  }
});

module.exports = bookRouter;
