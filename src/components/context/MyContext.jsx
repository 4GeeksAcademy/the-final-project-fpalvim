import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MyContext = createContext(null)

export const MyProvider = ({ children }) => {

    const [calDate, setCalDate] = useState()
    const [bands, setBands] = useState([])
    const [venues, setVenues] = useState([])
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isActive, setIsActive] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [userTags, setUserTags] = useState([])
    const [reviews, setReviews] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState([])
    const [formattedTags, setFormattedTags] = useState([])
    const [images, setImages] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [userData, setUserData] = useState(null)
    
    const openModal = (title, message) => {
        setModalContent({ title, message });
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setModalContent({ title: '', message: '' });
    };
    useEffect(()=>{
        const fetchUsers = async () => {
            const response = await axios.get("https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/users")

            setUsers(response.data)
            console.log(response.data);
        }
        const fetchTags = async () => {
            const response = await axios.get("https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/tags")
            const tagOptions = response.data.map(tag => (
                tag.style_tag
            ))
            
            setTags(tagOptions)
        }
      
        fetchUsers()
        fetchTags()
        
    },[])
    return (
        <MyContext.Provider value={{calDate, setCalDate,
                                    bands, setBands,
                                    venues, setVenues,
                                    users, setUsers,
                                    email, setEmail,
                                    username, setUsername,
                                    password, setPassword,
                                    isActive, setIsActive,
                                    description, setDescription,
                                    tags, setTags,
                                    address, setAddress,
                                    phoneNumber, setPhoneNumber,
                                    profilePicture, setProfilePicture,
                                    userTags, setUserTags,
                                    reviews, setReviews,
                                    searchQuery, setSearchQuery,
                                    selectedTags, setSelectedTags,
                                    formattedTags, setFormattedTags,
                                    images, setImages,
                                    userData, setUserData
                                    }}>
            {children}
        </MyContext.Provider>
    )
}