import { createContext, useEffect, useState } from "react";

export const MyContext = createContext(null)

export const MyProvider = ({ children }) => {
    const [calDate, setCalDate] = useState()
    const [bands, setBands] = useState([])

    return (
        <MyContext.Provider value={{calDate,setCalDate,bands,setBands}}>
            {children}
        </MyContext.Provider>
    )
}