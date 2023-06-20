import { render } from "@testing-library/react"
import React from "react"

import PlasmoMainUI from "../contents/show-banner-url-ui"

describe("PlasmoMainUI", () => {
  it("renders without errors", () => {
    render(<PlasmoMainUI />)
    // No error means the component rendered successfully
  })
})
