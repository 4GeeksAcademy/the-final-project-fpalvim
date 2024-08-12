import MyMapComponent from "../common/Maps";

function SearchPage() {
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
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                </div>
                <div className="search-page-middle-right-side col-lg-5 col-md-5 col-sm-11 border border-2 mx-3 p-2">
                    <MyMapComponent/>
                </div>
            </div>
        </div>
     );
}

export default SearchPage;