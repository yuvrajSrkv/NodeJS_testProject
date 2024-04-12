const BookEntry = require("../model/bookEntry");
const Books = require("../model/books");
const BookReturn = require("../model/bookReturn");
const BookFine = require("../model/bookFine");

exports.bookReturnPost = async (req, res) => {
  const bookId = req.body.bookId;
  const book = await Books.findByPk(bookId);
  const bookEntry = await book.getBookEntry();
  const entryTime = bookEntry.createdAt;

  await bookEntry.destroy();

  const bookReturn = await book.createBookReturn({
    entryTime: entryTime,
  });

  const fineTime = Math.floor(
    (bookReturn.createdAt.getTime() - entryTime.getTime()) / 3600000
  );
  let fine = 0;
  if (fineTime >= 1) {
    fine = (fineTime - 1) * 10;
  }
  const bookFine = await book.createBookFine({
    fine: fine,
  });

  const result = {
    bookId: bookId,
    bookName: book.bookName,
    entryTime: entryTime.toLocaleString(),
    returnTime: bookReturn.createdAt.toLocaleString(),
    fine: fine,
  };

  res.json(result);
};

exports.bookReturnGet = async (req, res) => {
  const result = [];
  const books = await Books.findAll();
  for (let i = 0; i < books.length; i++) {
    const bookReturn = await books[i].getBookReturn();
    const bookFine = await books[i].getBookFine();
    if (bookReturn == null || bookFine == null) {
      continue;
    }
    const element = {
      bookId: books[i].id,
      bookName: books[i].bookName,
      entryTime: bookReturn.entryTime,
      returnTime: bookReturn.createdAt,
      fine: bookFine.fine,
    };
    result.push(element);
  }
  res.json(result);
};
