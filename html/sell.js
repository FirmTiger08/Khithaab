import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdHSZPDqVokH9nVtMx1ZqJVONdAqJcZHU",
    authDomain: "khithaab.firebaseapp.com",
    databaseURL: "https://khithaab-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "khithaab",
    storageBucket: "khithaab.appspot.com",
    messagingSenderId: "289912898746",
    appId: "1:289912898746:web:7f8458541da191d9026e83",
    measurementId: "G-4ZBTH8P9EM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sellForm = document.getElementById('sellForm');
const listingSection = document.querySelector('.listing');

// Fetch and display existing books when the page loads
window.addEventListener('load', async () => {
    const booksSnapshot = await getDocs(collection(db, "books"));
    booksSnapshot.forEach((doc) => {
        const { bookTitle, author, price } = doc.data();
        displayBook(bookTitle, author, price);
    });
});

sellForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get input values
    const bookTitle = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const price = document.getElementById('price').value;

    try {
        // Add data to Firestore
        const docRef = await addDoc(collection(db, "books"), {
            bookTitle,
            author,
            price
        });

        console.log("Document written with ID: ", docRef.id);

        // Display the added data in the Available Textbooks section
        displayBook(bookTitle, author, price);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

function displayBook(bookTitle, author, price) {
    // Create HTML elements for the book listing
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const titleHeading = document.createElement('h3');
    titleHeading.textContent = bookTitle;

    const authorParagraph = document.createElement('p');
    authorParagraph.textContent = `Author: ${author}`;

    const priceParagraph = document.createElement('p');
    priceParagraph.textContent = `Price: ${price} rupees`;

    const contactButton = document.createElement('button');
    contactButton.textContent = 'Contact Seller';

    // Append elements to the book listing
    bookDiv.appendChild(titleHeading);
    bookDiv.appendChild(authorParagraph);
    bookDiv.appendChild(priceParagraph);
    bookDiv.appendChild(contactButton);

    // Append the book listing to the Available Textbooks section
    listingSection.appendChild(bookDiv);
}
