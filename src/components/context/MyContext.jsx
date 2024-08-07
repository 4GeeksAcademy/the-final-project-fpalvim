import { createContext, useState } from "react";

export const MyContext = createContext(null)

export const MyProvider = ({ children }) => {
    const [calDate, setCalDate] = useState()

    return (
        <MyContext.Provider value={{calDate,setCalDate}}>
            {children}
        </MyContext.Provider>
    )
}