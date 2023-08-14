import React from "react";

export default function TrackList(params) {
  const { tracks, handleClick } = params;

  const trackList = tracks.map((track) => (
    <li key={track.id} id={track.id} onClick={handleClick}>
      {track.name}
      <br />
      {track.artists[0].name}
    </li>
  ));

  return <ul>{trackList}</ul>;
}
