const addBook = document.getElementsByClassName("add")[0];
const addForm = document.getElementsByClassName("form-add")[0];
const overlay = document.getElementsByClassName("overlay")[0];
const cards = document.getElementsByClassName("cards")[0];
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPage = document.getElementById("pages");
const inputRead = document.getElementById("read");
const btnSubmit = document.getElementById("submit");
const myForm = document.getElementById("my-form");
const errorText = document.getElementsByClassName("error")[0];

class Library {
  constructor() {
    this.allBook = []; // save all the Book instances in here
  }

  addNewBook(newBook) {
    if (this.sameBook(newBook)) {
      errorText.textContent = "This book already in your library";
    } else {
      this.allBook.push(newBook);
      showCard(newBook.title, newBook.author, newBook.pages, newBook.isread);
      addForm.classList.remove("active");
      overlay.classList.remove("active");
    }
  }

  removeBook(title) {
    return this.allBook.splice(
      this.allBook.findIndex((book) => book === title),
      1
    );
  }

  // sameBook method to check if that book already in library or not. The output is true or false
  sameBook(newBook) {
    return this.allBook.some((book) => book.title === newBook.title);
  }
}

const library = new Library();

function Book(title, author, pages, isread) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isread = isread;
}

function userInput() {
  return new Book(
    inputTitle.value,
    inputAuthor.value,
    inputPage.value,
    inputRead.checked
  );
}

function showCard(newTitle, newAuthor, newPages, newStatus) {
  const card = document.createElement("div");
  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const btnStatus = document.createElement("button");
  const btnRemove = document.createElement("button");

  card.classList.add("card");
  title.classList.add("title");
  author.classList.add("author");
  pages.classList.add("pages");
  btnStatus.classList.add("status");
  btnRemove.classList.add("remove");

  cards.appendChild(card);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(btnStatus);
  card.appendChild(btnRemove);

  btnRemove.textContent = "Remove";
  title.textContent = newTitle;
  author.textContent = newAuthor;
  pages.textContent = newPages;

  function statusRead() {
    btnStatus.textContent = "Read";
    btnStatus.style.backgroundColor = "#74ba61";
  }

  function statusNotRead() {
    btnStatus.textContent = "Not Read";
    btnStatus.style.backgroundColor = "";
  }

  if (newStatus == true) {
    statusRead();
  } else {
    statusNotRead();
  }

  btnStatus.addEventListener("click", () => {
    if (newStatus == true) {
      statusNotRead();
      newStatus = false;
    } else {
      statusRead();
      newStatus = true;
    }
  });

  btnRemove.addEventListener("click", () => {
    library.removeBook(title.textContent);
    card.remove();
  });
}

myForm.addEventListener("submit", (e) => {
  userInput();
  library.addNewBook(userInput());
  e.preventDefault();
});

addBook.addEventListener("click", () => {
  addForm.classList.add("active");
  overlay.classList.add("active");
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPage.value = "";
  inputRead.value = "";
});

// user can close the form when clicking the area outside the form
overlay.addEventListener("click", () => {
  addForm.classList.remove("active");
  overlay.classList.remove("active");
});
