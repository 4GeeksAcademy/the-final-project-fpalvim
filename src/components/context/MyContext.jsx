import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MyContext = createContext(null)

export const MyProvider = ({ children }) => {
    const [calDate, setCalDate] = useState()
    const [bands, setBands] = useState([])
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isActive, setIsActive] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [profileType, setProfileType] = useState("band")

    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get("https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/bands")
            console.log(response.data);
            setBands(response.data)
        }
        fetchData()
    },[])

    return (
        <MyContext.Provider value={{calDate, setCalDate,
                                    bands, setBands,
                                    email, setEmail,
                                    userName, setUserName,
                                    password, setPassword,
                                    isActive, setIsActive,
                                    description, setDescription,
                                    tags, setTags,
                                    address, setAddress,
                                    phoneNumber, setPhoneNumber,
                                    profilePicture, setProfilePicture,
                                    profileType, setProfileType
                                    }}>
            {children}
        </MyContext.Provider>
    )
}