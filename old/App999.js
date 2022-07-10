import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import './App.css'


const picuri = 'https://emagweb.github.io/sdev/icons/'

const iconuri = 'https://skillicons.dev/icons?i='

function App999() {
  
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [perPage,setPerPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)


  const getData = async() => {
      const res = await axios.get(`https://backoffice.pogovorimo.com.ua/api/v1/applicant/`)
      const data = res.data.results
      setPerPage(res.data.page_size)
      setPageCount(res.data.total_pages)
      const slice = data.slice(offset, offset + perPage)
      const postData = slice.map(item => <div className="feature">
        <div>
          <h3 className="feature-title">{item.position.slice(0,48)}</h3>
          <div className="flex-row">
            <img className="flex-pic" src={picuri + item.business_area + '.svg'} alt={item.business_area} />
            <div className="flex-right">
              <p className="bg-yellow">{item.general_experience}+</p>
              <p className="salary">${item.salary}/hour</p>
            </div>
          </div>
          <div className="skills-icons">
            <h3 className="dark">Expert In</h3>
            <p className="skillsets">
              <img src={iconuri + item.technologies[0] + ','  + item.technologies[1] + ','  + item.technologies[2] + ','  + item.technologies[3] + ','  + item.technologies[4] + ','  + item.technologies[5]} className="skill-icon" alt={'skills'} /></p>
          </div>
        </div>
        <div>
          <div className="feature-desc">
            <p className="dark m-20">{item.summary}</p>
          </div>
        </div>
      </div>)
      setData(postData)
      setPageCount(Math.ceil(data.length / perPage))
  }
  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setOffset(selectedPage + 1)
}

useEffect(() => {
  getData()
}, [offset])

  return (
    <div className="feature-row">
      {data}
       <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  )
}

export default App999