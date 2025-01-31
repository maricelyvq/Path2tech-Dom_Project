/*Object to store the book data structure
/*test data*/
const book = {
    id:18, //integer
    title: 'The Alchemist', //string
    author: 'Paulo Coelho', //string
    isbn: '9780062315007', //string
    publishedDate: '2010-01-06T02:13:01.000Z', //string
    publisher: 'HarperOne', //string
    genre: 'Fiction', //string
    description: 'this is a new record',
    pageCount: 208, //integer
    language: 'ru', //string
    createdAt: '2021-06-01T02:13:01.000Z', //string
    updatedAt: '2021-06-01T02:13:01.000Z' //string
};

document.getElementById('bookForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const title = document.querySelector('title').value;
  const author = document.querySelector('author').value;
  const isbn = document.querySelectord('isbn').value;
  const publishedDate = document.querySelector('publishedDate').value;
  const publisher = document.querySelector('publisher').value;
  const genre = document.querySelector('genre').value;
  const description = document.querySelector('description').value;
  const pageCount = document.querySelector('pageCount').value;
  const language = document.querySelector('language').value;
  const createdAt = document.querySelector('createdAt').value;   
  const updatedAt = document.querySelector('updatedAt').value;
  const book = {
    title,
    author,
    isbn,
    publishedDate,
    publisher,
    genre,
    description,
    pageCount,
    language,
    createdAt,
    updatedAt
  };
  console.log(book);
  addBook(book);
});

async function addBook(book) {
  try {
      const response = await fetch('https://bookstore-api-six.vercel.app/api/books', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(book)
      });
      const json = await response.json();
      console.log(json);
  } catch (error) {
      console.error('Error:', error);
  }
}
addBook(book);

async function getBooks() {
    const response = await fetch('https://bookstore-api-six.vercel.app/api/books');
    const data = await response.json();
    console.log(data);
}

getBooks();



/*function DeleteBook(id){
    fetch('https://bookstore-api-six.vercel.app/api/books/1', {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(json => console.log(json))
    }*/