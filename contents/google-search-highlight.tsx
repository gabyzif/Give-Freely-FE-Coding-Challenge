import type { PlasmoCSConfig } from "plasmo"

import { fetchApiData } from "../core/fetch-api"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"]
}

window.addEventListener("load", fetchUrls)

async function fetchUrls() {
  const { websites, error } = await fetchApiData()
  console.log(websites, "websites")
  if (!error) {
    highlightSearchResults(websites)
  }
}

function highlightSearchResults(urls: { url: string }[]) {
  const searchResults = document.querySelectorAll(".g")
  searchResults.forEach((result) => {
    const link = result.querySelector("a")
    if (link) {
      const resultUrl = link.href
      const matchingUrl = urls.find((u) => resultUrl.includes(u.url))

      if (matchingUrl) {
        result.style.border = "2px solid #afe8bd"
        result.style.padding = "40px"
        result.style.borderRadius = "4px"
      }
    }
  })
}

fetchUrls()
