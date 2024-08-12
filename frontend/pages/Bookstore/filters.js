// After the user selects all the filters in the popup, apply them to the books.
const applyAllFilters = () => {
  let filteredBooks = arrAllBooks.slice();
  console.log(activeFilters);

  // Apply rate filter if present
  if (activeFilters.rate) {
    filteredBooks = filteredBooks.filter((book) => {
      return book.avgRating >= activeFilters.rate;
    });
  }

  // Apply release date filter if present
  if (activeFilters.releaseDate) {
    if (activeFilters.releaseDate === "newest to oldest") {
      filteredBooks.sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
      );
    } else if (activeFilters.releaseDate === "oldest to newest") {
      filteredBooks.sort(
        (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
      );
    }
  }

  // Apply book type filter if present
  if (activeFilters.bookType) {
    filteredBooks = filteredBooks.filter((book) => {
      if (activeFilters.bookType === "both") return true;
      if (activeFilters.bookType === "ebooks" && book.isEbook === true)
        return true;
      if (activeFilters.bookType === "phys" && book.isEbook === false)
        return true;
      return false;
    });
  }

  // Apply category filter if present
  if (activeFilters.category) {
    filteredBooks = filteredBooks.filter((book) => {
      return (
        book.categories && book.categories.includes(activeFilters.category)
      );
    });
  }

  // Apply author filter if present
  if (activeFilters.author) {
    filteredBooks = filteredBooks.filter((book) => {
      return (
        book.authors &&
        book.authors.some(
          (author) =>
            author.name.toLowerCase() === activeFilters.author.toLowerCase()
        )
      );
    });
  }

  ///
  //
  // TODO: add friends to user, add a server call to get all the users books....
  //
  ///
  // Apply friend filter if present
  if (activeFilters.friend) {
    filteredBooks = filteredBooks.filter((book) => {
      return (
        book.recommendedBy && book.recommendedBy.includes(activeFilters.friend)
      );
    });
  }

  // Apply price range filter if present
  if (
    activeFilters.priceRange.min !== null &&
    activeFilters.priceRange.max !== null
  ) {
    filteredBooks = filteredBooks.filter((book) => {
      return (
        book.price >= activeFilters.priceRange.min &&
        book.price <= activeFilters.priceRange.max
      );
    });
  }

  // Apply search text filter if present
  if (activeFilters.searchText) {
    filteredBooks = filteredBooks.filter((book) => {
      const title = book.title.toLowerCase();
      const description = book.description.toLowerCase();
      const authors = book.authors
        .map((author) => author.name.toLowerCase())
        .join(" ");
      return (
        title.includes(activeFilters.searchText) ||
        description.includes(activeFilters.searchText) ||
        authors.includes(activeFilters.searchText)
      );
    });
  }

  // Apply sort by price high/low
  if (activeFilters.priceSort === "low-to-high")
    filteredBooks.sort((a, b) => a.price - b.price);
  else filteredBooks.sort((a, b) => b.price - a.price);

  currBooksDisplay = filteredBooks; // Update the current display list
  renderBooks(currBooksDisplay); // Re-render the books on the page
};

// sort all book that in display by price high to low or low to high.
const sortByPrice = (filter) => {
  if (filter === "high-to-low") {
    activeFilters.priceSort = "high-to-low";
  } else {
    activeFilters.priceSort = "low-to-high";
  }
  applyAllFilters();
};

// sort books between a range of price
const sortByPriceRange = () => {
  const minPrice = parseFloat($("input[type='number']").eq(0).val());
  const maxPrice = parseFloat($("input[type='number']").eq(1).val());

  activeFilters.priceRange = { min: minPrice, max: maxPrice };
  applyAllFilters();
};

// filter books by title, author, or description
const filterBooksByText = (searchText) => {
  activeFilters.searchText = searchText.toLowerCase();
  applyAllFilters();
};

const filterRate = function () {
  // Remove the selected class from all rate options
  $(".container-options[data-stars] .opt").removeClass("selected");

  // Reset the image src for all options
  $(".container-options[data-stars] .opt img").attr("src", function () {
    return $(this).attr("src").replace("circle-checked.svg", "circle.svg");
  });

  // Add the selected class to the clicked option
  $(this).addClass("selected");

  // Toggle image source between default and selected
  const img = $(this).find("img");
  const imgSrc = img.attr("src");
  img.attr("src", imgSrc.replace("circle.svg", "circle-checked.svg"));
};

const filterDate = function () {
  $(".container-options[data-date] .opt").removeClass("selected");
  $(".container-options[data-date] .opt img").each(function () {
    $(this).attr(
      "src",
      $(this).attr("src").replace("circle-checked.svg", "circle.svg")
    );
  });

  $(this).addClass("selected");
  const img = $(this).find("img");
  const imgSrc = img.attr("src");
  img.attr("src", imgSrc.replace("circle.svg", "circle-checked.svg"));
};

const filterType = function () {
  $(".container-options[data-type] .opt").removeClass("selected");
  $(".container-options[data-type] .opt img").each(function () {
    $(this).attr(
      "src",
      $(this).attr("src").replace("circle-checked.svg", "circle.svg")
    );
  });

  $(this).addClass("selected");
  const img = $(this).find("img");
  const imgSrc = img.attr("src");
  img.attr("src", imgSrc.replace("circle.svg", "circle-checked.svg"));
};

const collectFilterData = () => {
  let filterData = {};

  // Collect selected rate (single selection allowed)
  let selectedRate = $(".container-options[data-stars] .opt.selected").data(
    "stars"
  );
  filterData["rate"] = selectedRate;

  // Collect selected release date (single selection)
  let selectedDate = $(".container-options[data-date] .opt.selected").data(
    "date"
  );
  if (!selectedDate) {
    selectedDate = $(".container-options[data-date] .opt")
      .filter(function () {
        return $(this).find("img").attr("src").includes("circle-checked.svg");
      })
      .data("date");
  }
  filterData["releaseDate"] = selectedDate;

  // Collect selected book type (single selection)
  let selectedType = $(".container-options[data-type] .opt.selected").data(
    "type"
  );
  if (!selectedType) {
    selectedType = $(".container-options[data-type] .opt")
      .filter(function () {
        return $(this).find("img").attr("src").includes("circle-checked.svg");
      })
      .data("type");
  }
  filterData["bookType"] = selectedType;

  // Collect selected categories
  let selectedCategory = $("#category-input").val();
  filterData["category"] = selectedCategory;

  // Collect selected author
  let selectedAuthor = $("#author-input").val();
  filterData["author"] = selectedAuthor;

  // Collect selected friend
  let selectedFriend = $("#friends-input").val();
  filterData["friend"] = selectedFriend;

  return filterData;
};
