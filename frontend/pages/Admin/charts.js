$(document).ready(function () {
  // first chart
  (async () => {
    const books = await getPurchasedBooksData();
    const { ebookCount, physicalBookCount } = processBooksData_bookType(books);
    const chartData = prepareChartData_bookType(ebookCount, physicalBookCount);
    createBooksChart_bookType(chartData);
  })();

  // second chart
  renderBooksChartByPrice();

  // third chart
  renderBooksChartByCategory();
});

// Function to fetch purchased books data
const getPurchasedBooksData = async () => {
  try {
    const response = await fetch(`${API_URL}Book/get-all-users-purchases`);
    if (!response.ok) {
      throw new Error("Failed to fetch purchased books data.");
    }
    return await response.json(); // get the data
  } catch (error) {
    console.error("Error fetching purchased books data:", error);
    return [];
  }
};

// Process books data to categorize by book type (already exists in your code)
const processBooksData_bookType = (books) => {
  let ebookCount = 0;
  let physicalBookCount = 0;

  books.forEach((book) => {
    if (book.isEbook) {
      ebookCount++;
    } else {
      physicalBookCount++;
    }
  });

  return {
    ebookCount,
    physicalBookCount,
  };
};

// Prepare chart data for book types
const prepareChartData_bookType = (ebookCount, physicalBookCount) => {
  return {
    labels: ["eBooks", "Physical Books"],
    datasets: [
      {
        data: [ebookCount, physicalBookCount],
        backgroundColor: ["#f764cc", "#641bff"],
      },
    ],
  };
};

// Create book type chart
const createBooksChart_bookType = (chartData) => {
  const ctx = document.getElementById("booksChart_bookType").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
};

// Process books data by price
const processBooksDataByPrice = (books) => {
  const priceCounts = {};

  books.forEach((book) => {
    const price = book.bookPrice;
    if (priceCounts[price]) {
      priceCounts[price]++;
    } else {
      priceCounts[price] = 1;
    }
  });

  const sortedPrices = Object.keys(priceCounts).sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  );
  const bookCounts = sortedPrices.map((price) => priceCounts[price]);

  return { sortedPrices, bookCounts };
};

// Render books chart by price
const renderBooksChartByPrice = async () => {
  const books = await getPurchasedBooksData();
  const { sortedPrices, bookCounts } = processBooksDataByPrice(books);

  const ctx = document.getElementById("booksChart_price").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: sortedPrices, // X-axis: Prices
      datasets: [
        {
          label: "Number of Books Purchased",
          data: bookCounts, // Y-axis: Count of books purchased at each price
          backgroundColor: "#dd47c2",
          maxBarThickness: 50,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Price",
          },
          ticks: {
            maxTicksLimit: 10, // Limit the number of ticks on the x-axis
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of Books Purchased",
          },
          beginAtZero: true,
        },
      },
    },
  });
};

const processBooksDataByCategory = (books) => {
  const categoryCounts = {};

  books.forEach((book) => {
    // Check if categories is a string and split it into an array
    const categoriesArray =
      typeof book.categories === "string"
        ? book.categories.split(",").map((cat) => cat.trim())
        : [];

    categoriesArray.forEach((category) => {
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
  });

  return categoryCounts;
};

// Render books chart by category
const renderBooksChartByCategory = async () => {
  const books = await getPurchasedBooksData();
  const categoryCounts = processBooksDataByCategory(books);

  const categories = Object.keys(categoryCounts);
  const bookCounts = Object.values(categoryCounts);

  const ctx = document.getElementById("booksChart_category").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: categories, // X-axis: Categories
      datasets: [
        {
          label: "Number of Books Purchased",
          data: bookCounts, // Y-axis: Count of books purchased per category
          backgroundColor: "#641bff",
          maxBarThickness: 50,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Categories",
          },
          ticks: {
            maxTicksLimit: 10, // Limit the number of ticks on the x-axis
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of Books Purchased",
          },
          beginAtZero: true,
        },
      },
    },
  });
};
