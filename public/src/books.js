// Finds first author that matches given id
const findAuthorById = (authors = [], id = '') => authors.find((author) => author.id === id)

// Finds first book that matches given id
const findBookById = (books = [], id = '') => books.find((book) => book.id === id)

// Filters books based on the returned status of the first borrow
const partitionBooksByBorrowedStatus = (books = []) => {
  const booksOut = books.filter((book) => book.borrows[0].returned === false)
  const booksIn = books.filter((book) => book.borrows[0].returned === true)
  return [booksOut, booksIn]
}

// Helper function that links accounts to their associated borrows
const addAccountsToBorrows = ({borrows = []} = {}, accounts = []) => {
  // Loops through each borrow and adds the matching account object
  return borrows.reduce((acc, borrow) => {
    acc.push({...borrow, ...(accounts.find((account) => account.id === borrow.id))}) 
    return acc
  }, [])
}

const getBorrowersForBook = (book = {}, accounts = []) => addAccountsToBorrows(book, accounts).slice(0, 10)


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
