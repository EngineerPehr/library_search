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

// Sorts most popular genres in descending order
const getMostCommonGenres = (books = []) => {
  const genreObjects = []
  // Builds list of genres then loops through it to create an array of objects
  const extractedGenres = extractBookGenres(books)
  const list = extractedGenres.reduce((accList, genre) => addToList(genre, accList), {})
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

// Sorts 5 most popular books in descending order
const getMostPopularBooks = (books = []) => {
  const booksAndCounts = extractBookNameAndCount(books)
  return sortByCount(booksAndCounts)
}

// Helper function to get the author and number of borrows from a book
const extractAuthorAndCount = (books = []) => {
  return books.reduce((acc, book) => {
    const authorNames = book.author.name
    const extractedAuthor = {name: `${authorNames.first} ${authorNames.last}`, count: book.borrows.length}
    acc.push(extractedAuthor)
    return acc
  }, [])
}

// Sorts 5 most popular authors in descending order
const getMostPopularAuthors = (books = [], authors = []) => {
  const authorObjects = []
  const updatedBooks = addAuthorToBook(books, authors)
  const authorsAndCount = extractAuthorAndCount(updatedBooks)
  const list = authorsAndCount.reduce((accList, author) => addToList(author, accList), {})
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
