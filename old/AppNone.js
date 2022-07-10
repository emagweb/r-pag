import React, {useState} from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Vacancies from './Vacancies'

const AppNone = () => {


  const [current,setCurrent] = useState(1)

  return (
    <BrowserRouter>

      <section className="page">
        <Routes>
          <Route path="/" element={<Vacancies page={current} />} />
          <Route path="/{current}" element={<Vacancies page={current} />} />
        </Routes>
        <div className="flex-center">
          <Link onClick={() => setCurrent(current - 1)} className="v-button" to={`/${current - 1}`}>Prev</Link>
          <Link onClick={() => setCurrent(current + 1)} className="v-button" to={`/${current + 1}`}>Next</Link>
        </div>
      </section>

    </BrowserRouter>
  )
}

export default AppNone