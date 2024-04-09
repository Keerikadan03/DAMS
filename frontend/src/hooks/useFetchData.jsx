import { useEffect,useState } from 'react'
import { token } from '../config'

const useFetchdata = (url) => {

    const [data,setData] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    
                const result = await response.json();
    
                if(!response.ok){
                    throw new Error(result.message)
                }

                setData(result.data)
            }catch(e){
                console.log("error at fetching data hook is => ", e)
            }
        }

        fetchData()
    },[url])
  return { data}
}
export default useFetchdata