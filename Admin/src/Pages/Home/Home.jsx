import React from 'react'
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
import { MdCurrencyRupee } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { SiCloudflareworkers } from "react-icons/si";
import './Home.css'

const Home = () => {
  return (
    <div className='home-page'>
        
        <div className="statics">
            <div className="number-static">
                <div className="finacial-statics">
                  <p>
                    <HiDocumentCurrencyRupee/>
                    <span>
                    Finacial Statics
                    </span>
                  </p>
                  <p>
                    <MdCurrencyRupee/> 450003
                  </p>
                </div>
                <div className="active-memebers">
                    <p>
                    <FaUsers/>
                    <span>
                    Active Clients
                    </span>
                  </p>
                  <p>
                     45
                  </p>
                </div>
                <div className="total-emp">
                  <p>
                    <SiCloudflareworkers/>
                    <span>
                    Total Employees
                    </span>
                  </p>
                  <p>
                    8
                  </p>
                </div>
            </div>
            <div className="members-chart">
                <h4>Users stat</h4>
                <div className="active-members-chart">
                  {/* //month to member graph */}
                </div>
            </div>
            <div className="other">

            </div>
        </div>
        <div className="event">
            <div className="attendece">

            </div>
        </div>
    </div>
  )
}

export default Home