import React, { useEffect, useState } from "react";
import Spotify from "../utils/Spotify";
import TrackList from "./TrackList";
import Playlist from "./Playlist";

export default function Search(params) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    if (search) {
      searchForItem();
    }
  }, [search]);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  async function searchForItem() {
    let results = await Spotify.search(search);
    setSearchResults(results.tracks.items);
  }

  function handleClick(e) {
    setPlaylist((prevPlaylist) => {
      return [...prevPlaylist, e.target.id];
    });
    console.log(playlist);
  }

  return (
    <>
      <form>
        <input type="text" value={search} onChange={handleChange} />
      </form>
      <TrackList tracks={searchResults} handleClick={handleClick} />
      <Playlist playlist={playlist} />
    </>
  );
}
