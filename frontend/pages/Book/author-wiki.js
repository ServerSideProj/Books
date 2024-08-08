const allAuthorsUrl = "Author/all-authors";

$(document).ready(function () {
  fetchData(API_URL + allAuthorsUrl, gotAllAuthors, onError);
});

const gotAllAuthors = (response) => {
  console.log(response);

  // Assuming response is an array of JSON elements
  const wikiLinks = response.map((author) => author.wikiLink);

  console.log(wikiLinks);

  // Now you can call the function to fetch data from Wikipedia API
  const wikiTitles = wikiLinks.map((link) => link.split("/").pop());
  fetchAllAuthorsData(wikiTitles);
};

const onError = (error) => {
  console.error("Error fetching authors:", error);
};

async function fetchWikiData(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages|info&exintro&explaintext&format=json&origin=*&titles=${title}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];

    const summary = page.extract;
    const image = page.pageimage
      ? `https://en.wikipedia.org/wiki/Special:FilePath/${page.pageimage}`
      : "No image available";
    const pageUrl = page.fullurl;

    return {
      title: page.title,
      summary,
      image,
      pageUrl,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function fetchAllAuthorsData(titles) {
  const authorsData = await Promise.all(
    titles.map((title) => fetchWikiData(title))
  );
  console.log(authorsData);
  // Do something with the data, like updating the UI
}
