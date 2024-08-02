function ProfilePage() {
    return ( 
        <div className="profile-page-container">
            <div className="user-band-venue-title d-flex justify-content-start mt-5 mb-4 mx-3">
                <h1>User - venue - band name</h1>
            </div>
            <div className="profile-page-top">
                <img className="profile-page-img-container mb-4" src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2013/07/237499-metallica-cines-11-octubre.jpg?tf=1200x" alt="" />
            </div>
            <div div className="profile-page-middle d-flex">
                <div className="profile-page-middle-images-container col-9">
                    <img src="https://picsum.photos/200" alt="" />
                    <img src="https://picsum.photos/200" alt="" />
                    <img src="https://picsum.photos/200" alt="" />
                </div>
                <div className="profile-page-middle-calendar col-2 border border-2 rounded-4">
                    <p>calendar here</p>
                </div>
            </div>
            <div className="soundtrack-icons mx-4 mt-2">
                <i className="bi bi-music-note-beamed fs-2"></i>
                <i className="bi bi-music-note-beamed fs-2"></i>
            </div>
            <div className="profile-page-middle-below d-flex mx-4 mt-2">
                <div className="profile-page-middle-bellow-details-text-box col-9">
                    <p>We believe in produce. Tasty produce. Produce like:</p> <br />
                    <p>Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants. Asparagus. Artichokes-Jerusalem artichokes, too. Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill. </p>
                </div>
                <div className="profile-page-middle-bellow-right-side d-flex">
                    <div className="profile-page-middle-bellow-right-side-about border border-2 rounded-4 mx-2">
                        <p>specific details about the venue or band</p>
                    </div>
                    <div className="profile-page-middle-bellow-right-side-genre border border-2 rounded-4">
                        <p>details about the genre of band or venue</p>
                    </div>
                </div>
            </div>
            <div className="profile-page-bottom d-flex p-5">
                <div className="profile-page-bottom-left-box col-3 border border-2 rounded-4 mx-5">
                    <p>text here</p>
                </div>
                <div className="profile-page-bottom-center-box col-3 border border-2 rounded-4 mx-5">
                    <p>text here</p>
                </div>
                <div className="profile-page-bottom-right-box col-4">
                    <div className="profile-page-bottom social-media-container d-flex justify-content-end mx-4">
                        <i className="bi bi-music-note-beamed fs-2 mx-3"></i>
                        <i className="bi bi-music-note-beamed fs-2 mx-3"></i>
                        <i className="bi bi-music-note-beamed fs-2 mx-3"></i>
                    </div>
                </div>
            </div>
        </div>
        
     );
}

export default ProfilePage;