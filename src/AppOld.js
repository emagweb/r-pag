import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Vacancies from './components/Vacancies'
import Pagination from './components/Pagination'
import './App.css'

const apiUrl = 'https://backoffice.pogovorimo.com.ua/api/v1/applicant/'

function ApOld() {

  const [vacancies, setVacancies] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage,setCurrentPage] = useState(1)
  const [vacanciesPerPage] = useState(4)

  useEffect (() => {
    const getVacancies = async () => {
      setLoading(true)
      const res = await axios.get(apiUrl)
      console.log(res.data.results)
      setVacancies(res.data.results)
      setLoading(false)
      setCurrentPage(res.data.current_page)
    }
    getVacancies()
  }, [])

  const lastVacancyIndex = currentPage * vacanciesPerPage
  const firstVacancyIndex = lastVacancyIndex - vacanciesPerPage
  const currentVacancy = vacancies.slice(firstVacancyIndex,lastVacancyIndex)

  

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <>
      <Vacancies vacancies={vacancies} loading={loading} />
      <Pagination 
        vacanciesPerPage={vacanciesPerPage}
        totalVacancies={vacancies.length}
        paginate={paginate}
      />
    </>
  )
}

export default AppOld