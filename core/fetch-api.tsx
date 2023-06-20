interface Website {
  url: string
  messages: string[] // Add this line to include the messages property
}

interface FetchApiDataResponse {
  websites: Website[]
  error: string | null
}

export async function fetchApiData(): Promise<FetchApiDataResponse> {
  let websites: Website[] = []
  let error: string | null = null

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
      const urls: Website[] = data.record.websites || []
      websites = urls
    } else {
      error = "Failed to fetch API data"
    }
  } catch (err) {
    error = "Error fetching API data"
    console.error("Error fetching API data:", err)
  }

  return { websites, error }
}
