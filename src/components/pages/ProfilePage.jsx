import React, { useContext, useEffect, useState, useRef } from "react";
import ShowCalendar from "../common/ShowCalendar";
import { MyContext } from "../context/MyContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import ShowCalendarBlocked from "../common/ShowCalendarBlocked";

function ProfilePage() {
  const { users, comments, setComments, userTags, setUserTags, images, setImages, userData } = useContext(MyContext);
  const { id } = useParams()
  // const { user } = useAuth()
  const [currentComment, setCurrentComment] = useState(null);
  const [availabilityDates, setAvailabilityDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const user = users.find(user => user.id === Number(id));
  const spotifyLinkFromDb = users.find(user => user.id == id)?.spotify_url
  const modifiedSpotifyProfileLink = spotifyLinkFromDb ? spotifyLinkFromDb.replace("spotify.com/", "spotify.com/embed/") : null;
    console.log(id)

  useEffect(() => {
    const fetchUserTagsById = async () => {
      const response = await axios.get(`https://didactic-capybara-7v7r7g6p7jx43p5wg-8787.app.github.dev/user/${id}/tags`)
      // console.log(response.data);
      setUserTags(response.data)
    }
    const fetchGallery = async () => {
          const response = await axios.get(`https://didactic-capybara-7v7r7g6p7jx43p5wg-8787.app.github.dev/user/${id}/photos`)
          // console.log(response.data);
          setImages(response.data)
    }
    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`https://didactic-capybara-7v7r7g6p7jx43p5wg-8787.app.github.dev/dates/availability/${id}`);
            const fetchedDates = response.data.map(date => format(new Date(date.date), 'yyyy-MM-dd'));
            setAvailabilityDates(fetchedDates);
            setSelectedDates(fetchedDates);
            const commentResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
            setComments(commentResponse.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };
    fetchProfileData();
    fetchUserTagsById()
    fetchGallery()
}, [id, users]);

   useEffect(() => {
      const randomComment = () => {
          const randomIndex = Math.floor(Math.random() * comments.length);
          setCurrentComment(comments[randomIndex]);
      };
      const time = setInterval(() => {
          randomComment();
      }, 5000);

      randomComment();

      return () => clearInterval(time);
  }, [comments]);

  const handleConfirmDates = (newDates = [], removeDates = []) => {
    const formattedNewDates = newDates.map(date => format(new Date(date), 'yyyy-MM-dd'));
    const formattedRemoveDates = removeDates.map(date => format(new Date(date), 'yyyy-MM-dd'));
    axios.put(`https://didactic-capybara-7v7r7g6p7jx43p5wg-8787.app.github.dev/dates/availability/${id}`, {
        dates: formattedNewDates,
        remove_dates: formattedRemoveDates
    })
    .then(() => {
        setAvailabilityDates(prevDates => {
            const newDatesSet = new Set([...prevDates, ...formattedNewDates]);
            formattedRemoveDates.forEach(date => newDatesSet.delete(date));
            return Array.from(newDatesSet);
        });
        alert("Availability dates updated successfully!");
    })
    .catch(() => {
        alert("Error: Unable to update dates, try again.");
    });
};


  const handleCommentChange = (event) => {
      setNewComment(event.target.value);
  };

  const handleSubmit = () => {
      if (!newComment.trim()) {
          alert("Comment cannot be empty!");
          return;
      }

      axios.post('https://jsonplaceholder.typicode.com/comments', {
          postId: id,
          name: 'New Commenter',
          email: 'newcommenter@example.com',
          body: newComment
      })
      .then(() => {
          setNewComment('');
          alert("Comment added successfully!");
      })
      .catch(() => {
          alert("Error: Unable to add comment, try again.");
      });
  };

  return (
    <div id="profile-container" className="container-fluid text-center">
      <div className="row align-items-start">
        <div className="col-md" id="left-column">
          <h1  style={{ color: "white" }}>Your introduction</h1>
          <div>
            {users.map((user) =>
              user.id == id ? (
                <img
                  key={user.id}
                  className="profilepic"
                  src={user.profile_picture}
                  alt=""
                ></img>
              ) : null
            )}
          </div>
          <br />
          <div>
            <div>
              {users.map((user) =>
                user.id == id ? <h1 key={user.id}>{user.username}</h1> : null
              )}
            </div>
            <br />
            <br />
            
            <div className="tagsdiv ">
            <h4>genres</h4>
            <div className="d-flex justify-content-center">
                {userTags.map((utag) => (
                    <div className="profile-page-tags-badge m-2" key={utag.tag_id}>
                        <div className="">
                          <span>{utag} </span> 
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <br />
            <br />
            <div className="biodiv">
            <h1>Our bio</h1>
              <div className="input-group">
                {users.map((user) =>
                  user.id == id ? <h4 key={user.id}>{user.description}</h4> : null
                )}
              </div>
            </div>
          </div>
          
        </div>
        <div className="col-md " id="middle-column">
          <div className="">
           <h1 style={{ color: "white" }}> Showcase Area</h1>
           <div className="topdiv-middle">
              <div>
                {
                modifiedSpotifyProfileLink ? (
                <iframe
                src={modifiedSpotifyProfileLink}
                  width="100%"
                  height="360"
                  frameborder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                  data-gtm-yt-inspected-6="true"
                ></iframe> ) : (<div><h5 style={{ color: "white" }}>Sorry, I dont have a Spotify profile! <i className="bi bi-emoji-frown-fill"></i></h5></div>)
              }
              </div>
            </div>
            <div className="middiv-middle">
              <h1>our work</h1>
              
            
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
              {images.map((image)=> (
                <div>
                  <div className="carousel-item-active " data-bs-interval="2000">
                    <img src={image.filepath} className="d-block w-100" alt="..."></img>
                  </div>
                </div>
              ) )}
              </div>
            
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            </div>
            <div className="botdiv-middle ">
            <h1>socials</h1>
            <div className="">
              {users.map((user)=> user.id == id ? (
                <div key={user.id}>
                <Link target="_blank" to={user.spotify_url}><i id="spotify-icon" className="bi bi-spotify"></i></Link>
                <Link target="_blank" to={user.youtube_url}><i id="youtube-icon" className="bi bi-youtube"></i></Link>
                <Link target="_blank" to={user.facebook_url}><i id="facebook-icon" className="bi bi-facebook"></i></Link>
                <Link target="_blank" to={user.instagram_url}><i id="instagram-icon" className="bi bi-instagram"></i></Link>
                </div>
              ) : null)}
            </div>
            </div>
          </div>
        </div>
        <div className="col-md " id="right-column">
          <div>
                <h1 style={{ color: "white" }}>Where the connection happens</h1>
                <div className="topdiv-right">
          <div className="calendar-container d-flex">
            {userData.id === Number(id) ? (<ShowCalendar
                                selectedDates={availabilityDates}
                                onConfirmDates={handleConfirmDates}
                            />): <ShowCalendarBlocked
                                selectedDates={availabilityDates}
                                onConfirmDates={handleConfirmDates}/>}
                                <div className="p-2 d-flex flex-column ">
                            <label className="dateSaver">
                              want to set up a date? ;)
                             
                            </label>
                            <select className="selectedDate">
                              {availabilityDates.slice().sort().map((date) => (
                                <option key={date} value={date}>
                                  {date}
                                </option>
                              ))}
                            </select>
                            <button className="button-78">hit me up</button>
                            </div>
                        </div>
           </div>
          <div className="middiv-right">
            <h1>reviews</h1>
            <div>
                        {currentComment ? (
                            <div key={currentComment.id}>
                                <p><strong>{currentComment.name}</strong></p>
                                <p>{currentComment.body}</p>
                            </div>
                        ) : null}
                    </div>
          </div>
         
          <div className="botdiv-right">
          <h1>contact info</h1>
              {users.map((user) =>
                user.id == id ? (
                  <div key={user.id}>
                    <h3>phone number:</h3>
                    <h6>{user.phone_number}</h6>
                    <h3>adress:</h3>
                    <h6>{user.address}</h6>
                    <h3>e-mail address:</h3>
                    <h6>{user.email_address}</h6>
                  </div>
                ) : null
              )}
          </div>
          
        </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="nav justify-content-center">
                    <button type="button" className="btn btn-link" onClick={() => navigate('/faqspage')}>FAQS</button>
                    <button type="button" className="btn btn-link" onClick={() => navigate('/FaqsPage')}>about us</button>
                    <button type="button" className="btn btn-link" onClick={() => navigate('/FaqsPage')}>contact</button>
                </div>
    </div>
  );
}

export default ProfilePage;
