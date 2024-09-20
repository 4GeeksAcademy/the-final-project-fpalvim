import React, { useContext, useEffect, useState, useRef } from "react";
import ShowCalendar from "../common/ShowCalendar";
import { MyContext } from "../context/MyContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import ShowCalendarBlocked from "../common/ShowCalendarBlocked";

function ProfilePage() {
const { users, reviews, setReviews, userTags, setUserTags, images, setImages } = useContext(MyContext);
const { id } = useParams()
const [currentReview, setCurrentReview] = useState(null);
const [availabilityDates, setAvailabilityDates] = useState([]);
const [selectedDates, setSelectedDates] = useState([]);
const [newReview, setNewReview] = useState('');
const navigate = useNavigate();
const user = users.find(user => user.id === Number(id));
const spotifyLinkFromDb = users.find(user => user.id == id)?.spotify_url
const modifiedSpotifyProfileLink = spotifyLinkFromDb ? spotifyLinkFromDb.replace("spotify.com/", "spotify.com/embed/") : null;
const [currentImage, setCurrentImage] = useState(0);
const [selectedDateToSendMessage, setSelectedDateToSendMessage] = useState('');
const [message, setMessage] = useState('');
const inputReviewerId = localStorage.getItem("userId")
const [showReviewForm, setShowReviewForm] = useState(false);

useEffect(() => {
  axios.get('/reviews')
    .then(response => {
      const userReviews = response.data.filter(review => review.reviewee_id == Number(id));
      
      setReviews(userReviews);
    })
    .catch(error => {
      console.error('There was an error fetching the reviews!', error);
    });
}, [id, setReviews]);

const getMailtoLink = () => { 
  const email = users.find(user=> user.id == Number(id))?.email_address
  const subject = encodeURIComponent(selectedDateToSendMessage);
  const body = encodeURIComponent(message);
  return `mailto:${email}?subject=${subject}&body=${body}`;
};

const handleDateChange = (event) => {
  setSelectedDateToSendMessage(event.target.value);
};

useEffect(() => {
const fetchUserTagsById = async () => {
  const response = await axios.get(`https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/user/${id}/tags`)
  
  setUserTags(response.data)
}
const fetchGallery = async () => {
      const response = await axios.get(`https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/user/${id}/photos`)
      
      setImages(response.data)
}

const fetchProfileData = async () => {
    try {
        const response = await axios.get(`https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/dates/availability/${id}`);
        const fetchedDates = response.data.map(date => format(new Date(date.date), 'yyyy-MM-dd'));
        setAvailabilityDates(fetchedDates);
        setSelectedDates(fetchedDates);
        const reviewsResponse = await axios.get('https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/reviews');            
        const userReviews = reviewsResponse.data.filter(review => review.reviewee_id === Number(id));
        setReviews(userReviews);
        
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
};
fetchProfileData();
fetchUserTagsById()
fetchGallery()
}, [id, users]);


useEffect(() => {
  if (images.length === 0) return; 

  const randomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
  };

  randomImage(); 
  const interval = setInterval(randomImage, 5000);

  return () => clearInterval(interval); 
}, [images]);


useEffect(() => {
  const randomReview = () => {
      const randomIndex = Math.floor(Math.random() * reviews.length);
      setCurrentReview(reviews[randomIndex]);
  };
  const time = setInterval(() => {
      randomReview();
  }, 2000);

  randomReview();

  return () => clearInterval(time);
}, [reviews]);

const handleConfirmDates = (newDates = [], removeDates = []) => {
const formattedNewDates = newDates.map(date => format(new Date(date), 'yyyy-MM-dd'));
const formattedRemoveDates = removeDates.map(date => format(new Date(date), 'yyyy-MM-dd'));
axios.put(`https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/dates/availability/${id}`, {
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


const handleReviewChange = (event) => {
  setNewReview(event.target.value);
};

const handleSubmitReview = () => {
  if (!newReview.trim()) {
    alert("Review cannot be empty!");
    return;
}



axios.post('https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/reviews', {
  reviewer_id: inputReviewerId,
  reviewee_id: id,  
  comment: newReview
})
  .then(response => {
    setNewReview(''); 
    setShowReviewForm(false); // Hide the form after submission
    alert("Review added successfully!");
    setReviews(prevReviews => [...prevReviews, response.data]);
  })

  .catch(error => {
    console.error('Error posting the review:', error);
    alert("Error: Unable to add review, try again.");
  });
};

  return (
  <div id="profile-container" className="text-center">
    <div className="row align-items-start">
      <div className="col-md  d-flex" id="left-column">
        <div></div>
        <h1 style={{ color: "white" }}>Your introduction</h1>
        <div className="container-left-column">
          <div>
            {users.map((user) =>
            user.id == id ? (
            <img key={user.id} className="profilepic" src={user.profile_picture} alt=""></img>
            ) : null
            )}
          </div>
          <br />
          <div className="left-side-container d-flex flex-column justify-content-center align-itens-center">
            <div>
              {users.map((user) =>
              user.id == id ? <h1 key={user.id}>{user.username}</h1> : null
              )}
            </div>
            <br />
            <br />

            <div className="tagsdiv">
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
                user.id == Number(id) ? <h4 key={user.id}>{user.description}</h4> : null
                )}
              </div>
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
              <iframe src={modifiedSpotifyProfileLink} width="100%" height="360" frameborder="0"
                allowtransparency="true" allow="encrypted-media" data-gtm-yt-inspected-6="true"></iframe> ) : (<div>
                <h5 style={{ color: "white" }}>Sorry, I dont have a Spotify profile! <i
                    className="bi bi-emoji-frown-fill"></i></h5>
              </div>)
              }
            </div>
          </div>
          <div className="middiv-middle">
            <div className="container-images-gallery">
              <div className="container-images-gallery-title">
                <h1>our work</h1>
              </div>
              <div className="container-images-gallery-photos">
                <div className="images-gallery-item">
                  {currentImage ? (
                  <img src={currentImage.filepath} className="d-block w-100" alt="..." />
                  ) : ( <p>Sorry, there are no images to show.</p> )}
                </div>
              </div>
            </div>
          </div>
          <div className="botdiv-middle d-flex flex-column">
            <h1>socials</h1>
            <div className="social-media-icons d-flex justify-content-center align-content-center m-0 w-100">
              {users.map((user)=> user.id == id ? (
              <div className="social-icons d-flex justify-content-between w-75 m-0" key={user.id}>
                <Link target="_blank" to={user.spotify_url}><i id="spotify-icon"
                  className="bi bi-spotify display-6 bg-white"></i></Link>
                <Link target="_blank" to={user.youtube_url}><i id="youtube-icon"
                  className="bi bi-youtube display-6"></i></Link>
                <Link target="_blank" to={user.facebook_url}><i id="facebook-icon"
                  className="bi bi-facebook display-6"></i></Link>
                <Link target="_blank" to={user.instagram_url}><i id="instagram-icon"
                  className="bi bi-instagram display-6"></i></Link>
              </div>
              ) : null)}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md d-flex" id="right-column">

        <h1 style={{ color: "white" }}>Where the connection happens</h1>
        <div className="topdiv-right d-flex justify-content-center align-itens-center">
          <div className="calendar-container">
            {inputReviewerId == Number(id) ? (
            <div className="container-calendar-allowed d-flex">
              <ShowCalendar selectedDates={availabilityDates} onConfirmDates={handleConfirmDates} />
            </div>

            ) :

            <div className="container-calendar-select-header">
              <div className="container-hold-calendar mb-2">
                <ShowCalendarBlocked selectedDates={availabilityDates} onConfirmDates={handleConfirmDates} />
              </div>
              <div className="container-calendar-select-footer d-flex justify-content-between align-itens-center">
                <div className="container-select-calendar d-flex flex-column justify-content-center align-itens-center">
                  <label className="dateSaver m-0">
                    want to set up a date? ;)
                  </label>
                  <select className="selectedDate m-0" id="selectedDateToMessage" onChange={handleDateChange}>
                    {availabilityDates.slice().sort().map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button className="button-78" data-bs-toggle="modal" data-bs-target="#messageModal">hit me up</button>
                </div>
              </div>
            </div>
            }

            {/* MODAL TO SEND A MESSAGE*/}
            {users.map((user)=> user.id == id ? (
            <div className="modal fade" id="messageModal" tabIndex="-1" aria-labelledby="messageModalLabel"
              aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="messageModalLabel">Message</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="modal-message">
                      <label for="message-to">Message to:</label>
                      <input class="form-control" value={user.email_address} id="message-to" type="text"
                        readonly></input>
                    </div>
                    <div className="modal-message">
                      <label for="for-date">About the day:</label>
                      <input class="form-control" id="for-date" value={selectedDateToSendMessage} type="text"
                        placeholder="Readonly input here…" readonly></input>
                    </div>
                    <div class="form-group">
                      <label for="message-input"></label>
                      <textarea class="form-control" placeholder="Type your message here" id="message-input" rows="3"
                        value={message} onChange={(e)=> setMessage(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">

                      <hr class="border border-danger border-2 opacity-50">
                      </hr>
                      <div className="modal-middle">
                        <button type="button" className="btn btn-primary">
                          <Link to={getMailtoLink()}>Click to send the message</Link></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ) : null)}
          </div>
        </div>
        <div className="middiv-right p-2 d-flex flex-column justify-content-center">
          <h1>reviews</h1>
          <div>
            {showReviewForm ? (
            <>
              <textarea value={newReview} onChange={handleReviewChange} placeholder="Write your review here..." rows="4"
                cols="50" />
              <div>
                      <button onClick={handleSubmitReview}>Submit Review</button>
                      <button onClick={() => setShowReviewForm(false)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <ul className="review-list">
                      {currentReview ? (
                        <li key={currentReview.id} className="review-item">
                          {currentReview.comment}
                        </li>
                      ):null}
                    </ul>
                    <button className="button-78" onClick={() => setShowReviewForm(true)}>
                      Add a Review
                    </button>
                  </>
                )}
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
      <div className="nav justify-content-center">
                    <button type="button" className="btn btn-link" onClick={() => navigate('/faqspage')}>FAQS</button>
                    <button type="button" className="btn btn-link" onClick={() => navigate('/FaqsPage')}>about us</button>
                    <button type="button" className="btn btn-link" onClick={() => navigate('/FaqsPage')}>contact</button>
                </div>
    </div>
  );
}

export default ProfilePage;