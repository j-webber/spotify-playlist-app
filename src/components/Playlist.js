import React from "react";
import Spotify from "../utils/Spotify";

export default function Playlist(params) {
  const { playlist } = params;
  const { getTrackInfo } = Spotify;

  const playlistList = playlist.map((trackId) => <li>{trackId}</li>);

  //   async function trackInfo(trackId) {
  //     return await getTrackInfo(trackId);
  //   }

  return <ul>{playlistList}</ul>;
}
