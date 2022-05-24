let myLibrary = [];

// Constructor

class Book {
    constructor(title, author, pages, read) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Book info
let bookTitle = document.querySelector("#title");
let bookAuthor = document.querySelector("#author");
let bookPages = document.querySelector("#pages");
let bookRead = document.querySelector("#readStatus");
let addBookButton = document.querySelector("#add");

addBookButton.addEventListener("click", function(){
    let newBook = "";
    if (bookTitle.value !== "" && bookAuthor.value !== "" && bookPages.value !== "") {
        if (bookRead.checked) {
            newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, true);
        } else if (bookRead.checked === false) {
            newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, false);
        }
        addBookToLibrary(newBook);
        updateList();
    }
})

// HTML info
function updateList() {
    document.querySelector("#library").innerHTML = "";

    myLibrary.forEach(Book => {
        let orderedList = document.querySelector("#library");
        let listItem = document.createElement("li");
        listItem.className = "book-li";
    
        // Title
        let titleH2 = document.createElement("H2");
        let title = document.createTextNode(Book.title);
        titleH2.appendChild(title);
        listItem.appendChild(titleH2);
    
        // Author
        let authorH3 = document.createElement("H3");
        let author = document.createTextNode("by " + Book.author);
        authorH3.appendChild(author);
        listItem.appendChild(authorH3);
    
        // Pages
        let pagesH4 = document.createElement("H4");
        let pages = document.createTextNode(Book.pages + " pages");
        pagesH4.appendChild(pages);
        listItem.appendChild(pagesH4);
    
        // Read status
        let readStatusP = document.createElement("P");
        let readStatus = "";
        if (Book.read === false) {
            readStatus = document.createTextNode("have not read book");
        } else {
            readStatus = document.createTextNode("have read book");
        }
        readStatusP.appendChild(readStatus);
        readStatusP.addEventListener("click", function(){
            const thisBook = Book;
            const thisBookIndex = myLibrary.indexOf(thisBook);
            if (readStatusP.innerText === "have not read book") {
                readStatusP.innerText = "have read book";
                myLibrary[thisBookIndex].read = true;
            } else {
                readStatusP.innerText = "have not read book";
                myLibrary[thisBookIndex].read = false;
            }
        });
        listItem.appendChild(readStatusP);
    
        // Remove book
        let removeBookButton = document.createElement("button");
        let buttonText = document.createTextNode("Remove");
        removeBookButton.appendChild(buttonText);
    
        removeBookButton.addEventListener("click", function(){
            listItem.remove();
            const thisBook = Book;
            const thisBookIndex = myLibrary.indexOf(thisBook);
            myLibrary.splice(thisBookIndex, thisBookIndex + 1);
        })
    
        listItem.appendChild(removeBookButton);
        orderedList.appendChild(listItem);
    });
}