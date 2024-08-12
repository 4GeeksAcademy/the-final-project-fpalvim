import MyMapComponent from "../common/Maps";
import { useContext, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import { useParams } from "react-router-dom";

function SearchPage() {

     const {bands, setBands} = useContext(MyContext)
    /*const { id } = useParams()*/
    

    return ( 
        <div className="search-page-container">
            <div className="search-bar p-3 d-flex align-items-center">
                <input className="search-bar-input w-75" type="text" placeholder="What are you looking for?"></input>
                <button><i className="bi bi-search"></i></button>
            </div>
            <div className="date-select p-3">
                <p>maybe a dropdown calendar here to filter by date</p>
            </div>
            <div>
                <div className="search-page-filters p-3 d-flex flex-column justify-content-between">
                    <label for="by-distance" className="form-label">By distance</label>
                        <select className="form-select w-45" name="" id="by-distance"></select>
                    <label for="by-tags" className="form-label">By tags</label>
                        <select className="form-select w-45" name="" id="by-tags"></select>
                </div>
            </div>
            <div className="search-page-middle-wrapper row p-3">
                <div className="search-page-middle-left-side col-lg-6 col-md-6 col-sm-12 border border-2 mx-3 p-2">
                    hello 
                    <div className="card" style={{ width: "18rem" }}>
                        <img src="https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=600" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                            <div> {
                        bands.map((band)=> ( 
                            <h1 key={band.id}>{band.username}</h1> )
                        )
                    }</div>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="profilepage" className="btn btn-primary">visit account</a>
                            </div>
                    </div>  



                </div>
                <div className="search-page-middle-right-side col-lg-5 col-md-5 col-sm-11 border border-2 mx-3 p-2">
                    <MyMapComponent/>
                </div>
            </div>
        </div>
     );
}

export default SearchPage;