// buy.js

import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
    // Your Firebase Config
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const bookList = document.getElementById('bookList');

// Function to render a book card
function renderBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Price: $${book.price}</p>
        <button onclick="buyBook('${book.id}')">Buy Now</button>
    `;
    bookList.appendChild(card);
}

// Function to handle the "Buy Now" button click
window.buyBook = function (bookId) {
    // Implement your logic for buying a book
    console.log(`Buying book with ID: ${bookId}`);
};

// Fetch and display books from Firebase
const booksRef = ref(database, 'books');
onValue(booksRef, (snapshot) => {
    const books = snapshot.val();
    if (books) {
        // Clear existing book list
        bookList.innerHTML = '';
        
        // Render each book
        Object.keys(books).forEach((bookId) => {
            const book = books[bookId];
            book.id = bookId; // Add book ID for reference
            renderBookCard(book);
        });
    }
});
