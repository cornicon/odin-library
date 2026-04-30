const myLibrary = [];
const bookData = document.getElementById("book-data");
const addABookButton = document.getElementById("showBookDialog");
const bookDialog = document.getElementById("bookDialog");
const confirmBtn = document.getElementById("confirmBtn");
const form = document.getElementById("bookForm");
const cancelBtn = document.getElementById("cancelBtn");
const deleteBookButtons = document.getElementsByClassName('deleteBookBtn');


// "Show the dialog" button opens the <dialog> modally
addABookButton.addEventListener("click", () => {
    form.reset();
    bookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    // Closes the modal and sets returnValue to "cancel"
    event.preventDefault();
    bookDialog.close("cancel"); 
});

bookDialog.addEventListener("close", () => {
    if (bookDialog.returnValue === "success") {
        console.log("Book added successfully!");
    } else {
        console.log("Action was cancelled.");
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

  bookDialog.close("success"); // Have to send the select box value here.
});

function Book(title, author, pages, readStatus) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();

  this.toggleRead = function() {
    if(this.readStatus === 0)
        this.readStatus = 1;
    else
        this.readStatus = 0;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderBookData();
}

function deleteBookFromLibrary(id) {
    // const targetGuid = 'your-guid-here';
    const index = myLibrary.findIndex(item => item.id === id);

    console.log(`Deleting ${id} from library in index ${index}`)

    if (index !== -1) {
        myLibrary.splice(index, 1); // Removes 1 element at the found index
        renderBookData();
    }
    
}

function addBookToLibrary(bookX) {
    myLibrary.push(bookX);
    renderBookData();
}

function changeReadStatus(id) {
    const index = myLibrary.findIndex(item => item.id === id);

    if (index !== -1) {
        myLibrary[index].toggleRead();
    }

}

function renderBookData() {
    bookData.innerHTML = "";
    myLibrary.forEach((book) => {
        //console.log(`${book.id}: ${book.title}, ${book.author}, ${book.pages}, ${book.readStatus}`);
        bookData.innerHTML += `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td>${book.readStatus ? `<input onClick="changeReadStatus('${book.id}')" type="checkbox" checked>` : `<input type="checkbox" onClick="changeReadStatus('${book.id}')">`}</td>
                <td><button onClick="deleteBookFromLibrary('${book.id}')">Delete</button></td>
            </tr>`;
    
            // const deletebutton = document.getElementById(`${book.id}`);
            // deletebutton.addEventListener("click", () => deleteBookFromLibrary(book.id));
            // <td><button id="${book.id}" class=deleteBookBtn">Delete</button></td>
        });
}