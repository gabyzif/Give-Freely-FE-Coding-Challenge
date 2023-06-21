import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { fetchApiData } from "../core/fetch-api"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"]
}

export const getStyle = (): HTMLStyleElement => {
  const style = document.createElement("style")
  style.textContent = `
    /* Inline CSS content here */
    .bell-notification {
      position: fixed;
      z-index: 999;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      background-color: #afe8bd;
      border: none;
      border-radius: 50%;
      color: #000;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .modal {
      position: fixed;
      z-index: 999;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      width: 300px;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .modal-close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }

    h3 {
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 20px;
    }
  `
  return style
}

export const getShadowHostId = (): string => "plasmo-google-sidebar"

const GoogleBellAddOn = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [randomMessage, setRandomMessage] = useState<string>("")
  const [randomName, setRandomName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const [websites, setWebsites] = useState<any[]>([])

  useEffect(() => {
    document.body.classList.toggle("plasmo-google-sidebar-show", isOpen)
  }, [isOpen])

  const getData = async (): Promise<void> => {
    setLoading(true)
    const { websites: urls, error } = await fetchApiData()
    if (urls.length > 0) {
      setWebsites(urls)
    }
    setLoading(false)
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (websites.length > 0) {
      const randomIndexWebsite = Math.floor(Math.random() * websites.length)
      const randomIndexMessage = Math.floor(Math.random() * websites.length)
      setRandomName(websites[randomIndexWebsite]?.name)
      setRandomMessage(
        websites[randomIndexWebsite]?.messages[randomIndexMessage]
      )
    }
  }, [websites])

  const handleBellClick = (): void => {
    const randomIndexWebsite = Math.floor(Math.random() * websites.length)
    const randomIndexMessage = Math.floor(
      Math.random() * websites[randomIndexWebsite]?.messages.length
    )
    setRandomName(websites[randomIndexWebsite]?.name)
    setRandomMessage(websites[randomIndexWebsite]?.messages[randomIndexMessage])
    setModalOpen(true)
  }
  return (
    <div>
      <button
        className="bell-notification"
        onClick={handleBellClick}
        role="button">
        🔔
      </button>
      {modalOpen && (
        <div className="modal" role="dialog">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setModalOpen(false)}
              role="button">
              X
            </button>
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              <>
                <h3>{randomName}</h3>
                <p>{randomMessage}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GoogleBellAddOn
