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
    error: function (xhr, status, error) {
      if (typeof errorCallback === "function") {
        errorCallback(xhr, status, error);
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
        errorCallback(xhr, status, error);
      }
    },
  });
}

// Expose functions globally
window.fetchData = fetchData;
window.sendData = sendData;
