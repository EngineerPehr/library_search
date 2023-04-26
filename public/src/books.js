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
  // Loops through each borrow and account
  return borrows.reduce((acc, borrow) => {
    accounts.forEach((account) => {
      if (borrow.id === account.id) {
        // Creates and collects new object if the IDs match
        const updatedBorrow = {...borrow, ...account}
        acc.push(updatedBorrow)
      }
    })
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
