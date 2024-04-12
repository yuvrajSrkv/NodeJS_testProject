const BookEntry = require("../model/bookEntry");
const Books = require("../model/books");

exports.bookPost = async (req, res) => {
  const bookName = req.body.bookName;
  try {
    const book = await Books.create({
      bookName: bookName,
    });
    const bookentry = await book.createBookEntry();
    let bookReturnTime = bookentry.createdAt.getTime() + 3600000;
    bookReturnTime = new Date(bookReturnTime);
    const result = {
      bookId: book.id,
      bookName: book.bookName,
      bookEntryTime: bookentry.createdAt.toLocaleString(),
      bookReturnTime: bookReturnTime.toLocaleString(),
      fine: 0,
    };

    res.json(result);
  } catch (e) {
    console.log(e);
  }
};

exports.bookGet = async (req, res) => {
  const result = [];
  const books = await Books.findAll();
  console.log(books.length);
  for (let i = 0; i < books.length; i++) {
    const bookentry = await books[i].getBookEntry();
    if (bookentry == null) {
      continue;
    }
    let bookReturnTime = bookentry.createdAt.getTime() + 3600000;
    bookReturnTime = new Date(bookReturnTime);
    const currentTime = new Date();
    let fineTime =
      (currentTime.getTime() - bookentry.createdAt.getTime()) / 3600000;
    fineTime = Math.floor(fineTime);
    let fine = 0;
    if (fineTime >= 1) {
      fine = (fineTime - 1) * 10;
    }
    const element = {
      bookId: books[i].id,
      bookName: books[i].bookName,
      bookEntryTime: bookentry.createdAt.toLocaleString(),
      bookReturnTime: bookReturnTime.toLocaleString(),
      fine: fine,
    };
    result.push(element);
  }
  res.json(result);
};
