var arrAllBooks = [];
var imageLink = "";
var mixCategories;
var titleMix = "";
var mixedDescription = "";

$(document).ready(function () {
  $("#btn-mix").on("click", mixBooks);

  // Fetch all available books
  fetchData(API_URL + "Book/all-active-books", gotAllBooks, onError);

  // Event listeners for book selection
  $("#book1").on("change", function () {
    updateBookCard("#book-1", $(this).val());
  });

  $("#book2").on("change", function () {
    updateBookCard("#book-2", $(this).val());
  });
});

const mixBooks = async () => {
  const book1Id = $("#book1").val();
  const book2Id = $("#book2").val();

  // Check if the user chose 2 books to combine
  if (!book1Id || !book2Id) {
    popupText("You need to choose 2 books.");
  } else if (book1Id === book2Id) {
    // Check if both selected books are the same
    popupText("You need to choose two different books.");
  } else {
    const book1Data = findBookById(book1Id, arrAllBooks);
    const book2Data = findBookById(book2Id, arrAllBooks);

    if (book1Data && book2Data) {
      // Combine Categories Randomly
      const allCategories = [...book1Data.categories, ...book2Data.categories];
      const uniqueCategories = [...new Set(allCategories)];
      mixCategories = uniqueCategories.sort(() => 0.5 - Math.random());

      // Combine Descriptions
      const combinedDescription = `${book1Data.description} ${book2Data.description}`;

      // Generate New Content
      mixedDescription = await generateNewDescription(
        mixCategories,
        combinedDescription
      );

      titleMix = combineTitlesIntelligently(book1Data.title, book2Data.title);

      // Generate New Cover Image
      await generateImageFromDescription(mixedDescription);
    } else {
      console.error("One or both of the books were not found.");
    }
  }
};

// mix the 2 titles by significant words
function combineTitlesIntelligently(title1, title2) {
  // Split the titles into words
  const words1 = title1.split(" ");
  const words2 = title2.split(" ");

  // Rule: Preserve the first noun or significant word from each title
  const significantWord1 =
    words1.find((word) => isSignificantWord(word)) || words1[0];
  const significantWord2 =
    words2.find((word) => isSignificantWord(word)) || words2[0];

  // Randomly decide how many words to take from each title
  const takeWords1 = Math.floor(Math.random() * (words1.length + 1));
  const takeWords2 = Math.floor(Math.random() * (words2.length + 1));

  // Take the selected number of words from each title
  const selectedWords1 = [significantWord1, ...words1.slice(1, takeWords1)];
  const selectedWords2 = [significantWord2, ...words2.slice(1, takeWords2)];

  // Combine the words into a meaningful title
  const combinedTitle = `${selectedWords1.join(" ")} ${selectedWords2.join(
    " "
  )}`;

  // Clean up the combined title by removing any duplicate or unnecessary words
  return cleanUpTitle(combinedTitle);
}

// helper func - check if a word is significant
function isSignificantWord(word) {
  // Define a list of insignificant words like articles or conjunctions
  const insignificantWords = [
    "the",
    "a",
    "an",
    "and",
    "of",
    "in",
    "on",
    "for",
    "with",
    "to",
  ];
  return !insignificantWords.includes(word.toLowerCase());
}

// helper func - remove duplicate words in title
function cleanUpTitle(title) {
  // Remove any duplicate words or unnecessary spaces
  const words = title.split(" ");
  const uniqueWords = [...new Set(words)];
  return uniqueWords.join(" ").trim();
}

// helper func - finds the chosen book in the array of books
function findBookById(id, booksArray) {
  return booksArray.find((book) => book.id === parseInt(id));
}

