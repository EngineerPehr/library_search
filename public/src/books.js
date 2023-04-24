const findAuthorById = (authors = [], id = '') => authors.find((author) => author.id === id)

const findBookById = (books = [], id = '') => books.find((book) => book.id === id)

const partitionBooksByBorrowedStatus = (books = []) => {
  const booksOut = books.filter((book) => book.borrows[0].returned === false)
  const booksIn = books.filter((book) => book.borrows[0].returned === true)
  return [booksOut, booksIn]
}

const addAccountsToBorrows = (book = {}, accounts = []) => {
  const updatedBorrows = []
  const borrowList = book.borrows
  borrowList.forEach((borrow) => {
    const idToMatch = borrow.id
    accounts.forEach((account) => {
      const accountId = account.id
      if (idToMatch === accountId) {
        const updatedBorrow = {...borrow, ...account}
        updatedBorrows.push(updatedBorrow)
      }
    })
  })
  return updatedBorrows
}

const getBorrowersForBook = (book = {}, accounts = []) => addAccountsToBorrows(book, accounts).slice(0, 10)


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
