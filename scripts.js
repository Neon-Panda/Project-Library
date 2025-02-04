const myLibrary = [];

function Book(author, title, pages, read=false) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read=false) {
    const book = new Book(author, title, pages, read);
    myLibrary.push(book)
}

const bookListTable = document.querySelector(".book-list-table");

function displayLibrary() {
    myLibrary.forEach((book, index) => {
        const tableRow = document.createElement("tr");
        Object.keys(book).forEach(key => {
            const tableData = document.createElement("td");
            tableData.textContent = book[key];
            tableRow.appendChild(tableData);
        })
        tableRow.setAttribute("data-index", index);

        let button1 = document.createElement("button");
        button1.classList.add("read-button")
        tableRow.appendChild(button1)

        let button2 = document.createElement("button");
        button2.classList.add("delete-button")
        tableRow.appendChild(button2)

        bookListTable.appendChild(tableRow);
    })
}

function clearTable() {
    const rowsToRemove = bookListTable.querySelectorAll("[data-index]");
    rowsToRemove.forEach(row => {
        bookListTable.removeChild(row)
    })
} 

function deleteButton() {
    const deleteBtn = document.querySelectorAll(".delete-button");
    deleteBtn.forEach(button => {
        button.addEventListener("click", (event) => {
            let parentElem = event.target.parentElement;
            parentElem.remove()
            let parentIndex = parentElem.dataset.index;
            myLibrary.splice(parentIndex, 1)
        })
    })
}

function readToggle() {
    const readBtn = document.querySelectorAll(".read-button");
    readBtn.forEach(button => {
        button.addEventListener("click", (event) => {
            console.log("test")
            let parentElem = event.target.parentElement;
            let parentIndex = parentElem.dataset.index;
            myLibrary[parentIndex].read = true; 
        })
    })
}

const bookSubmit = document.querySelector(".book-submit");

bookSubmit.addEventListener("click", () => {
    const author = document.querySelector("#author");
    const title = document.querySelector("#title");
    const pages = document.querySelector("#pages");
    const read = document.querySelector("#read");
    addBookToLibrary(author.value, title.value, pages.value, read.checked);
    clearTable()
    displayLibrary()
    deleteButton()
    readToggle()
})
