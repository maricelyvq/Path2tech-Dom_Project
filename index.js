fetch('https://bookstore-api-six.vercel.app/api/books')
.then(response => response.json())
.then(json => console.log(json))



function DeleteBook(id){
    fetch('https://bookstore-api-six.vercel.app/api/books/1', {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(json => console.log(json))
    }