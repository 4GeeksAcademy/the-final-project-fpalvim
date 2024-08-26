import { useNavigate } from "react-router";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUserName,
    address,
    setAddress,
    profilePicture,
    setProfilePicture,
    setPhoneNumber,
    profileType,
    setProfileType,
    setPosition,
  } = useContext(MyContext);
  const handleProfileTypeChange = (e) => {
    setProfileType(e.target.value);
  };

  const handleSubmit = () => {
    const url =
      profileType === "band"
        ? "https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/band"
        : "https://organic-trout-4xj6rprx94w35jxp-8787.app.github.dev/venue";
    const formInputData = {
      email_address: document.getElementById("inputEmail4").value,
      username: document.getElementById("inputUsername").value,
      password: document.getElementById("inputPassword4").value,
      address: document.getElementById("inputAddress2").value,
      profile_picture: document.getElementById("inputProfilePicture").value,
    };

    axios
      .post(url, formInputData)
      .then(function (response) {
        alert("Account created successfully, please go to log in!");
      })
      .catch(function (error) {
        alert("Error: Unable to create account, try again.");
      });
  };

  return (
    <div className="login-page-container">
      <div className="header-login d-flex justify-content-between ">
        <div>
          <h1 className="logo">some room for logo</h1>
        </div>
        <div>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a
                className="nav-link active"
                style={{ color: "white" }}
                aria-current="page"
                href="/searchpage"
              >
                Explore
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="top-view row">
        <form className="login-form">
          <div className="mb-3">
            <h1 style={{ color: "white" }}>Welcome to Giglink</h1>
            <label
              for="exampleInputEmail1"
              className="form-label"
              style={{ color: "white" }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            ></input>
            <div
              id="emailHelp"
              className="form-text"
              style={{ color: "white" }}
            >
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label"
              style={{ color: "white" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            ></input>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            ></input>
            <label
              className="form-check-label"
              for="exampleCheck1"
              style={{ color: "white" }}
            >
              Keep me logged in
            </label>
          </div>
          <button
            type="button"
            className="login-button"
            style={{ color: "white" }}
            onClick={() => navigate("/profilepage")}
          >
            Log in
          </button>{" "}
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate("/FaqsPage")}
            style={{ color: "white" }}
          >
            Forgot my password
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate("/FaqsPage")}
            style={{ color: "white" }}
          >
            Create a new account
          </button>
        </form>
      </div>
      <div className="login-page-middle ">
        <div className="site-info-title">
          <h1 style={{ color: "white" }}>Introducing GigLink</h1>
        </div>
        <div className="site-info-text p-5">
          <p style={{ color: "white" }}>
            welcome to GigLink, <br></br>
            <br></br>
            The ultimate online platform designed to bridge the gap between
            bands and venues effortlessly! With GigLink, musicians can create
            profiles to showcase their talents, while venues can list
            availability and unique features. Our intuitive calendar system
            allows both sides to easily browse available dates, ensuring that
            you find the perfect match for your next gig. Whether you’re a band
            looking to book your next performance or a venue seeking fresh
            sounds, simply connect, message, and send booking requests—all in
            one seamless experience. <br /> Join GigLink today and transform the
            way you book live music!
          </p>

          <form
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ color: "white" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Ready for your musical adventure?
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label for="inputEmail4" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                      ></input>
                    </div>
                    <div className="col-md-6">
                      <label for="inputPassword4" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                      ></input>
                    </div>
                    <div className="col-12">
                      <label for="inputUsername" className="form-label">
                        Band or Venue Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername"
                        placeholder="The Three Musketeers"
                      ></input>
                    </div>
                    <div className="col-12">
                      <label for="inputProfilePicture" className="form-label">
                        URL of the profile picture
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputProfilePicture"
                        placeholder="E.g. https://www.instagram.com/metallica/?hl=en"
                      ></input>
                    </div>
                    <div className="col-12">
                      <label for="inputAddress2" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress2"
                        placeholder="Apartment, studio, or floor"
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profileType" className="form-label">
                        Profile Type
                      </label>
                      <select
                        id="profileType"
                        className="form-select"
                        value={profileType}
                        onChange={handleProfileTypeChange}
                      >
                        <option value="band">Band</option>
                        <option value="venue">Venue</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="create-account-button"
                        onsubmit={handleSubmit}
                        style={{ color: "white" }}
                      >
                        Create account
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </form>
        </div>
        <div className="for-accounts container d-flex justify-content-between">
          <div className="left-account" style={{ color: "white" }}>
            <div className="card-left text-center">
              <div className="card-header">
                <h1>ARTISTS ACCOUNT</h1>
              </div>
              <br />
              <br />
              <div className="card-body">
                <h5 className="card-title">Connect with Venues Effortlessly</h5>
                <br />
                <p className="card-text">
                  Join GigLink to showcase your talent and get discovered!
                  Create a profile that highlights your music, gigs, and
                  experience. Connect with venues looking for budding artists
                  and book your next performance with ease.
                </p>
                <br />
                <br />
                <a
                  href="#"
                  className="left-account-button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ color: "white" }}
                >
                  Create Your Profile
                </a>
              </div>
              <br />
              <br />
              <div className="card-footer text-body-secondary">
                "Where words fail, music speaks." – Hans Christian Andersen
              </div>
            </div>
          </div>
          <div className="middle-wrapper d-flex flex-column justify-content-start">
            <h1 style={{ color: "white" }}>Ready to join GigLink?</h1>
            <br />
            <button
              type="button"
              className="join-button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ color: "white" }}
            >
              start here
            </button>
          </div>

          <div className="right-account" style={{ color: "white" }}>
            <div class="card-right text-center">
              <div className="card-header">
                <h1>VENUES ACCOUNT</h1>
              </div>
              <br />
              <br />
              <div className="card-body">
                <h5 className="card-title">
                  Find the Perfect Artists for Your Events
                </h5>
                <br />
                <p className="card-text">
                  Join GigLink to access a diverse pool of talented musicians!
                  Create a venue profile to showcase your space and connect with
                  artists eager to perform. Make booking seamless and elevate
                  your event lineup today!
                </p>
                <br />
                <br />
                <a
                  href="#"
                  class="right-account-button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ color: "white", height: "70px" }}
                >
                  Set Up Your Venue
                </a>
              </div>
              <div className="card-footer text-body-secondary">
                "Music can change the world because it can change people." –
                Bono
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-page-bottom d-flex pb-5 container text-center">
        <div className="row align-items-start">
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
          <div className="bottom-text col">
            <h1 style={{ color: "white" }}>here are some of our friends</h1>
            <p style={{ color: "white" }}>
              You can see some fun pictures or click the explore button on top
              of the page to dive into our list of band and venues that are
              waiting for you and ready to connect with
            </p>
          </div>
        </div>
      </div>

      <div className="nav justify-content-center">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/faqspage")}
        >
          FAQS
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/FaqsPage")}
        >
          about us
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/FaqsPage")}
        >
          contact
        </button>
      </div>
    </div>
  );
}
export default LoginPage;
