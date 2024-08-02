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
                        <li><Link to="#" className="dropdown-item">Action</Link></li>
                        <li><Link to="#" className="dropdown-item">Another action</Link></li>
                        <li><hr className="dropdown-divider"></hr></li>
                        <li><Link to="#" className="dropdown-item">Something else here</Link></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
     );
}

export default Navbar;