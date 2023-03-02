const subscriptionKey = "<your-subscription-key>";
const endpoint = "https://api.bing.microsoft.com/v7.0/search";

const form = document.querySelector("#search-form");
const resultsDiv = document.querySelector("#search-results");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = document.querySelector("#query").value;

  // Send the search query to the Bing Search API
  fetch(`${endpoint}?q=${encodeURIComponent(query)}`, {
    headers: {
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      // Display the search results
      resultsDiv.innerHTML = "";

      json.webPages.value.forEach((result) => {
        const link = document.createElement("a");
        link.href = result.url;
        link.textContent = result.name;

        const snippet = document.createElement("p");
        snippet.textContent = result.snippet;

        const div = document.createElement("div");
        div.appendChild(link);
        div.appendChild(snippet);

        resultsDiv.appendChild(div);
      });
    })
    .catch((error) => console.error(error));
});
