import {
  getFavorites,
  saveFavorites
} from "./storage.js";


const container =
  document.getElementById("favoritesContainer");


function displayFavorites() {

  const favorites = getFavorites();

  container.innerHTML = "";

  if (favorites.length === 0) {

    container.innerHTML =
      "<p>No favorite books yet.</p>";

    return;

  }


  favorites.forEach(book => {

    const card =
      document.createElement("div");

    card.className =
  "bg-slate-800 rounded-2xl shadow-lg overflow-hidden";

    const image = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : "https://via.placeholder.com/300x400?text=No+Cover";

    card.innerHTML = `
      <img
        src="${image}"
        class="w-full h-80 object-cover"
      >

      <div class="p-5">

        <h3 class="text-2xl font-bold mb-4 text-white">
          ${book.title}
        </h3>

        <button
          class="removeBtn bg-gray-500 text-white w-full py-3 rounded-xl"
        >
          Remove
        </button>

      </div>
    `;

    const removeBtn =
      card.querySelector(".removeBtn");

    removeBtn.addEventListener("click", () => {

      const updated =
        favorites.filter(
          item => item.key !== book.key
        );

      saveFavorites(updated);

      displayFavorites();

    });

    container.appendChild(card);

  });

}


displayFavorites();