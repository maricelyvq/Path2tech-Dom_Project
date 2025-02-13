const apiUrl = 'https://bookstore-api-six.vercel.app/api/books';
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
let bookarray = []; //creating an array to store the book data

document.getElementById('submit').addEventListener('click', function (event) {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  const publisher = document.querySelector('#publisher').value;
  const book = {
    title:title,
    author:author,
    isbn:isbn,
    // publishedDate:"",
    publisher:publisher,
    // genre:"",
    // description:"",
    // pageCount:0,
    // language:"",
    // createdAt:"",
    // updatedAt:""
  };
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  document.getElementById('publisher').value = '';
  console.log(book);
  addBook(book);
});

async function addBook(book) {
  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify(book)
      });
      const json = await response.json();
      bookarray.push(json); //pushing the json data into the array
      console.log(bookarray); // log the json response
      
  } catch (error) {
      console.error('Error:', error);
  }
}


/* Function to get all books from the API */  
// async function getBooks() {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     console.log(data);
// }

// getBooks();



/*function DeleteBook(id){
    fetch('https://bookstore-api-six.vercel.app/api/books/1', {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(json => console.log(json))
    }*/