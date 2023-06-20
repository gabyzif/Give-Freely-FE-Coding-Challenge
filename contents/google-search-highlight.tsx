import type { PlasmoCSConfig } from "plasmo"

import { fetchApiData } from "../core/fetch-api"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"]
}

window.addEventListener("load", fetchUrls)

// Function to fetch the URLs from the API
async function fetchUrls() {
  const { websites, error } = await fetchApiData()
  console.log(websites, "websites")
  if (!error) {
    highlightSearchResults(websites)
  }
}

// Function to highlight search results with matching URLs
function highlightSearchResults(urls) {
  const searchResults = document.querySelectorAll(".g")
  searchResults.forEach((result) => {
    const link = result.querySelector("a")
    if (link) {
      const resultUrl = link.href
      // Check if the search result URL matches any of the fetched URLs
      const matchingUrl = urls.find((u) => resultUrl.includes(u.url))

      if (matchingUrl) {
        result.style.border = "2px solid blue"
      }
    }
  })
}

// Run the function to fetch URLs and highlight search results
fetchUrls()
