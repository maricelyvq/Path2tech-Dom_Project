document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("infoForm");
    const bookList = document.getElementById("infoList");

    const API_URL = "https://bookstore-api-six.vercel.app/api/books"; // Replace with actual API URL
    let books = []; // Start with an empty array (no preloaded books)

    function displayBooks() {
        bookList.innerHTML = ""; // Clear list
        books.forEach(book => addBookToList(book));
    }

    function addBookToList(book) {
        let listItem = document.createElement("li");
        listItem.classList.add("book-item");
        listItem.dataset.id = book.id || `local-${Date.now()}`; // Assign a unique ID for local books

        let bookDetails = document.createElement("span");
        bookDetails.innerHTML = `<b>${book.title}</b> by ${book.author} (Published by ${book.publisher})`;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = async function () {
            if (book.id) {
                await deleteBookFromAPI(book.id); // Delete from API if it has an ID
            }
            books = books.filter(b => b !== book); // Remove from local array
            displayBooks(); // Refresh UI
        };

        listItem.appendChild(bookDetails);
        listItem.appendChild(deleteButton);
        bookList.appendChild(listItem);
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        let title = document.getElementById("input-name").value.trim();
        let author = document.getElementById("input-author").value.trim();
        let publisher = document.getElementById("input-publisher").value.trim();

        if (!title || !author || !publisher) {
            alert("Please fill in all fields!");
            return;
        }

        let newBook = { title, author, publisher };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBook),
            });

            if (!response.ok) {
                throw new Error("Failed to add book");
            }

            const savedBook = await response.json();
            savedBook.id = savedBook.id || `local-${Date.now()}`; // Ensure each book has a unique ID
            books.push(savedBook);
            displayBooks();
        } catch (error) {
            console.error("Error adding book:", error);
            books.push(newBook); // Add locally in case of API failure
            displayBooks();
        }

        form.reset();
    });

    async function deleteBookFromAPI(bookId) {
        try {
            const response = await fetch(`${API_URL}/${bookId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete book");
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    }

    async function fetchBooksFromAPI() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            books = await response.json();
            displayBooks();
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    document.getElementById("fetchBooksBtn").addEventListener("click", fetchBooksFromAPI);
});
