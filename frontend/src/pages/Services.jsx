
import { services } from '../assets/data/services'
import ServiceCard from '../components/Services/ServiceCard'
import Specialisations from '../components/Specialisations/Specialisations'
import SymptomSearch from '../components/Symptoms/SymptomSearch'
import { symptoms } from '../components/Symptoms/Symptoms'
import { symptomContext } from '../context/SymptomContext'
import { useState } from 'react'

const Services = () => {
  const [data, setData] = useState([]);

  const addData = newData => {
    setData(prevData => [...prevData, newData])
  }
  return <section>
    <div className="container">
      <symptomContext.Provider value={{data,addData}}>
        <SymptomSearch database={symptoms}/>
        <hr />
        <Specialisations />
      </symptomContext.Provider>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]'>
        {services.map((item, index) => (<ServiceCard key={index} item={item} index={index}/>))}
      </div>
    </div>
    </section>
}

export default Services