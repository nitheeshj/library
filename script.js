// -----------------------
// DATA STORAGE (STATE)
// -----------------------
const myLibrary = [];

// -----------------------
// BOOK CONSTRUCTOR
// -----------------------
function Book(title, author, pages, read) {
  this.id = Math.random().toString(36).slice(2); // simple unique id
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};


// -----------------------
// ADD BOOK TO LIBRARY
// -----------------------
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks(); // re-render UI
}

// -----------------------
// DISPLAY / RENDER BOOKS
// -----------------------
function displayBooks() {
  const container = document.getElementById("library");

  container.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    // connect card to book
    card.dataset.id = book.id;

    const info = document.createElement("p");
    info.textContent =
      `${book.title} by ${book.author} - ${book.pages} pages (${book.read ? "Read" : "Not Read"})`;

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      myLibrary.splice(index, 1);
      displayBooks();
    });

    // TOGGLE READ BUTTON
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";

    toggleBtn.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    card.appendChild(info);
    card.appendChild(deleteBtn);
    card.appendChild(toggleBtn);

    container.appendChild(card);
  });
}




// ---------- FORM LOGIC ----------
const newBookBtn = document.getElementById("newBookBtn");
const form = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => {
  form.style.display = "block";
});

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  form.reset();
  form.style.display = "none";
});

