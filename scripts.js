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
    clearTable()
    myLibrary.forEach((book, index) => {
        const tableRow = document.createElement("tr");
        Object.keys(book).forEach(key => {
            let tableData = document.createElement("td");
            tableData.textContent = book[key];
            tableRow.appendChild(tableData);
        })
        tableRow.setAttribute("data-index", index);

        let readButton = document.createElement("button");
        let tableData = document.createElement("td")
        readButton.textContent = "Toggle Read"
        readButton.addEventListener("click", () => {
            state = myLibrary[index].read;
            state = !state;
            myLibrary[index].read = state ? true : false;
            displayLibrary()
        })
        tableData.appendChild(readButton)
        tableRow.appendChild(tableData)

        let delButton = document.createElement("button");
        let tableData2 = document.createElement("td")
        delButton.textContent = "Delete"
        delButton.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            displayLibrary();
        })
        tableData2.appendChild(delButton)
        tableRow.appendChild(tableData2)

        bookListTable.appendChild(tableRow);
    })
}

function clearTable() {
    const rowsToRemove = bookListTable.querySelectorAll("[data-index]");
    rowsToRemove.forEach(row => {
        bookListTable.removeChild(row)
    })
} 

const bookSubmit = document.querySelector(".book-submit");

bookSubmit.addEventListener("click", () => {
    const author = document.querySelector("#author");
    const title = document.querySelector("#title");
    const pages = document.querySelector("#pages");
    const read = document.querySelector("#read");
    if (author.value && title.value && pages.value) {
    addBookToLibrary(author.value, title.value, pages.value, read.checked);
    displayLibrary()}
    document.querySelector("#author").value = ""
    document.querySelector("#title").value = ""
    document.querySelector("#pages").value = ""
    document.querySelector("#read").checked = false
})
