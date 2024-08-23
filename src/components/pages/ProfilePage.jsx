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
          One of three columns
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
            <br />
            <br />
            <div className="">
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
        <div className="col" id="middle-column">
          <div className="">
            One of three columns
            <div className="topdiv-middle">
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
            <div className="middiv-middle">
              <h4>genres</h4>
            </div>
            <div className="botdiv-middle d-flex align-content-center">
              <div
                id="carouselExampleAutoplaying"
                className="carousel slide col"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      className="d-block w-100"
                      alt=""
                    ></img>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      className="d-block w-100"
                      alt=""
                    ></img>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      className="d-block w-100"
                      alt=""
                    ></img>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center" id="right-column">
          One of three columns
          <div className="topdiv-right">
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
          <div className="middiv-right">
            <h1>reviews</h1>
            <div className="input-group">
              {users.map((user) =>
                user.id == id ? <p key={user.id}>{user.comments}</p> : null
              )}
            </div>
          </div>
          <div className="botdiv-right">
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
      </div>
    </div>
  );
}

export default ProfilePage;
