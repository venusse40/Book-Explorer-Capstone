import {
  getFavorites,
  saveFavorites
} from "./storage.js";


export function toggleFavorite(book) {

  let favorites = getFavorites();

  const exists =
    favorites.find(item => item.key === book.key);

  if (exists) {

    favorites =
      favorites.filter(
        item => item.key !== book.key
      );

  } else {

    favorites.push(book);

  }

  saveFavorites(favorites);

}


export function isFavorite(key) {

  const favorites = getFavorites();

  return favorites.some(
    book => book.key === key
  );

}