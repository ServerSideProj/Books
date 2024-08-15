// Function to handle AJAX GET request
function fetchData(url, successCallback, errorCallback) {
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: function (response) {
      if (typeof successCallback === "function") {
        successCallback(response);
      }
    },
    error: function (error) {
      if (typeof errorCallback === "function") {
        errorCallback(error);
      }
    },
  });
}

// Function to handle AJAX POST request
function sendData(url, data, successCallback, errorCallback) {
  $.ajax({
    url: url,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    dataType: "json",
    success: function (response) {
      if (typeof successCallback === "function") {
        successCallback(response);
      }
    },
    error: function (error) {
      if (typeof errorCallback === "function") {
        errorCallback(error);
      }
    },
  });
}

//
// add options to add image to server
//

// Expose functions globally
window.fetchData = fetchData;
window.sendData = sendData;

// Function to handle error response
const onError = (error) => {
  console.log(error);
};
