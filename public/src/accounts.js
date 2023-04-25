// Finds first account that matches the given ID
const findAccountById = (accounts = [], id = '') => accounts.find((account) => account.id === id)

// Sorts account objects in descending order by the account holders' last names.
const sortAccountsByLastName = (accounts = []) => accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1))

// Counts the number of borrows that are associated with the given account ID
const getTotalNumberOfBorrows = ({id = ''} = {}, books = []) => {
  // Reduce used to set up accumulator loop
  return books.reduce((total, book) => {
    const borrowList = book.borrows
    // forEach used to check the borrows array against the given account
    borrowList.forEach((borrow) => {
      if (borrow.id === id) total ++
    })
    return total
  }, 0)
}

// Helper function to add the author objects to the book objects
const addAuthorToBook = (books = [], authors = []) => {
  // Loop through each book and then loops through the authors to find a match
  return books.reduce((acc, book) => {
    authors.forEach((author) => {
      if (book.authorId === author.id) {
        // Creates an updated object that adds the author to the book
        const updatedBook = {...book, author}
        acc.push(updatedBook)
      }
    })
    return acc
  }, [])
}

// Checks which books have an active borrow for a given account id
const getBooksPossessedByAccount = ({id = ''} = {}, books = [], authors = []) => {
  // Requested return includes authors added to books
  const updatedBooks = addAuthorToBook(books, authors)
  // Loops through each book's first borrow to match it with given account ID and checks its return status
  return updatedBooks.reduce((acc, book) => {
    const keyBorrow = book.borrows[0]
    if (keyBorrow.id === id && keyBorrow.returned === false) acc.push(book)
    return acc
  }, [])
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
  addAuthorToBook
};
