import React, {useEffect, useState} from 'react';

import './MainPanel.css';

import { SearchResults } from '../SearchResults/SearchResults';

export const MainPanel = (props) => {

const [typeOfSearch, setTypeOfSearch] = useState(/* 'Spotify' */) // 'Spotify' or 'Personal' - based on rendered buttons
const [typeOfFilter, setTypeOfFilter] = useState(/*'Tracks'*/)  // 'Tracks' or 'Artists' or 'Albums' - based on rendered buttons (search filters)
const [results, setResults] = useState([]);

function setSearchType(e) {
    setTypeOfSearch(e.target.dataset.searchtype);
    document.getElementById('personal-results').classList.remove('active-filter');
    document.getElementById('spotify-results').classList.remove('active-filter');
    if(e.target.dataset.searchtype === 'Personal') {
        if(typeOfFilter === 'Albums') {
            setTypeOfFilter('Tracks');
            document.getElementById('tracks').classList.add('active-filter')
            document.getElementById('albums').classList.remove('active-filter')
        }
        document.getElementById('personal-results').classList.add('active-filter');
        document.getElementById('albums').style.visibility = 'hidden';
    }
    else {
        document.getElementById('spotify-results').classList.add('active-filter');
        document.getElementById('albums').style.visibility = 'visible';
    }
}
function setFilterType(e) {
    setTypeOfFilter(e.target.dataset.filter);
    document.getElementById('tracks').classList.remove('active-filter')
    document.getElementById('albums').classList.remove('active-filter')
    document.getElementById('artists').classList.remove('active-filter')
    e.target.classList.add('active-filter');
}
/* function setSearchResults(searchType, filterType) {
    if(props.searchResults) {
        if(searchType === 'Spotify') {
            if(filterType === 'Tracks') {
                setResults(props.searchResults.tracks);
            }
            else if(filterType === 'Albums') {
                setResults(props.searchResults.albums);
            }
            else if(filterType === 'Artists') {
                setResults(props.searchResults.artists);
            }
        } else {
            setResults([]);
        }
    }
}
useEffect(() => {
    setSearchResults(typeOfSearch, typeOfFilter);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.searchResults, typeOfFilter, typeOfSearch]);
*/
function playChosenSong(e) {
    let index = e.target.dataset.key;
    props.playChosenSong(results[index].uri);
}

    return (
        <div className='mainPanel'>
            <h1 className='header1'>Up-lify app</h1>
            <div className='searchContainer'>
                <div className='control-panel'>
                    <div className='chooseResults'>
                        <button id='spotify-results' data-searchtype='Spotify' onClick={setSearchType}>Spotify results</button>
                        <button id='personal-results' data-searchtype='Personal' onClick={setSearchType}>Personal results</button>
                    </div>
                    <div className='filters'>
                        <button id='tracks' className='filter' data-filter='Tracks' onClick={setFilterType}>Tracks</button>
                        <button id='albums' className='filter' data-filter='Albums' onClick={setFilterType}>Albums</button>
                        <button id='artists' className='filter' data-filter='Artists' onClick={setFilterType}>Artists</button>
                    </div>
                </div>
                <div className='searchResults'>
                    <h2 className='header2'>{typeOfSearch} results - {typeOfFilter}</h2>
                    <div className='results'>
                        <ul>
                            {   <SearchResults 
                                    results={props.searchResults} 
                                    typeOfSearch={typeOfSearch} 
                                    typeOfFilter={typeOfFilter} 
                                    playChosenSong={props.playChosenSong}
                                />
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}