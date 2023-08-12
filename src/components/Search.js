import React, { useEffect, useState } from "react";
import Spotify from "../utils/Spotify";

export default function Search(params) {
  const [search, setSearch] = useState("");

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
    console.log(results);
  }

  return (
    <form>
      <input type="text" value={search} onChange={handleChange} />
    </form>
  );
}