// generate new description from the 2 descriptions - with ai
async function generateNewDescription(categories, combinedDescription) {
  const apiUrl =
    "https://api-inference.huggingface.co/models/openai-community/gpt2";
  const apiKey = "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";

  const prompt = `In a tale woven around the themes of ${categories.join(
    ", "
  )}, ${combinedDescription}. What unfolds next is a journey through these intertwined elements, revealing...`;

  const requestBody = {
    inputs: prompt,
    options: {
      wait_for_model: true,
      max_new_tokens: 500,
      temperature: 0.7,
      top_p: 0.9,
    },
  };

  try {
    showLoader(); // Show the loader

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch description: ${response.statusText}`);
    }

    const result = await response.json();
    let description = result[0]?.generated_text || "No description generated.";
    description = description.replace(prompt, "").trim();
    return description;
  } catch (error) {
    console.error("Error generating description:", error);
    return "Error generating description.";
  } finally {
    hideLoader(); // Hide the loader after the request completes
  }
}

// generate new image from the ew description - with ai
async function generateImageFromDescription(description) {
  const apiUrl =
    "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";
  const apiKey = "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";

  const requestBody = {
    inputs: description,
  };

  try {
    showLoader();
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      if (response.status === 500) {
        console.error(
          "Internal Server Error: The service might be down or overloaded."
        );
        throw new Error(`Failed to generate image due to a server error.`);
      }
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    const imageBlob = await response.blob();
    const file = new File([imageBlob], "generated-image.png", {
      type: "image/png",
    });

    await uploadBookCoverAi(file); // Wait for the image to be uploaded
    showResaults(); // Now that the image is uploaded, show the results
  } catch (error) {
    console.error("Error generating or uploading the image:", error);
    alert("There was an issue generating the image. Please try again later.");
  } finally {
    hideLoader();
  }
}

// upload to server the new book cover
const uploadBookCoverAi = (file) => {
  return new Promise((resolve, reject) => {
    const randomFileName = `${generateRandomFileName()}${getFileExtension(
      file.name
    )}`;
    const formData = new FormData();
    formData.append("file", new File([file], randomFileName));

    $.ajax({
      url: API_URL + "Book/UploadBookCover",
      method: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (data) {
        imageLink = IMAGE_URL + data.imageName;
        console.log("Image uploaded successfully:", imageLink);
        resolve(imageLink); // Resolve the promise with the image link
      },
      error: function (error) {
        console.error(error);
        reject(error); // Reject the promise if there's an error
      },
    });
  });
};

const gotAllBooks = (books) => {
  arrAllBooks = books.filter((book) => book.language === "en");

  // Populate the select options
  populateBookOptions("#book1");
  populateBookOptions("#book2");
};

// insert all books names to the select element
const populateBookOptions = (selectElementId) => {
  const $select = $(selectElementId);
  $select.empty();

  // Add a default "Please select a book" option
  $select.append('<option value="">Select a book</option>');

  // Append each book title as an option
  arrAllBooks.forEach((book) => {
    $select.append(`<option value="${book.id}">${book.title}</option>`);
  });
};

const updateBookCard = (cardSelector, bookId) => {
  const selectedBook = arrAllBooks.find((book) => book.id == bookId);

  if (selectedBook) {
    $(`${cardSelector} img`).attr(
      "src",
      selectedBook.imageLink || "../../assets/images/book-cover-placeholder.png"
    );
    $(`${cardSelector} #book-title`).text(selectedBook.title || "Title");
    $(`${cardSelector} #book-author`).text(
      selectedBook.authors.map((author) => author.name).join(", ") || "Authors"
    );
  } else {
    // If no book is selected or bookId is empty, reset to placeholder content
    $(`${cardSelector} img`).attr(
      "src",
      "../../assets/images/book-cover-placeholder.png"
    );
    $(`${cardSelector} #book-title`).text("Title");
    $(`${cardSelector} #book-author`).text("Authors");
  }
};

// helper function - generate a random filename
const generateRandomFileName = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// helper function - get the file extension
const getFileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf("."));
};

// Function to show the loader
function showLoader() {
  $(".loader-2").css("visibility", "visible");
}

// Function to hide the loader
function hideLoader() {
  $(".loader-2").css("visibility", "hidden");
}

const showResaults = () => {
  $(".container-resault").css("display", "flex");
  $("#book-title-new").text(titleMix);
  $(".new-descr").text(mixedDescription);
  $("#book-3 img").attr("src", imageLink);
  mixCategories.forEach((category) => {
    var categoryDiv = $('<div class="btn category"></div>').text(category);
    $(".container-categories").append(categoryDiv);
  });
};
