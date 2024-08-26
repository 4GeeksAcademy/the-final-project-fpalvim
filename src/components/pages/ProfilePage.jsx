import { useContext, useEffect } from "react";
import ShowCalendar from "../common/ShowCalendar";
import { MyContext } from "../context/MyContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";

function ProfilePage() {
  const { users, setUsers } = useContext(MyContext);
  const { id } = useParams();

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
              <h4>
                introduction of the band: Hello we are the 4geeks and we play
                the most nerdy insturments on the planets starting with the
                triangle.
              </h4>
              <div className="input-group">
                {users.map((user) =>
                  user.id == id ? <p key={user.id}>{user.description}</p> : null
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
    <div class="carousel-item active" data-bs-interval="2000">
      <img src="https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1200" class="d-block w-100" alt="..."></img>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1200" class="d-block w-100" alt="..."></img>
    </div>
    <div class="carousel-item">
      <img src="https://images.pexels.com/photos/210887/pexels-photo-210887.jpeg?auto=compress&cs=tinysrgb&w=1200" class="d-block w-100" alt="..."></img>
    </div>
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
              <Link target="_blank" to="https://open.spotify.com/artist/33qOK5uJ8AR2xuQQAhHump?si=Wn4CICCNSRyXRz9dD-l-cg">
                <i id="spotify-icon" class="bi bi-spotify"></i>
              </Link>
              <Link target="_blank" to="https://www.youtube.com/@TeddySwims">
                <i id="youtube-icon" class="bi bi-youtube"></i>
              </Link>
            </div>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center" id="right-column">
          <div>
                <h1>Where the connection happens</h1>
          <div className="topdiv-right">
           callender 
           </div>
          <div className="middiv-right">
            <h1>reviews</h1>
            <div className="input-group">
              {users.map((user) =>
                user.id == id ? <p key={user.id}>{user.comments}</p> : null
              )}
            </div>
          </div>
         
          <div className="botdiv-right">
          <h1>contact info</h1>
              {users.map((user) =>
                user.id == id ? (
                  <div>
                    <h4 key={user.id}>{user.phone_number}</h4>
                    <h4 key={user.id}>{user.address}</h4>
                    <h4 key={user.id}>{user.email_address}</h4>
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
