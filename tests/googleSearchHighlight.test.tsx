import {
  fetchUrls,
  highlightSearchResults
} from "../contents/google-search-highlight"
import * as fetchApiModule from "../core/fetch-api"

jest.spyOn(fetchApiModule, "fetchApiData")

// Mock fetchApiData function
jest.mock("../core/fetch-api", () => ({
  fetchApiData: jest.fn()
}))

describe("highlightSearchResults", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="g">
        <a href="https://www.google.com/example">Example</a>
      </div>
      <div class="g">
        <a href="https://www.google.com/test">Test</a>
      </div>
      <div class="g">
        <a href="https://www.google.com/other">Other</a>
      </div>
    `
  })

  it("highlights search results with matching URLs", () => {
    const urls = [
      { url: "https://www.google.com/example" },
      { url: "https://www.google.com/test" }
    ]

    highlightSearchResults(urls)

    const highlightedResults = document.querySelectorAll(".g[style]")

    expect(highlightedResults).toHaveLength(2)
  })

  it("does not highlight search results with non-matching URLs", () => {
    const urls = [{ url: "https://www.google.com/other" }]

    highlightSearchResults(urls)

    const highlightedResults = document.querySelectorAll(".g[style]")

    expect(highlightedResults).toHaveLength(1)
  })
})
