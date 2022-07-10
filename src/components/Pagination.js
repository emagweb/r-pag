import React from 'react'

const Pagination = ({vacanciesPerPage, totalVacancies, paginate}) => {

  const pageNumbers = []
  
  for ( let i = 1; i <= Math.ceil(totalVacancies / vacanciesPerPage); i++ ) {
    pageNumbers.push(i)
  }
  
  return (
    <div className="flex-center">
      {
        pageNumbers.map(number => (
          <button className="v-button" key={number} onClick={() => paginate(number)}>{number}</button>
        ))
      }
    </div>
  )

}

export default Pagination