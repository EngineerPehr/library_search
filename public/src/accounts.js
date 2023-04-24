const findAccountById = (accounts = [], id = '') => accounts.find((account) => account.id === id)

const sortAccountsByLastName = (accounts = []) => accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1))

const getTotalNumberOfBorrows = ({id = ''} = {}, books = []) => {
  const numBorrows = books.reduce((total, book) => {
    const borrowList = book.borrows
    borrowList.forEach((borrow) => {
      if (borrow.id === id) total ++
    })
    return total
  }, 0)
  return numBorrows
  // let accountBorrows = 0
  // books.forEach((book) => {
  //   const borrowList = book.borrows
  //   borrowList.forEach((borrow) => {
  //     const borrowID = borrow.id
  //     if (borrowID === id) {
  //       accountBorrows ++
  //     }
  //   })
  // })
  // return accountBorrows
}

const addAuthorToBook = (books = [], authors = []) => {
  const updatedBooks = []
  books.forEach((book) => {
    const idToMatch = book.authorId
    authors.forEach((author) => {
      if (idToMatch === author.id) {
      const updatedBook = {...book, author}
      updatedBooks.push(updatedBook)
      }
    })
  })
  return updatedBooks
}

const getBooksPossessedByAccount = ({id = ''} = {}, books = [], authors = []) => {
  const updatedBooks = addAuthorToBook(books, authors)
  let booksOut = []
  updatedBooks.forEach((book) => {
    const borrowList = book.borrows
    borrowList.forEach((borrow) => {
      const borrowID = borrow.id
      if (borrowID === id && borrow.returned === false) {
        booksOut.push(book)
      }
    })
  })
  return booksOut
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
  addAuthorToBook
};
