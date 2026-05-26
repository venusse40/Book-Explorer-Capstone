const KEY = "favoriteBooks";


export function getFavorites() {

  return JSON.parse(
    localStorage.getItem(KEY)
  ) || [];

}


export function saveFavorites(favorites) {

  localStorage.setItem(
    KEY,
    JSON.stringify(favorites)
  );

}