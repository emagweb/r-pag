import React from 'react'

const picuri = 'https://emagweb.github.io/sdev/icons/'
const iconuri = 'https://skillicons.dev/icons?i='

const Vacancies = ({vacancies, loading}) => {

  if(loading) {
      return <h3 className='feature-title'>Loading ...</h3>
  }

  return (
    <div className="feature-row">
      {
        vacancies.map((item,i) => (
          <div className="feature" key="i">
            <div>
              <h3 className="feature-title">{item.position.slice(0,48)}</h3>
              <div className="flex-row">
                <img className="flex-pic" src={picuri + item.business_area + '.svg'} alt={item.business_area} />
                <div className="flex-right">
                  <p className="bg-yellow">{item.general_experience}+ years</p>
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
        ))
      }
    </div>
    )

}

export default Vacancies