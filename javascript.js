const myLibrary = [];
const bookData = document.getElementById("book-data");

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
}

function renderBoookData() {
    bookData.innerHTML = "";
    myLibrary.forEach((book) => {
        //console.log(`${book.id}: ${book.title}, ${book.author}, ${book.pages}, ${book.readStatus}`);
        bookData.innerHTML += `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td>${book.readStatus}</td>
            </tr>`;
});
}