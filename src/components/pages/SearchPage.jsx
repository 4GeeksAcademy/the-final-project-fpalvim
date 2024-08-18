import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { Link } from "react-router-dom";
import Maps from "../common/Maps";

function SearchPage() {

    const {users, setUsers} = useContext(MyContext)
    const loggedInProfile = "band"
    const filteredUsers = users.filter((user) => user.profile_type !== loggedInProfile)
    
    return ( 
        <div className="search-page-container">
            <div className="search-bar p-3 d-flex align-items-center">
                <input className="search-bar-input w-75" type="text" placeholder="What are you looking for?"></input>
                <button><i className="bi bi-search"></i></button>
            </div>
            <div className="date-select p-3">
                <p>maybe a dropdown calendar here to filter by date</p>
            </div>
            <div>
                <div className="search-page-filters p-3 d-flex flex-column justify-content-between">
                    <label for="by-distance" className="form-label">By distance</label>
                        <select className="form-select w-45" name="" id="by-distance"></select>
                    <label for="by-tags" className="form-label">By tags</label>
                        <select className="form-select w-45" name="" id="by-tags"></select>
                </div>
            </div>
            <div className="search-page-middle-wrapper row p-3">
                <div className="search-page-middle-left-side col-lg-6 col-md-6 col-sm-12 ">
                    {filteredUsers.map((filteredUser)=>(
                    <div key={filteredUser.id} className="card my-2" style={{ width: "18rem" }}>
                        <img src={filteredUser.profile_picture} className="card-img-top" alt="..."></img>
                        <h5 className="band-title p-2">{filteredUser.username} </h5>
                        <div className="card-body ">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link type="button" to={`/profilepage/${filteredUser.id}`}><button className="visit-acc-button">visit account</button></Link>
                        </div>
                    </div> 
                     ))}
                </div>
                <div className="search-page-middle-right-side col-lg-5 col-md-5 col-sm-11  mx-3 p-2">
                    <Maps/>
                </div>
            </div>
            <div className="nav justify-content-center">
                    <button type="button" className="btn btn-link" onClick={() => navigate('/FaqsPage')}>FAQS</button>
                    <button type="button" className="btn btn-link" onClick={() => navigate('/FaqsPage')}>about us</button>
                    <button type="button" className="btn btn-link" onClick={() => navigate('/FaqsPage')}>contact</button>
                </div>
        </div>
     );
}

export default SearchPage;