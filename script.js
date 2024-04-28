const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const booksContainer = document.getElementById('books');

searchButton.addEventListener('click', searchBooks);

function searchBooks() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') return;

    const url = `${API_URL}${encodeURIComponent(searchTerm)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.items);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            booksContainer.innerHTML = '<p>Error fetching books. Please try again later.</p>';
        });
}

function displayBooks(books) {
    booksContainer.innerHTML = '';

    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const title = document.createElement('h2');
        title.textContent = bookInfo.title || 'Title not available';

        const authors = document.createElement('p');
        authors.textContent = bookInfo.authors ? bookInfo.authors.join(', ') : 'Authors not available';

        const img = document.createElement('img');
        img.src = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'no-cover.jpg';
        img.alt = bookInfo.title || 'No cover available';

        bookElement.appendChild(img);
        bookElement.appendChild(title);
        bookElement.appendChild(authors);
        booksContainer.appendChild(bookElement);
    });
}
