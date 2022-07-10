import React, { useEffect, useState } from "react";
//import axios from 'axios'

//import { Pagination } from "react-custom-pagination";

const App4 = () => {

  const picuri = 'https://emagweb.github.io/sdev/icons/'

  const iconuri = 'https://skillicons.dev/icons?i='

  const [data, setData] = useState([]);

  const getVacancies = async () => {
     try {
      const response = await fetch('https://backoffice.pogovorimo.com.ua/api/v1/applicant/');
      const json = await response.json();
      console.log(json)
      setData(json.results);
    } catch (error) {
      console.error(error);
    } 
  }

  useEffect(() => {
    getVacancies();
  }, []);

  
  return (

    <section className="page">
      <div className="features">
        <h3 className="section__title serv">Your Future Tech Team</h3>
        <p className="subtitle__text serv">
          The Best Remote Developers In The Ukraine
        </p>
        <div className="feature-row">
          {data.map((item, index) =>  (
            <div className="feature" key={index}>
              <div>
                <h3 className="feature-title">{item.position.slice(0,48)}</h3>
                <div className="flex-row">
                  <img className="flex-pic" src={picuri + (item.business_area !== '' ? (item.business_area + '.svg') : 'software.svg') } alt={item.business_area} />
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
            </div>
          ))}
        </div>
      </div>
    </section>

  )

}

export default App4
