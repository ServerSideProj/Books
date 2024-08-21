var step = 1;
var imageLink = "";

$(document).ready(function () {});

// Select random categories
const selectRandomCategories = () => {
  const categories = $(".container-categories .category");
  const numberOfCategories = categories.length;
  const randomCount = Math.floor(Math.random() * 2) + 2;

  // Remove existing selected class
  categories.removeClass("selected");

  // Pick random categories
  const randomCategories = [];
  while (randomCategories.length < randomCount) {
    const randomIndex = Math.floor(Math.random() * numberOfCategories);
    if (!randomCategories.includes(randomIndex)) {
      randomCategories.push(randomIndex);
    }
  }

  // Add selected class to picked categories
  randomCategories.forEach((index) => {
    $(categories[index]).addClass("selected");
    selectedCategories.push($(categories[index]).html);
  });
};

const nextStep = () => {
  if (step === 1 && selectedCategories.length > 0) {
    $(`.step-${step}`).removeClass("show");
    step++;
    $(`.step-${step}`).addClass("show");
  } else if (step === 2 && $("#input-desc").val() != "") {
    $(`.step-${step}`).removeClass("show");
    step++;
    $(`.step-${step}`).addClass("show");
    $("#gen-image").click(generateImageFromDescription);
  } else if (step === 3 && imageLink != "") {
    loadStep4Data();
    $("#bookIsReady").click(getAllDataAi);

    $(`.step-${step}`).removeClass("show");
    step++;
    $(`.step-${step}`).addClass("show");
    $(".next-btn").hide(); // Hide the Next button after the final step
  }
};

const getDescription = async () => {
  const apiUrl =
    "https://api-inference.huggingface.co/models/openai-community/gpt2";
  const apiKey = "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";

  // prompt for creating description
  const prompt = `In a world defined by ${selectedCategories.join(
    " and "
  )}, life was anything but ordinary. The story unfolds as the protagonist navigates through the challenges and mysteries that ${
    selectedCategories.length > 1 ? "these forces" : "this force"
  } brought into their life, with each step leading to...`;

  // Set up the request payload
  const requestBody = {
    inputs: prompt,
    options: {
      wait_for_model: true,
      max_new_tokens: 700, // Request a longer response (adjust as needed)
      temperature: 0.7, // Adjust the creativity/randomness of the response
      top_p: 0.9, // Nucleus sampling
    },
  };

  try {
    // Show the loader
    $(".loader-2").show();

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

    // Remove the part of the prompt from the response
    description = description.replace(prompt, "").trim();

    // Insert the generated description into the textarea with ID 'input-desc'
    $("#input-desc").val(description);
  } catch (error) {
    console.error("Error generating description:", error);
    $("#input-desc").val("Error generating description.");
  } finally {
    // Hide the loader
    $(".loader-2").hide();
  }
};

// generate image from text description
const generateImageFromDescription = async () => {
  const apiUrl =
    "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";
  const apiKey = "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";

  // Prepare the request payload
  const requestBody = {
    inputs: $("#input-desc").val(),
  };

  try {
    // Show the loader
    $(".loader-2").show();

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    // Get the image blob from the response
    const imageBlob = await response.blob();

    // Create a file object from the blob
    const file = new File([imageBlob], "generated-image.png", {
      type: "image/png",
    });

    // Display the image in the img element
    uploadBookCoverAi(file);

    // Upload the generated image
  } catch (error) {
    console.error("Error generating or uploading the image:", error);
  } finally {
    // Hide the loader
    $(".loader-2").hide();
  }
};

// Function to upload a book cover image using jQuery's $.ajax
const uploadBookCoverAi = (file) => {
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
      document.getElementById("book-cover-img-end").src = imageLink;
      document.getElementById("book-cover-img-gen").src = imageLink;
      console.log("Image uploaded successfully:", imageLink);
    },
    error: function (error) {
      console.error(error);
    },
  });
};

const handleFileUploadClick = () => {
  // Create a temporary input element dynamically
  const tempInput = document.createElement("input");
  tempInput.type = "file";
  tempInput.accept = "image/*";
  tempInput.style.display = "none"; // Hide the input element

  // Append it to the body (necessary for some browsers)
  document.body.appendChild(tempInput);

  // Trigger the click event on the temporary input
  tempInput.click();

  // Handle file selection
  tempInput.addEventListener("change", (e) => {
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        $("#book-cover-img").attr("src", event.target.result); // Update the image preview
      };
      reader.readAsDataURL(file); // Read the file as a data URL

      // Upload the file
      uploadBookCoverAi(file);
    }

    // Remove the temporary input after use
    document.body.removeChild(tempInput);
  });
};

const loadStep4Data = () => {
  // Get the title and description from the input fields
  const title = localStorage.getItem("authToken") + "'s Book";
  const description = $("#input-desc").val().trim();

  $("#book-cover-img-end").attr(
    "src",
    imageLink || "../../assets/images/none-cover.svg"
  );
  $(".title").val(title);
  $(".descriptionFinal").text(description);
  $(".categories").text(selectedCategories.join(", "));
};

const getAllDataAi = () => {
  const data = {
    title: $(".title").val().trim(),
    description: $(".descriptionFinal").val().trim(),
    language: "en",
    categories: selectedCategories, // Selected categories array
    authors: [localStorage.getItem("authToken")], // Ensure the author name is not empty
    imageLink: imageLink, // The image link collected earlier
  };

  postToServer(data);
};
