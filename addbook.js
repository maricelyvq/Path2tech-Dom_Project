document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("infoForm");
    const bookList = document.getElementById("infoList");

    // Load books from local storage on page load
    let books = JSON.parse(localStorage.getItem("books")) || [];

    function displayBooks() {
        bookList.innerHTML = ""; // Clear list before adding
        books.forEach((book, index) => {
            let listItem = document.createElement("li");
            listItem.classList.add("book-item");

            let bookDetails = document.createElement("span");
            bookDetails.innerHTML = `<b>${book.title}</b> by ${book.author} (Published by ${book.publisher})`;

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-btn");
            deleteButton.onclick = function () {
                books.splice(index, 1); // Remove from array
                localStorage.setItem("books", JSON.stringify(books)); // Update local storage
                displayBooks(); // Refresh the list
            };

            listItem.appendChild(bookDetails);
            listItem.appendChild(deleteButton);
            bookList.appendChild(listItem);
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let inputBook = document.getElementById("input-name").value.trim();
        let inputAuthor = document.getElementById("input-author").value.trim();
        let inputPublisher = document.getElementById("input-publisher").value.trim();

        if (inputBook === "" || inputAuthor === "" || inputPublisher === "") {
            alert("Please fill in all fields!");
            return;
        }

        // Add book to array
        books.push({ title: inputBook, author: inputAuthor, publisher: inputPublisher });

        // Save to local storage
        localStorage.setItem("books", JSON.stringify(books));

        // Refresh book list
        displayBooks();

        // Clear input fields
        form.reset();
    });

    displayBooks(); // Display books on page load
});

