import { fireEvent, render, screen } from "@testing-library/react"

import "@testing-library/jest-dom/extend-expect"

import GoogleBellAddOn from "../contents/google-bell-addon"

test("renders bell notification button", () => {
  render(<GoogleBellAddOn />)
  const bellButton = screen.getByRole("button", { name: "🔔" })
  expect(bellButton).toBeInTheDocument()
})

test("opens modal when bell button is clicked", () => {
  render(<GoogleBellAddOn />)
  const bellButton = screen.getByRole("button", { name: "🔔" })

  fireEvent.click(bellButton)

  const modal = screen.getByRole("dialog")
  expect(modal).toBeInTheDocument()
})

test("closes modal when close button is clicked", () => {
  render(<GoogleBellAddOn />)
  const bellButton = screen.getByRole("button", { name: "🔔" })

  fireEvent.click(bellButton)

  const closeButton = screen.getByRole("button", { name: "X" })
  fireEvent.click(closeButton)

  const modal = screen.queryByRole("dialog")
  expect(modal).not.toBeInTheDocument()
})
