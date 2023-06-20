import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { fetchApiData } from "../core/fetch-api"

const PlasmoMainUI = () => {
  const [matches, setMatches] = useState<string[]>([])
  const [randomMessage, setRandomMessage] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      const { websites, error } = await fetchApiData()

      if (error) {
        console.error("Error fetching API data:", error)
        return
      }

      if (websites.length > 0) {
        const extractedMatches = websites.map((website) => website.url)
        setMatches(extractedMatches)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (matches.includes(window.location.hostname)) {
      const fetchRandomMessage = async () => {
        const { websites, error } = await fetchApiData()

        if (error) {
          console.error("Error fetching API data:", error)
          return
        }

        const matchedWebsite = websites.find((website) =>
          website.url.includes(window.location.hostname)
        )

        if (matchedWebsite) {
          const randomIndex = Math.floor(
            Math.random() * matchedWebsite.messages.length
          )
          setRandomMessage(matchedWebsite.messages[randomIndex])
        }
      }

      fetchRandomMessage()
    }
  }, [matches])

  const plasmoConfig: PlasmoCSConfig = {
    matches: [],
    world: "MAIN"
  }

  useEffect(() => {
    plasmoConfig.matches = matches.map((match) => `https://${match}/*`)
  }, [matches])

  return (
    <div>
      {matches.includes(window.location.hostname) && (
        <div
          style={{
            padding: 8,
            background: "#afe8bd",
            color: "black"
          }}>
          <h1>{`Message: ${randomMessage}`}</h1>
        </div>
      )}
    </div>
  )
}

export default PlasmoMainUI
