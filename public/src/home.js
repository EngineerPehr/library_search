const {partitionBooksByBorrowedStatus} = require("./books")
const {addAuthorToBook} = require('./accounts')

const getTotalBooksCount = (books = []) => books.length

const getTotalAccountsCount = (accounts = []) => accounts.length

const getBooksBorrowedCount = (books = []) => partitionBooksByBorrowedStatus(books)[0].length

const sortGenreByCount = (genres = []) => genres.sort((genreA, genreB) => (genreB.count - genreA.count)).slice(0, 5)

const extractBookGenres = (books = []) => books.map((book) => book.genre)

const addGenreToList = (genre, list = {}) => {
  const selected = list[genre];
  if (selected) {
    selected.count++;
  } else {
    list[genre] = {name: genre, count: 1};
  }
  return list;
}

const getMostCommonGenres = (books = []) => {
  const list = {}
  const genreObjects = []
  const extractedGenres = extractBookGenres(books)
  extractedGenres.forEach((genre) => {
    addGenreToList(genre, list)
  })
  for (item in list) {
    const currentItem = list[item]
    const genreObj = {...currentItem}
    genreObjects.push(genreObj)
  }
  return sortGenreByCount(genreObjects)
}

const sortBooksByCount = (books = []) => books.sort((bookA, bookB) => (bookB.count - bookA.count)).slice(0, 5)

const extractBookNameAndCount = (books = []) => {
  const bookNamesAndCounts = []
  books.forEach((book) => {
    const extractedBook = {name: book.title, count: book.borrows.length}
    bookNamesAndCounts.push(extractedBook)
  })
  return bookNamesAndCounts
}

const getMostPopularBooks = (books = []) => {
  const booksAndCounts = extractBookNameAndCount(books)
  return sortBooksByCount(booksAndCounts)
}

const extractAuthorAndCount = (books = []) => {
  const bookAuthorsAndCounts = []
  books.forEach((book) =>  {
    const authorFirstName = book.author.name.first
    const authorLastName = book.author.name.last
    const extractedAuthor = {name: `${authorFirstName} ${authorLastName}`, count: book.borrows.length}
    bookAuthorsAndCounts.push(extractedAuthor)
  })
  return bookAuthorsAndCounts
}

const addAuthorToList = ({name, count} = {}, list = {}) => {
  const selected = list[name];
  if (selected) {
    selected.count += count;
  } else {
    list[name] = {name, count};
  }
  return list;
}

const sortAuthorsByCount = (authors = []) => authors.sort((authorA, authorB) => (authorB.count - authorA.count)).slice(0, 5)

const getMostPopularAuthors = (books = [], authors = []) => {
  const list = {}
  const authorObjects = []
  const updatedBooks = addAuthorToBook(books, authors)
  const authorsAndCount = extractAuthorAndCount(updatedBooks)
  authorsAndCount.forEach((author) => addAuthorToList(author, list))
  for (item in list) {
    const currentItem = list[item]
    const authorObj = {...currentItem}
    authorObjects.push(authorObj)
  }
  return sortAuthorsByCount(authorObjects)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
