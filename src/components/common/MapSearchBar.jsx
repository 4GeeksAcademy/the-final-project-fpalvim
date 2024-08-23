import React, { useState } from 'react';

const MapSearchBar = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.length > 0) {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
            const data = await response.json();
            setResults(data);
        }
    };

    const handleSelect = (result) => {
        setQuery(result.display_name);
        setResults([]);
        onSelect([result.lat, result.lon]);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input className='searchMap'
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a place..."
                />
                <button type="submit">Search</button>
            </form>
            <div className="pe-auto">
                {results.map(result => (
                    <p className="results-search-map border rounded border-2px m-0" key={result.place_id} onClick={() => handleSelect(result)}>
                        {result.display_name}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default MapSearchBar;
