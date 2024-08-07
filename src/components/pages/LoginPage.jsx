import { Link } from "react-router-dom";

function LoginPage() {
    return ( 
        <div className="login-page-container">
            <div className="application-title d-flex justify-content-center mt-5 mb-4">
                <h1>Site title</h1>
            </div>
            <div className="login-page-top mb-5">
                <img className="login-page-image-container" src="https://media.istockphoto.com/id/1199243596/es/foto/escenario-de-concierto-en-el-festival-de-rock-siluetas-de-instrumentos-musicales.jpg?s=2048x2048&w=is&k=20&c=0Fial9For-sXbtAyP04xydhn46_PeQqWLD6ge6o-A4w=" alt="">
                </img>
                <div className="overlay-form">
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <Link to= {`/profilepage`} className="login-page-create-account-link">Create an account</Link>
                </div>
            </div>
            <div className="login-page-middle d-flex mb-1">
                <div className="site-info-title p-5">
                    <h5>In what we believe?</h5>
                </div>
                <div className="site-info-text p-3">
                    <p>We believe in produce. Tasty produce. Produce like: <br></br><br></br>
                    Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants. Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill. 
                    </p>
                </div>
            </div>
            <div className="login-page-bottom d-flex pb-5">
                <div className="login-page-bottom-images-container col-8">
                    <img src="https://picsum.photos/200" alt="" />
                    <img src="https://picsum.photos/200" alt="" />
                    <img src="https://picsum.photos/200" alt="" />
                </div>
                <div className="login-page-bottom-right-boxes col">
                    <div className="login-page-bottom-right-first-box h-50 border border-2 rounded-4 p-2 w-75 mb-2">some text</div>
                    <div className="login-page-bottom-right-second-box h-50 border border-2 rounded-4 p-2 w-75">another text</div>
                </div>
            </div>
        </div>
        
     );
}

export default LoginPage;
