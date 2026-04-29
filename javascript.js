const myLibrary = [];
const bookData = document.getElementById("book-data");
const addABookButton = document.getElementById("showBookDialog");
const bookDialog = document.getElementById("bookDialog");
const confirmBtn = document.getElementById("confirmBtn");
const form = document.getElementById("bookForm");

// "Show the dialog" button opens the <dialog> modally
addABookButton.addEventListener("click", () => {
    form.reset();
    bookDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
bookDialog.addEventListener("close", (e) => {

    if(bookDialog.returnValue !== "cancel")
    {
        const book = bookDialog.returnValue;
        console.log(book);
        addBookToLibrary(book); // Have to check for "default" rather than empty string
    }

});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  
  const bookData = new FormData(form);
  const title = bookData.get('title');
  const author = bookData.get('author');
  const pages = bookData.get('pages');
  const read = bookData.get('read') ? 1 : 0;

  console.log(title, author, pages, read);
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);

  bookDialog.close(book); // Have to send the select box value here.
});

function Book(title, author, pages, readStatus) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderBookData();
}

function addBookToLibrary(bookX) {
    myLibrary.push(bookX);
    renderBookData();
}

function renderBookData() {
    bookData.innerHTML = "";
    myLibrary.forEach((book) => {
        //console.log(`${book.id}: ${book.title}, ${book.author}, ${book.pages}, ${book.readStatus}`);
        bookData.innerHTML += `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td>${book.readStatus ? "true" : "false"}</td>
            </tr>`;
});
}