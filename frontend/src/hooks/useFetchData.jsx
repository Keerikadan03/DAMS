import { useEffect,useState } from 'react'
import { token } from '../config'
import { toast } from 'react-toastify'

const useFetchdata = (url) => {

    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try{
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    
                const result = await response.json();
    
                if(!response.ok){
                    // return toast.error(result.message)
                    throw new Error(result.message)
                }

                setData(result.data)
                setLoading(false)
            }catch(e){
                setLoading(false)
                setError(e.message)
                console.log("error at fetching data hook is => ", e)
            }
        }

        fetchData()
    },[url])
  return { data, loading, error}
}

export default useFetchdata