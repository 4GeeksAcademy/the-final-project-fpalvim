import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import MapSearchBar from "./MapSearchBar";
import Select from "react-select";
import axios from "axios";


function Navbar() {
    const { users, tags, userTags, id, selectedTags, setSelectedTags, formattedTags, setFormattedTags, images } = useContext(MyContext);
    const [photos, setPhotos] = useState([]);
    const [imgPreview, setImagePreview] = useState();
    const filteredUser = users.filter(user => user.id == id);

    useEffect(() => {
        if (Array.isArray(tags)) {
            const formatted = tags.map(tag => ({
                value: tag,
                label: tag.charAt(0).toUpperCase() + tag.slice(1)
            }));
            setFormattedTags(formatted);

            if (userTags.length > 0) {
                const initialSelectedTags = userTags.map(utag => {
                    const matchingTag = formatted.find(tag => tag.value === utag);
                    return matchingTag || { value: utag, label: utag };
                });
                setSelectedTags(initialSelectedTags);
            }
        } else {
            console.error("Expected 'tags' to be an array, but got:", typeof tags);
        }
    }, [tags, userTags]);

    const handleChange = (selectedOptions) => {
        setSelectedTags(selectedOptions || []);
    }


    function imagePreview(e){
        setImagePreview(document.getElementById("inputFilePath").value)
        return(
            <div>
                <img src="" alt="" />
            </div>
        )
    }     
    

    const handlePhotos = () => {

        const url = `https://super-duper-fortnight-7gvwxjxgjj7fr957-8787.app.github.dev/photos/${id}`;
        
        const formInputData = {
            filename: document.getElementById("inputFileName").value,
            filepath: document.getElementById("inputFilePath").value
        }


        axios.post(url, formInputData)
            .then(response => {
                alert("Photo uploaded successfully.");
            })
            .catch(error => {
                console.error("Error:", error.response ? error.response.data : error.message);
                alert("Error: Unable to upload photo, try again.");
            });

    }

    const handleSubmit = () => {
        const selectedTagValues = selectedTags.map(tag => tag.value);
        const url = `https://super-duper-fortnight-7gvwxjxgjj7fr957-8787.app.github.dev/user/${id}`;

        const currentUserAddress = filteredUser.length > 0 ? filteredUser[0].address : '';
        const newAddress = document.getElementById("inputAddress2").value;
        const addressToSubmit = newAddress.trim() === '' ? currentUserAddress : newAddress;

        const formInputData = {
            email_address: document.getElementById("inputEmail4").value,
            username: document.getElementById("inputUsername").value,
            profile_picture: document.getElementById("inputProfilePicture").value,
            description: document.getElementById("inputDescription").value,
            tags: selectedTagValues,
            phone_number: document.getElementById("inputPhoneNumber").value,
            address: addressToSubmit,
            spotify_url: document.getElementById("inputSpotifyProfile").value,
            youtube_url: document.getElementById("inputYoutubeProfile").value,
            facebook_url: document.getElementById("inputFacebookProfile").value,
            instagram_url: document.getElementById("inputInstagramProfile").value
        };

        axios.put(url, formInputData)
            .then(response => {
                alert("Account edited successfully.");
            })
            .catch(error => {
                console.error("Error:", error.response ? error.response.data : error.message);
                alert("Error: Unable to edit account, try again.");
            });
    };

    // const handleFileUpload = async (event) => {
    //     const file = event.target.files[0];
    //     if (!file) return;
    
    //     setNewPhotos([...newPhotos, file]);
    // };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="#" className="navbar-brand"><i className="bi bi-music-note-beamed fs-2"></i></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <Link to="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                My profile
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link to="profilepage" className="dropdown-item">My profile</Link></li>
                                <li><Link to="" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#editModal">Edit profile</Link></li>
                                <li><Link to="" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#galleryModal">Gallery</Link></li>
                                <li><Link to="searchpage" className="dropdown-item">Start connecting</Link></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li><Link to="loginpage" className="dropdown-item">Log out</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* Edit Profile Modal */}
                {filteredUser.map((user) => (
                    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true" key={user.id}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="editModalLabel">Edit profile</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                                            <input type="email" defaultValue={user.email_address} className="form-control" id="inputEmail4"></input>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="inputPassword4"></input>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputUsername" className="form-label">Band or Venue Name</label>
                                            <input type="text" className="form-control" defaultValue={user.username} id="inputUsername" placeholder="The Three Musketeers"></input>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputProfilePicture" className="form-label">URL of the profile picture</label>
                                            <input type="text" className="form-control" defaultValue={user.profile_picture} id="inputProfilePicture" placeholder="E.g. https://www.instagram.com/metallica/?hl=en"></input>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputSpotifyProfile" className="form-label">Spotify</label>
                                            <input type="text" className="form-control" defaultValue={user.spotify_url} id="inputSpotifyProfile" placeholder="Paste the url of your profile here"></input>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputYoutubeProfile" className="form-label">Youtube</label>
                                            <input type="text" className="form-control" defaultValue={user.youtube_url} id="inputYoutubeProfile" placeholder="Paste the url of your profile here"></input>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputFacebookProfile" className="form-label">Facebook</label>
                                            <input type="text" className="form-control" defaultValue={user.facebook_url} id="inputFacebookProfile" placeholder="Paste the url of your profile here"></input>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputInstagramProfile" className="form-label">Instagram</label>
                                            <input type="text" className="form-control" defaultValue={user.instagram_url} id="inputInstagramProfile" placeholder="Paste the url of your profile here"></input>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text">Description</span>
                                            <textarea className="form-control" aria-label="With textarea" defaultValue={user.description} id="inputDescription" placeholder="Description goes here. Be creative..."></textarea>
                                        </div>
                                        <div className="edit-profile-checkboxes d-flex">
                                            <Select
                                                isMulti
                                                options={formattedTags}
                                                value={selectedTags}
                                                onChange={handleChange}
                                                placeholder="Select multiple options"
                                                id="selectTagsInfo"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <div className="container-current-address border border-solid border-3 border-gray px-2 rounded">
                                                <p className="navbar-current-address-title mb-0"><small><strong>Your current address:</strong></small></p>
                                                <p><small>{user.address}</small></p>
                                            </div>
                                            <label htmlFor="inputAddress2" className="form-label">Address</label>
                                            <MapSearchBar />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputPhoneNumber" className="form-label">Phone Number</label>
                                            <input type="text" className="form-control" defaultValue={user.phone_number} id="inputPhoneNumber" placeholder="888-333-0000"></input>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer"></div>
                            </div>
                        </div>
                    </div>
                ))}
{/* GALLERY MODAL */}
                <div className="modal fade" id="galleryModal" tabIndex="-1" aria-labelledby="galleryModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="galleryModalLabel">Gallery</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text">Image URL</span>
                                    <input className="form-control" aria-label="With textarea" id="inputFilePath"></input>
                                </div>
                                </div>
                                <div className="mb-3">
                                <div className="input-group mb-2">
                                    <span className="input-group-text">Image title</span>
                                    <input className="form-control" aria-label="With textarea" id="inputFileName" placeholder="Give a title to your image if you want"></input>
                                </div>
                                <hr class="border border-danger border-2 opacity-50"></hr>
                                <div className="modal-middle">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-secondary" onClick={imagePreview}>Preview photo</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handlePhotos}>Save Changes</button>
                                </div>
                                </div>
                                <hr class="border border-danger border-2 opacity-50"></hr>
                                <div>
                                    <h6>Preview photo:</h6>
                                    <img src={imgPreview} alt="" />
                                </div>
                                <hr class="border border-danger border-2 opacity-50"></hr>
                                <div className="row">
                                    <h6>Existent photos:</h6>
                                    {
                                        images.map((image)=>(
                                            <img src={image.filepath} alt="" />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
