import {Link} from "react-router-dom"

function Navbar() {
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
                        <li><Link to="" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#editModal">Edit profile</Link></li>
                        <li><Link to="searchpage" className="dropdown-item">start connecting</Link></li>
                        <li><hr className="dropdown-divider"></hr></li>
                        <li><Link to="loginpage" className="dropdown-item">Log out</Link></li>
                    </ul>
                    </li>
                </ul>
                </div>
                <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Sign up</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label for="inputEmail4" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="inputEmail4"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="inputPassword4" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="inputPassword4"></input>
                                    </div>
                                    <div className="col-12">
                                        <label for="inputAddress" className="form-label">User Name</label>
                                        <input type="text" className="form-control" id="inputAddress" placeholder="The Three Musketeers"></input>
                                    </div>
                                    <div className="col-12">
                                        <label for="inputAddress2" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="inputCity" className="form-label">Country</label>
                                        <input type="text" className="form-control" id="inputCity"></input>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="inputState" className="form-label">City</label>
                                        <select id="inputState" className="form-select">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label for="inputZip" className="form-label">Zip</label>
                                        <input type="text" className="form-control" id="inputZip"></input>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="gridCheck"></input>
                                            <label className="form-check-label" for="gridCheck">
                                                Keep me logged in
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button  type="button" className="btn btn-primary" onClick={() => navigate('/loginpage')}>Create account</button>
                                    </div>
                                </div>
                            </div>
                                <div className="modal-footer"></div>
                            </div>
                        </div>
                    </div>
            </div>
        </nav>
     );
}

export default Navbar;