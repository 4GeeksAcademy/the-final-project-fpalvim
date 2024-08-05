import MyMapComponent from "./Maps";

function SearchPage() {
    return ( 
        <div className="search-page-container">
            <div className="search-bar p-3">
                <input className="search-bar-input w-75" type="text" placeholder="What are you looking for?"></input>
                <button><i className="bi bi-search"></i></button>
            </div>
            <div className="date-select p-3">
                <p>maybe a dropdown calendar here to filter by date</p>
            </div>
            <div>
                    <div className="search-page-filters p-3">
                        <select name="" id=""></select>
                        <select name="" id=""></select>
                    </div>
                </div>
            <div className="search-page-middle-wrapper d-flex p-3">
                <div className="search-page-middle-left-side border border-2 w-50 mx-3 p-2 d-flex">
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                </div>
                <div className="search-page-middle-right-side border border-2 w-50 mx-3 p-2">
                    <MyMapComponent/>
                </div>
            </div>
        </div>
     );
}

export default SearchPage;