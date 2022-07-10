import React, { useState, useEffect } from 'react'
import axios from 'axios'

const picuri = 'https://emagweb.github.io/sdev/icons/'

const iconuri = 'https://skillicons.dev/icons?i='

const App = () => {

  const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

  const [vacancies, setVacancies] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const getPages = () => {
    const elements = []
    for (let i = 1; i <= totalPages; i++) {
      elements.push(
         <span className="v-pages"><button
            key={i}
            className={currentPage !== i ? '' : 'noactive'}
            onClick={() => currentPage !== i ? 
            (setCurrentPage(i), 
            fetchVacancies(), goToTop()) : setCurrentPage(currentPage)
          }>{i < 10 ? `0${i}` : i}</button></span>
      )
    }
    return elements
  };

  function fetchVacancies() {
    return function(dispatch) {
      dispatch(vacancies())
      axios.get(`https://backoffice.pogovorimo.com.ua/api/v1/applicant/?page=${currentPage}`)
        .then((res) => {
          dispatch(res.data.results)
          setVacancies(res.data.results)
        })
    }
  }



  useEffect (() => {    
    const getVacancies = async () => {
      const res = await axios.get(`https://backoffice.pogovorimo.com.ua/api/v1/applicant/?page=${currentPage}`)
      setVacancies(res.data.results)
      setTotalPages(res.data.total_pages)
      setCurrentPage(res.data.current_page)
    }
    getVacancies()
  }, [currentPage])


  return (
    <section className="page">
      <div className="features">
        <h3 className="section__title serv">Your Future Tech Team</h3>
        <p className="subtitle__text serv">
          The Best Remote Developers In The Ukraine
        </p>
        <div className="feature-row">
          {vacancies.map((item, index) =>  (
            <div className="feature" key={index}>
              <div>
                <h3 className="feature-title">{item.position.length > 21 ? item.position.slice(0,21) + ' ...' : item.position }</h3>
                <div className="flex-row">
                  <img className="flex-pic" src={picuri + (!item.business_area[0] ? 'software' : item.business_area) + '.svg'} alt={item.business_area} />
                  <div className="flex-right">
                    <p className="bg-yellow">{item.general_experience + ' years'}</p>
                    <p className="salary">${item.salary}/hour</p>
                  </div>
                </div>
                <div className="skills-icons">
                  <h3 className="dark">Expert In</h3>
                  <p className="skillsets">
                    <img src={iconuri + item.technologies.slice(0,6)} className="skill-icon" alt={'skills'} />
                  </p>
                </div>
              </div>
              <div>
                <div className="feature-desc">
                  <p className="dark m-20">{item.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex-center'>
          <button  
            className={currentPage > 1 ? '' : 'noactive'}
            onClick={() => currentPage > 1 ? 
            (setCurrentPage(currentPage - 1), 
            fetchVacancies(), goToTop()) : setCurrentPage(currentPage)
          }>Prev</button>
          {getPages()}
          <button 
            className={currentPage < totalPages ? '' : 'noactive'}
            onClick={() => currentPage < totalPages ?
            (setCurrentPage(currentPage + 1),
            fetchVacancies(), goToTop()) : setCurrentPage(currentPage)
          }>Next</button>
        </div>
      </div>
    </section>
  )
}

export default App