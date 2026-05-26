import { fetchBooks } from "./fetchBooks.js";

import {
  toggleFavorite,
  isFavorite
} from "./favourites.js";


const booksContainer =
  document.getElementById("booksContainer");

const searchBtn =
  document.getElementById("searchBtn");

const searchInput =
  document.getElementById("searchInput");

const loadMoreBtn =
  document.getElementById("loadMoreBtn");


let books = [];
let visibleBooks = 8;


// DISPLAY BOOKS
function displayBooks() {

  booksContainer.innerHTML = "";

  books
    .slice(0, visibleBooks)
    .forEach(book => {

      const card =
        document.createElement("div");

      card.className =
  "bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition duration-300";

      const image = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : "https://via.placeholder.com/300x400?text=No+Cover";

      card.innerHTML = `
        <img
          src="${image}"
          class="w-full h-80 object-cover"
        >

        <div class="p-5">

          <h3 class="text-2xl font-bold mb-2">
            ${book.title}
          </h3>

          <p class="text-slate-500 mb-4">
            ${book.author_name
              ? book.author_name[0]
              : "Unknown Author"}
          </p>

          <button
            class="favoriteBtn w-full py-3 rounded-xl text-white
            ${
              isFavorite(book.key)
                ? "bg-green-500"
                : "bg-indigo-600"
            }"
          >

            ${
              isFavorite(book.key)
                ? "❤️ Added"
                : "🤍 Add to Favorites"
            }

          </button>

        </div>
      `;

      const favoriteBtn =
        card.querySelector(".favoriteBtn");

      favoriteBtn.addEventListener("click", () => {

        toggleFavorite(book);

        displayBooks();

      });

      booksContainer.appendChild(card);

    });

}


// LOAD BOOKS
async function loadBooks(search = "programming") {

  booksContainer.innerHTML =
    "<p>Loading books...</p>";

  books = await fetchBooks(search);

  displayBooks();

}


// SEARCH
searchBtn.addEventListener("click", () => {

  visibleBooks = 8;

  loadBooks(searchInput.value);

});


// ENTER KEY
searchInput.addEventListener("keypress", event => {

  if (event.key === "Enter") {

    visibleBooks = 8;

    loadBooks(searchInput.value);

  }

});


// LOAD MORE
loadMoreBtn.addEventListener("click", () => {

  visibleBooks += 8;

  displayBooks();

});


// INITIAL LOAD
loadBooks();