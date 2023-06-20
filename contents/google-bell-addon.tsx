import iconBase64 from "data-base64:~assets/icon.png"
import cssText from "data-text:~/contents/google-sidebar.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { fetchApiData } from "../core/fetch-api"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getShadowHostId = () => "plasmo-google-sidebar"

const GoogleBellAddOn = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [randomMessage, setRandomMessage] = useState("")
  const [randomName, setRandomName] = useState("")

  const [websites, setWebsites] = useState([])

  useEffect(() => {
    document.body.classList.toggle("plasmo-google-sidebar-show", isOpen)
  }, [isOpen])

  const getData = async () => {
    const { websites: urls, error } = await fetchApiData()
    if (!error) {
      setWebsites(urls)
    }
  }

  const handleBellClick = () => {
    const randomIndexWebsite = Math.floor(Math.random() * websites.length)
    const randomIndexMessage = Math.floor(Math.random() * websites.length)

    setRandomName(websites[randomIndexWebsite].name)
    setRandomMessage(websites[randomIndexWebsite].messages[randomIndexMessage])

    setModalOpen(true)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <button className="bell-notification" onClick={handleBellClick}>
        🔔
      </button>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              ✖
            </button>
            <h3>{randomName}</h3>
            <p>{randomMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoogleBellAddOn
