// google-search-highlight.tsx
import type { PlasmoCSConfig } from "plasmo"

import { fetchApiData } from "../core/fetch-api"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"]
}

window.addEventListener("load", () => {
  fetchUrls()
})

export async function fetchUrls() {
  const { websites, error } = await fetchApiData()
  if (!error) {
    highlightSearchResults(websites)
  }
}

export function highlightSearchResults(urls: { url: string }[]) {
  const searchResults = document.querySelectorAll(".g")
  searchResults.forEach((result: HTMLElement) => {
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
