var selectedCategories = [];

$(document).ready(function () {
  // Navigate between inner pages
  $("#btn-insert").click(goPageInsertBook);
  $("#btn-generate").click(goPageGenerateBook);
});

const goPageInsertBook = () => {
  $(".inner-page").removeClass("show");
  $("#insert-book-page").addClass("show");

  getAllLanguages();
  getAllBookCategories();

  // Handle file upload
  $("#upload-file").click(function () {
    $("#file-input").click();
  });
  $("#file-input").change(function (e) {
    handleFileUpload(e);
  });

  // Add author input
  $(".btn-add-author").click(addAuthor);

  // Delegate the click event for dynamically added delete buttons
  $(".container-authors").on("click", ".delete", function () {
    $(this).parent().remove();
  });

  // Handle create book
  $("#create-book").click(function () {
    if (checkAllData()) {
      postToServer(getAllData());
    } else {
      popupText("Please fill all the fields.");
    }
  });

  $("#file-input").on("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      uploadBookCover(file);
    } else {
      popupText("Please select a file to upload.");
    }
  });
};

const goPageGenerateBook = () => {
  $(".inner-page").removeClass("show");
  $("#generate-book-page").addClass("show");

  getAllBookCategories();
  // Handle random category selection
  $(".random-btn").click(selectRandomCategories);

  $("#random-desc").click(getDescription);
  $(".ai-file-upload").click(handleFileUploadClick);

  $(`.step-${step}`).addClass("show");
  $(".next-btn").click(nextStep);
};

// Get all languages for the dropdown
const getAllLanguages = () => {
  $.ajax({
    url: "https://restcountries.com/v3.1/all",
    method: "GET",
    success: function (data) {
      var languages = new Set();
      data.forEach(function (country) {
        if (country.languages) {
          Object.values(country.languages).forEach(function (language) {
            languages.add(language);
          });
        }
      });

      var languageSelect = $("#language");
      languageSelect.empty();
      languages.forEach(function (language) {
        languageSelect.append(new Option(language, language));
      });
    },
    error: function () {
      $("#language").html('<option value="">Failed to load languages</option>');
    },
  });
};

// Get all book categories and add them as divs with an onclick event
const getAllBookCategories = () => {
  fetchData(API_URL + "Book/all-categories", renderCategories, onError);
};

const renderCategories = (categories) => {
  var container = $(".container-categories");
  container.empty(); // Clear any existing content

  categories.forEach((category) => {
    var categoryDiv = $('<div class="btn category"></div>').text(category);

    // Add an onclick event to each category div
    categoryDiv.on("click", function () {
      toggleCategory(category, $(this));
    });

    container.append(categoryDiv);
  });
};

// Function to add/remove categories from the selectedCategories array
function toggleCategory(category, element) {
  const index = selectedCategories.indexOf(category);
  if (index === -1) {
    selectedCategories.push(category);
    element.addClass("selected");
  } else {
    selectedCategories.splice(index, 1);
    element.removeClass("selected");
  }
}

const addAuthor = () => {
  var newInput = $("<input>", {
    type: "text",
    placeholder: "example: J. K. Rowling",
    class: "input-box-sqr l-text author-input",
  });

  // Create the delete button
  var deleteButton = $("<img>", {
    src: "../../assets/icons/trash-icon.svg",
    alt: "trash-icon",
    class: "btn delete",
  });

  var wrapperDiv = $("<div>", {
    class: "author-input-wrapper",
  });

  wrapperDiv.append(newInput);
  wrapperDiv.append(deleteButton);

  $(".container-authors").append(wrapperDiv);
};

// Handle file upload
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      $("#book-cover-img").attr("src", event.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const checkAllData = () => {
  const title = $("#book-title").val().trim();
  const description = $("#book-description").val().trim();
  const language = $("#language").val().trim();
  const coverImage = imageLink;
  const categories = selectedCategories;
  const authors = getAuthors();

  const areCategoriesValid = categories.length >= 1 && categories.length <= 3;

  return (
    title &&
    description &&
    language &&
    coverImage !== "../../assets/images/none-cover.svg" &&
    authors.length > 0 &&
    areCategoriesValid
  );
};

const getAuthors = () => {
  const authors = $(".author-input")
    .map(function () {
      return $(this).val().trim(); // Trim each author's name
    })
    .get() // Convert jQuery object to a regular array
    .filter((author) => author !== ""); // Filter out any empty strings

  return authors;
};

// Function to upload a book cover image
const uploadBookCover = (file) => {
  const randomFileName = `${generateRandomFileName()}${getFileExtension(
    file.name
  )}`;

  // Create a new FormData object
  const formData = new FormData();
  formData.append("file", new File([file], randomFileName)); // Append file with the random name

  // Send the POST request to the server using $.ajax
  $.ajax({
    url: API_URL + "Book/UploadBookCover",
    method: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (data) {
      imageLink = IMAGE_URL + data.imageName;
      console.log("Image uploaded successfully:", imageLink);
    },
    error: function (error) {
      console.error(error);
    },
  });
};

// Utility function to generate a random filename
const generateRandomFileName = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Utility function to get the file extension
const getFileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf("."));
};

// Get all the data after clicks on "create book" and send to server
const getAllData = () => {
  const data = {
    title: $("#book-title").val().trim(),
    description: $("#book-description").val().trim(),
    language: $("#language").val().trim(),
    categories: selectedCategories, // Selected categories array
    authors: $(".container-authors input")
      .map(function () {
        return $(this).val().trim(); // Collect author names as strings
      })
      .get()
      .filter((author) => author !== ""), // Ensure the author name is not empty
    imageLink: imageLink, // The image link collected earlier
  };

  return data;
};
// send all data created to server
const postToServer = (data) => {
  $.ajax({
    url: API_URL + "Book/insert-book",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    dataType: "json",
    success: function (response) {
      console.log("hi");
      console.log("book posted successfully: " + response);
      // Add sound effect
      const audio = new Audio("../../assets/sounds/add-to-cart.mp3");
      audio.play();
      popupText("The book created successfully!📖");
      setTimeout(function () {
        window.location.href = "../home";
      }, 3000);
    },
    error: function (error) {
      console.error("Error posting book:", error);
      onError(error); // This would call your error handling function if you have one
    },
  });
};
