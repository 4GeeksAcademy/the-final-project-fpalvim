import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext";
import { Link } from "react-router-dom";
import Maps from "../common/Maps";
import axios from "axios";

function SearchPage() {

const { userTags, setUserTags } = useContext(MyContext);
const {users, searchQuery, setSearchQuery} = useContext(MyContext)
const loggedInProfile = localStorage.getItem("profileType")
const filteredUsers = users.filter((user) => user.profile_type !== loggedInProfile)
const queryProfile = filteredUsers.filter((profile) =>
profile.username.toLowerCase().includes(searchQuery.toLowerCase()));
const id = localStorage.getItem("userId")
const user = users.find(user => user.id === Number(id));

const handleSearch = (e) => {
const searchWord = e.target.value
setSearchQuery(searchWord)
}

useEffect(() => {
const fetchUserTagsById = async () => {
const response = await axios.get(`https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/user/${id}/tags`)
setUserTags(response.data)
    }
fetchUserTagsById()
}, [id, users]);

return (
<div className="search-page-container">
    <div className="search-bar p-3 d-flex align-items-center">
        <input className="search-bar-input w-75" id="searchBar" value={searchQuery} onChange={(e)=>handleSearch(e)}
        type="text" placeholder="Who are you looking for?"></input>
    </div>

    <div className="search-page-middle-wrapper  auto p-3">
        <Maps />
        <div className="search-page-middle-left-side">

            {queryProfile.map((filteredUser)=>(
            <div className="card-holder col auto mb-5"
                style={{zIndex: 4, position:"relative", top:"-150px", left:"50px"}}>
                <div key={filteredUser.id} className="card " style={{width: "300px", height:"450px",}}>
                    <img src={filteredUser.profile_picture} className="card-img-top" alt="..."></img>
                    <h5 className="band-title p-2">{filteredUser.username} </h5>
                    <div className="cardTop d-flex justify-content-center">
                        <div className="dropdown">
                            <button className="button-78 dropdown-toggle" role="button" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">genres</button>
                            <ul className="dropdown-menu">
                                <div className="d-flex justify-content-center">
                                    {userTags.map((utag) => (
                                    <div className="profile-page-tags-badge p-2 m-2" key={utag.tag_id}>
                                        <div className="">
                                            <span>{utag} </span>
                                        </div>
                                    </div>
                                    ))}
                                </div>

                            </ul>
                        </div>
                        <Link type="button" to={`/profilepage/${filteredUser.id}`}> <button className="button-78">visit
                        account</button></Link>
                    </div>
                    <div className="card-body ">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>

                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
    <div className="nav justify-content-center">
        <Link to={`/faqspage`} type="button" className="btn btn-link">FAQS</Link>
    </div>
</div>
);
}

export default SearchPage;