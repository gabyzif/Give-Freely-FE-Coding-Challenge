import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom/extend-expect"

// Import the extended matchers
import PlasmoMainUI from "../contents/show-banner-url-ui"

describe("PlasmoMainUI", () => {
  it("renders without errors", () => {
    render(<PlasmoMainUI />)
    const element = screen.getByText("Message:")
    expect(element).toBeInTheDocument()
  })
})
