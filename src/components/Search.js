import React, { useEffect, useState } from "react";
import Spotify from "../utils/Spotify";
import TrackList from "./TrackList";

export default function Search(params) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <>
      <form>
        <input type="text" value={search} onChange={handleChange} />
      </form>
      <TrackList tracks={searchResults} />
    </>
  );
}
