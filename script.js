let allBook = [];

function AddBook(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const potter = new AddBook("potter", "sad", "100", false);
allBook.push(potter);
console.log(allBook);

const test = new AddBook("asas", "asass", "100", false);
allBook.push(test);
console.log(allBook);

const addBook = document.getElementsByClassName("add");
