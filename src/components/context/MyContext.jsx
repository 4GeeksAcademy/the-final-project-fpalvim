import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MyContext = createContext(null)

export const MyProvider = ({ children }) => {
    const [calDate, setCalDate] = useState()
    const [bands, setBands] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios.get("https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/bands")
            console.log(response.data);
            setBands(response.data)
        }
        fetchData()
    },[])

    return (
        <MyContext.Provider value={{calDate,setCalDate,bands,setBands}}>
            {children}
        </MyContext.Provider>
    )
}