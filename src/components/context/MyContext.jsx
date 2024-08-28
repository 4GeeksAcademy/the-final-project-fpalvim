import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Image, CloudinaryContext } from 'cloudinary-react';

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
    const [userTags, setUserTags] = useState([])
    const [comments, setComments] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState([])
    const [formattedTags, setFormattedTags] = useState([])
    const [images, setImages] = useState([])
        
    const id = 1
    
    useEffect(()=>{
        const fetchUsers = async () => {
            const response = await axios.get("https://super-duper-fortnight-7gvwxjxgjj7fr957-8787.app.github.dev/users")
            // console.log(response.data);
            setUsers(response.data)
        }

        const fetchTags = async () => {
            const response = await axios.get("https://super-duper-fortnight-7gvwxjxgjj7fr957-8787.app.github.dev/tags")
            const tagOptions = response.data.map(tag => (
                tag.style_tag
            ))
            // console.log(response.data);
            setTags(tagOptions)
        }

        const fetchUserTagsById = async () => {
            const response = await axios.get(`https://super-duper-fortnight-7gvwxjxgjj7fr957-8787.app.github.dev/user/${id}/tags`)
            // console.log(response.data);
            setUserTags(response.data)
        }

        const fetchComments = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments`)
            // console.log(response.data);
            setComments(response.data)
        }

        const fetchGallery = async () => {
            const response = await axios.get(`https://super-duper-fortnight-7gvwxjxgjj7fr957-8787.app.github.dev//user/${id}/photos`)
            // console.log(response.data);
            setImages(response.data)
        }
        
        fetchUsers()
        fetchTags()
        fetchUserTagsById()
        fetchComments()
        fetchGallery()
        
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
                                    profileType, setProfileType,
                                    userTags, setUserTags,
                                    comments, setComments,
                                    searchQuery, setSearchQuery,
                                    selectedTags, setSelectedTags,
                                    formattedTags, setFormattedTags,
                                    images, setImages,
                                    id
                                    }}>
            {children}
        </MyContext.Provider>
    )
}