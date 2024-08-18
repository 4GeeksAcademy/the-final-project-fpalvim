import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MyContext = createContext(null)

export const MyProvider = ({ children }) => {
    const [calDate, setCalDate] = useState()
    const [bands, setBands] = useState([])
    const [venues, setVenues] = useState([])
    const [users, setUsers] = useState([])
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
        const fetchUsers = async () => {
            const response = await axios.get("https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/users")
            console.log(response.data);
            setUsers(response.data)
        }
        
        fetchUsers()
    },[])

    return (
        <MyContext.Provider value={{calDate, setCalDate,
                                    bands, setBands,
                                    venues, setVenues,
                                    users, setUsers,
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