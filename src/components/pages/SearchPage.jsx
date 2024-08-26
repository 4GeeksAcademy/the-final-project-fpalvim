import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { Link } from "react-router-dom";
import Maps from "../common/Maps";

function SearchPage() {

    const {users, setUsers} = useContext(MyContext)
    const loggedInProfile = "venue"
    const filteredUsers = users.filter((user) => user.profile_type !== loggedInProfile)
    
    return ( 
        <div className="search-page-container">
            <div className="search-bar p-3 d-flex align-items-center">
                <input className="search-bar-input w-75" type="text" placeholder="What are you looking for?"></input>
                <button><i className="bi bi-search"></i></button>
            </div>
        
            <div className="search-page-middle-wrapper  auto p-3">
            <Maps/>
                <div className="search-page-middle-left-side">
                
                    {filteredUsers.map((filteredUser)=>(
                        <div className="card-holder col auto mb-5" style={{zIndex: 4, position:"relative", top:"-150px", left:"50px"}}>
                    <div key={filteredUser.id} className="card " style={{width: "300px", height:"450px",}}>
                        <img src={filteredUser.profile_picture} className="card-img-top" alt="..."></img>
                        <h5 className="band-title p-2">{filteredUser.username} </h5>
                        <div className="card-body ">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link type="button" to={`/profilepage/${filteredUser.id}`}><button className="visit-acc-button">visit account</button></Link>
                        </div>
                    </div> 
                    </div>
                     ))}
                </div>
                
                    <div className=" text-center">
                        <h1 className="">hellp</h1>
                        
                    
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="nav justify-content-center">
                    <button type="button" className="btn btn-link" onClick={() => navigate('/FaqsPage')}>FAQS</button>
                    <button type="button" className="btn btn-link" onClick={() => navigate('/FaqsPage')}>about us</button>
                    <button type="button" className="btn btn-link" onClick={() => navigate('/FaqsPage')}>contact</button>
                </div>
        </div>
     );
}

export default SearchPage;