
import { services } from '../assets/data/services'
import ServiceCard from '../components/Services/ServiceCard'
import { useState } from 'react'

const Services = () => {
  const [data, setData] = useState([]);

  const addData = newData => {
    setData(prevData => [...prevData, newData])
  }
  return <section>
    <div className="container">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]'>
        {services.map((item, index) => (<ServiceCard key={index} item={item} index={index}/>))}
      </div>
    </div>
    </section>
}

export default Services