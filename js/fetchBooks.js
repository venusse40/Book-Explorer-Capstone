export async function fetchBooks(search = "programming") {

  const response =
    await fetch(
      `https://openlibrary.org/search.json?q=${search}`
    );

  const data = await response.json();

  return data.docs.slice(0, 40);

}