import { useContext, createContext, useState } from "react";

export const symptomContext = createContext()

export const SymptomContextProvider = ({children}) => {
    const [data,setData] = useState([]);
    const addData = (newData) => {
        setData([...data,newData])
    }
    return <symptomContext.Provider value={{data,addData}}>{children}</symptomContext.Provider>
}


export const useSymtomContext = () => useContext(symptomContext);