import React, { useState } from 'react';
const MapSearchBar = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const API_KEY = '7dc0f065e04d40339d145a08e98b49a9';
    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.length > 0) {
            try {
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${API_KEY}`);
                const data = await response.json();
                if (data.results) {
                    setResults(data.results);
                }
                console.log(data);
            } catch (error) {
                console.error("Error fetching data from OpenCage API:", error);
            }
        }
    };
    const handleSelect = (result) => {
        setQuery(result.formatted);
        setResults([]);
        onSelect([result.geometry.lat, result.geometry.lng]);
    };
    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a place..."
                    id="inputAddress2"
                />
                <button type="submit">Search</button>
            </form>
            <div className="pe-auto">
                {results.map(result => (
                    <p className="results-search-map border rounded border-2px m-0" key={result.place_id} onClick={() => handleSelect(result)}>
                        {result.formatted}
                    </p>
                ))}
            </div>
        </div>
    );
};
export default MapSearchBar;












