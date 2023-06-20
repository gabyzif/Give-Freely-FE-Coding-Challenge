import React, { useEffect, useState } from "react"

import { fetchApiData } from "./core/fetch-api"

import "./styles/popup.css"

interface Company {
  name: string
  messages: string[]
}

function IndexPopup() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

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

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company)
  }

  const handleBackClick = () => {
    setSelectedCompany(null)
  }

  return (
    <div className="container">
      <h2 className="title">Welcome to your GiveFreely Extension!</h2>
      {selectedCompany ? (
        <>
          <button className="backButton" onClick={handleBackClick}>
            Go Back
          </button>
          <h3>{selectedCompany.name}</h3>
          <ul className="messagesList">
            {selectedCompany.messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </>
      ) : (
        <ul className="companyList">
          {companies.map((company, index) => (
            <li className="companyItem" key={index}>
              <button
                className="companyButton"
                onClick={() => handleCompanyClick(company)}>
                {company.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default IndexPopup
