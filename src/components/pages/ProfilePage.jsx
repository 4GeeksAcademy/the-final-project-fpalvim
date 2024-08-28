import React, { useContext, useEffect, useState, useRef } from "react";
import ShowCalendar from "../common/ShowCalendar";
import { MyContext } from "../context/MyContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import { Link } from "react-router-dom";

function ProfilePage() {
  const { users, comments, setComments, userTags, images } = useContext(MyContext);
  const { id } = useParams();
  const [currentComment, setCurrentComment] = useState(null);
  const [availabilityDates, setAvailabilityDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const galleryRef = useRef();
  const user = users.find(user => user.id === Number(id));
  

  useEffect(() => {
      if (window && galleryRef.current) {
          window.cloudinary
              .galleryWidget({
                  container: galleryRef.current,
                  cloudName: "dqirsutsr",
                  aspectRatio: "5:1",
                  mediaAssets: [
                      { tag: "venues", transformation: { crop: "fill" } },
                      { tag: "venues", transformation: { crop: "fill" } },
                  ],
                  carouselStyle: "indicators",
              })
              .render();
      }
  }, []);

  useEffect(() => {
      const fetchProfileData = async () => {
          try {
              const response = await axios.get(`https://super-duper-fortnight-7gvwxjxgjj7fr957-8787.app.github.dev/dates/availability/${id}`);
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

      axios.put(`https://super-duper-fortnight-7gvwxjxgjj7fr957-8787.app.github.dev/dates/availability/${id}`, {
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
    <div id="profile-container" className=" text-center">
      <div className="row align-items-start">
        <div className="col" id="left-column">
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
            <div className="tagsdiv">
            <h4>genres</h4>
            <div>
                {userTags.map((utag) => (
                    <div className="profile-page-tags-badge bg-secondary text-white border border-solid rounded p-1 justify-content-center d-flex mx-1" key={utag.tag_id}>
                        {utag}
                    </div>
                ))}
            </div>
            </div>
            <div className="">
                {users.map((user) =>
                  user.id == id ? <p key={user.id}>{user.tags}</p> : null
                )}
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
        <div className="col" id="middle-column">
          <div className="">
           <h1>Showcase Area</h1>
            <div className="topdiv-middle">
            <div>
            <iframe
              src="https://open.spotify.com/embed/artist/33qOK5uJ8AR2xuQQAhHump?utm_source=generator&theme=0"
              width="100%"
              height="360"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
              data-gtm-yt-inspected-6="true"
            ></iframe>
          </div>
            </div>
            <div className="middiv-middle">
              <h1>our work</h1>
              
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
              {images.map((image)=> (
                <div>
                  <div class="carousel-item active" data-bs-interval="2000">
                    <img src={image.filepath} class="d-block w-100" alt="..."></img>
                  </div>
                </div>
              ) )}
              </div>
            
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            </div>
            <div className="botdiv-middle ">
            <h1>socials</h1>
            <div className="">
              {users.map((user)=> user.id == id ? (
                <div key={user.id}>
                <Link target="_blank" to={user.spotify_url}><i id="spotify-icon" class="bi bi-spotify"></i></Link>
                <Link target="_blank" to={user.youtube_url}><i id="youtube-icon" class="bi bi-youtube"></i></Link>
                <Link target="_blank" to={user.facebook_url}><i id="facebook-icon" class="bi bi-facebook"></i></Link>
                <Link target="_blank" to={user.instagram_url}><i id="instagram-icon" class="bi bi-instagram"></i></Link>
                </div>
              ) : null)}
            </div>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center" id="right-column">
          <div>
                <h1>Where the connection happens</h1>
          <div className="topdiv-right">
          <div className="calendar-container col-lg-6 col-md-12">
                            <ShowCalendar
                                selectedDates={availabilityDates}
                                onConfirmDates={handleConfirmDates}
                            />
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
                    <h4>{user.phone_number}</h4>
                    <h4>{user.address}</h4>
                    <h4>{user.email_address}</h4>
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
