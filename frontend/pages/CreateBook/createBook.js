$(document).ready(function () {
  // Navigate between inner pages
  $(".btn-insert").click(goPageInsertBook);
  $(".btn-generate").click(goPageGenerateBook);

  // Add author input
  $(".btn-add-author").click(addAuthor);

  // Handle file upload
  $("#upload-file").click(function () {
    $("#file-input").click();
  });

  $("#file-input").change(function (e) {
    handleFileUpload(e);
  });

  // Handle create book
  $("#create-book").click(function () {
    if (checkAllData()) {
      getAllData();
    } else {
      alert("Please fill all the fields.");
    }
  });

  // Delegate the click event for dynamically added delete buttons
  $(".container-authors").on("click", ".delete", function () {
    $(this).parent().remove();
  });
});

const goPageInsertBook = () => {
  $(".inner-page").removeClass("show");
  $("#insert-book-page").addClass("show");
  getAllLanguages();
};

const goPageGenerateBook = () => {
  $(".inner-page").removeClass("show");
  $("#generate-book-page").addClass("show");
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

// Add author input into insert books page
const addAuthor = () => {
  // Create the new input element
  var newInput = $("<input>", {
    type: "text",
    placeholder: "example: J. K. Rowling",
    class: "input-box-sqr l-text",
  });

  // Create the delete button
  var deleteButton = $("<img>", {
    src: "../../assets/icons/trash-icon.svg",
    alt: "trash-icon",
    class: "btn delete",
  });

  // Create a wrapper div for the input and delete button
  var wrapperDiv = $("<div>", {
    class: "author-input-wrapper",
  });

  // Append the input and delete button to the wrapper div
  wrapperDiv.append(newInput);
  wrapperDiv.append(deleteButton);

  // Append the wrapper div to the .container-authors div
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

// Check if all the data is filled
const checkAllData = () => {
  const title = $("#book-title").val().trim();
  const description = $("#book-description").val().trim();
  const language = $("#language").val().trim();
  const coverImage = $("#book-cover-img").attr("src");
  /////////// להוסיף בדיקה על הקטגוריות - למשל שנבחרה לפחות אחת ולא יותר מ-4
  const authors = $(".container-authors input")
    .map(function () {
      return $(this).val().trim();
    })
    .get()
    .filter((author) => author !== "");

  return (
    title &&
    description &&
    language &&
    coverImage !== "../../assets/images/none-cover.svg" &&
    authors.length > 0
  );
};

// Get all the data after clicks on "create book" and send to server
const getAllData = () => {
  const data = {
    title: $("#book-title").val().trim(),
    description: $("#book-description").val().trim(),
    language: $("#language").val().trim(),
    coverImage: $("#book-cover-img").attr("src"),
    ////////////////////////////// להוסיף גם את הקטגוריות!!
    authors: $(".container-authors input")
      .map(function () {
        return $(this).val().trim();
      })
      .get()
      .filter((author) => author !== ""),
  };

  console.log(data); // Replace with actual server request
  // Example of sending data to server
  /*
  $.ajax({
    url: 'your-server-endpoint',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(response) {
      alert("Book created successfully!");
    },
    error: function() {
      alert("Failed to create book.");
    }
  });
  */
};
