import { useEffect, useState } from "react"

import { fetchApiData } from "./core/fetch-api"

function IndexPopup() {
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { websites, error } = await fetchApiData()

      if (error) {
        console.error("Error fetching API data:", error)
        return
      }

      if (websites.length > 0) {
        setCompanies(websites)
      }
    }

    fetchData()
  }, [])

  const handleCompanyClick = (company) => {
    setSelectedCompany(company)
  }

  const handleBackClick = () => {
    setSelectedCompany(null)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      {selectedCompany ? (
        <>
          <button onClick={handleBackClick}>Go Back</button>
          <h3>{selectedCompany.name}</h3>
          <ul>
            {selectedCompany.messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </>
      ) : (
        <ul>
          {companies.map((company, index) => (
            <li key={index}>
              <button onClick={() => handleCompanyClick(company)}>
                {company.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
