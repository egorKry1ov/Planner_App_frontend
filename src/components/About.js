import React from 'react'
import { Link} from 'react-router-dom';

function About() {
  return (
    <div className='background'>

      <section className=" firstsection">
          <div className="box-main">
              <div className="firstHalf">
                  <p className="text-big">About E-Planner</p>
                    
                  <p className="text-small">
                      Plan your day accordingly with E-Planner. From events and meetings to appoitment schedruling.
                  </p>
                  <br/>
                  <span className="center-link"><Link to="/login" Login 
                    style={{textDecoration: 'none', color:"black"}}>Login 
                    </Link> 
                  </span>
              </div>
          </div>
      </section>
    </div>
  )
}

export default About