class Book {
    constructor(author, title, pages, read=false) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
}

class UI {
    static displayBooks() {
        const storedBooks = [
            {
            author: `Stephen King`,
            title: `The Shining`,
            pages: 1138,
            read: true
            },
             {
             author: `Author Example`,
             title: `Title Example`,
             pages: 1234,
             read: true,
             }
        ];

        const books = storedBooks;
        books.forEach((book) => UI.addBook(book));
    }

    static addBook(book) {
        const tableBody = document.querySelector("[data-table-body]")

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>
        <td><button data-read></button></td>
        <td><button data-delete></button></td>
        `

        tableBody.appendChild(row)
    }

    static clearInputs() {
        document.querySelector("#author").value = ""
        document.querySelector("#title").value = ""
        document.querySelector("#pages").value = ""
        document.querySelector("#read").checked = false
    }

    static deleteBook(element) {
        if(element.hasAttribute("data-delete")) {
            element.parentElement.parentElement.remove()
        }
    }
 }


document.addEventListener("DOMContentLoaded", UI.displayBooks)

document.querySelector("[data-form]").addEventListener("submit", event => {
    event.preventDefault()

    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    const book = new Book(author, title, pages, read)

    UI.addBook(book)
    UI.clearInputs()
})

document.querySelector("[data-table-body]").addEventListener("click", (event) => {
    UI.deleteBook(event.target)
})