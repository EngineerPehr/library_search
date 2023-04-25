// Importing helper functions from other modules
const {partitionBooksByBorrowedStatus} = require("./books")
const {addAuthorToBook} = require('./accounts')

// Gets number of books
const getTotalBooksCount = (books = []) => books.length

// Gets number of accounts
const getTotalAccountsCount = (accounts = []) => accounts.length

// Gets number of books that have not been returned
const getBooksBorrowedCount = (books = []) => partitionBooksByBorrowedStatus(books)[0].length

// Helper function to sort into descending numerical order
const sortByCount = (items = []) => items.sort((itemA, itemB) => (itemB.count - itemA.count)).slice(0, 5)

//Helper function to consolidate objects into a list object
const addToList = ({name, count} = {}, list = {}) => {
  const selected = list[name];
  if (selected) {
    selected.count += count;
  } else {
    list[name] = {name, count};
  }
  return list;
}

// Helper function to get genre names from books
const extractBookGenres = (books = []) => books.map((book) => ({name: book.genre, count: 1}))

// Returns 5 most popular genres in descending order
const getMostCommonGenres = (books = []) => {
  const list = {}
  const genreObjects = []
  const extractedGenres = extractBookGenres(books)
  // Builds list of genres then loops through it to create an array of objects
  extractedGenres.forEach((genre) => addToList(genre, list))
  for (item in list) {
    const currentItem = list[item]
    const genreObj = {...currentItem}
    genreObjects.push(genreObj)
  }
  return sortByCount(genreObjects)
}

// Helper function to get a book's title and the number of times it has been borrowed
const extractBookNameAndCount = (books = []) => {
  return books.reduce ((acc, book) => {
    acc.push({name: book.title, count: book.borrows.length})
    return acc
  }, [])
}

const getMostPopularBooks = (books = []) => {
  const booksAndCounts = extractBookNameAndCount(books)
  return sortByCount(booksAndCounts)
}

const extractAuthorAndCount = (books = []) => {
  return books.reduce((acc, book) => {
    const authorNames = book.author.name
    const authorFirstName = authorNames.first
    const authorLastName = authorNames.last
    const extractedAuthor = {name: `${authorFirstName} ${authorLastName}`, count: book.borrows.length}
    acc.push(extractedAuthor)
    return acc
  }, [])
}


const getMostPopularAuthors = (books = [], authors = []) => {
  const list = {}
  const authorObjects = []
  const updatedBooks = addAuthorToBook(books, authors)
  const authorsAndCount = extractAuthorAndCount(updatedBooks)
  authorsAndCount.forEach((author) => addToList(author, list))
  for (item in list) {
    const currentItem = list[item]
    const authorObj = {...currentItem}
    authorObjects.push(authorObj)
  }
  return sortByCount(authorObjects)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
