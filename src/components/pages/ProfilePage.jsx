import { useContext, useEffect } from "react";
import ShowCalendar from "../common/ShowCalendar";
import { MyContext } from "../context/MyContext";
import { useParams } from "react-router-dom";
import React from 'react';


function ProfilePage() {

    const {users, setUsers} = useContext(MyContext)
    const { id } = useParams()
    

    return ( 
        <div className="profile-page-container">
            <div className="user-band-venue-title d-flex justify-content-start mt-5 mb-4 mx-3">
                <div>
                    {
                        users.map((user)=> user.id == id ? (
                            <h1 key={user.id}>{user.username}</h1>
                        ) : null)
                    }
                </div>
            </div>
            <div className="profile-page-top">
                <div className="profile-page-top">
                    {
                        users.map((user)=> user.id == id ? (
                            <img key={user.id} className="profile-page-img-container mb-4" src={user.profile_picture} alt=""></img>
                        ) : null)
                    }
                </div>
                {/* <img className="profile-page-img-container mb-4" src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2013/07/237499-metallica-cines-11-octubre.jpg?tf=1200x" alt="" /> */}
            </div>
            <div div className="profile-page-middle d-flex flex-wrap row">
                <div className="profile-page-middle-images-container col-lg-9 col-md-8 col-sm-12">
                    <img className="profile-picuteres" src="https://picsum.photos/200" alt="" />
                    <img className="profile-picuteres" src="https://picsum.photos/200" alt="" />
                    <img className="profile-picuteres" src="https://picsum.photos/200" alt="" />
                </div>
                <div className="profile-page-middle-calendar col-lg-2 col-md-4 col-sm-12">
                    <ShowCalendar/>
                </div>
            </div>
            <div className="soundtrack-icons mx-4 mt-2 d-flex justify-content-between flex-wrap">
                <i className="bi bi-music-note-beamed fs-2"></i>
                <i className="bi bi-music-note-beamed fs-2"></i>
            </div>
            <div className="profile-page-middle-below d-flex flex-wrap mx-4 mt-2">
                <div className="profile-page-middle-below-details-text-box col-lg-9 col-md-8 col-sm-12">
                    <p>We believe in produce. Tasty produce. Produce like:</p> <br />
                    <p>Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants. Asparagus. Artichokes-Jerusalem artichokes, too. Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill. </p>
                </div>
                <div className="profile-page-middle-below-right-side d-flex flex-row col-lg-3 col-md-4 col-sm-12 mt-3 mt-md-0">
                    <div className="profile-page-middle-below-right-side-about border border-2 rounded-4 mx-2 mb-3">
                        <p>specific details about the venue or band</p>
                    </div>
                    <div className="profile-page-middle-below-right-side-genre border border-2 rounded-4 mx-2">
                        <p>details about the genre of band or venue</p>
                    </div>
                </div>
            </div>
            <div className="profile-page-bottom d-flex flex-wrap p-5">
           
                <div className="profile-page-bottom-center-box col-lg-3 col-md-4 col-sm-12 border border-2 rounded-4 mx-5 mb-3 mb-lg-0">
                    <p>text here</p>
                </div>
                <div className="profile-page-bottom-right-box col-lg-4 col-md-12 col-sm-12">
                    <div className="profile-page-bottom-social-media-container d-flex justify-content-end mx-4 mt-3 mt-lg-0">
                        <i className="bi bi-music-note-beamed fs-2 mx-3"></i>
                        <i className="bi bi-music-note-beamed fs-2 mx-3"></i>
                        <i className="bi bi-music-note-beamed fs-2 mx-3"></i>
                    </div>
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

export default ProfilePage;