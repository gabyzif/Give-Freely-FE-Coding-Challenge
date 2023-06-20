export async function fetchApiData() {
  let websites = []
  let error = null
  try {
    const response = await fetch(
      "https://api.jsonbin.io/v3/b/64678cf09d312622a36121b8",
      {
        headers: {
          "X-Access-Key":
            "$2b$10$QhrtefF/jKDbKgauF5trL.SK6VAk69VSIcHMhGaEs8ZViK.xBh0Om"
        }
      }
    )

    if (response.ok) {
      const data = await response.json()
      const urls = data.record.websites || []
      websites = urls
    } else {
      error.message = "Failed to fetch API data"
    }
  } catch (error) {
    error.message = "Error fetching API data"
    console.error("Error fetching API data:", error)
  }

  return { websites, error }
}
