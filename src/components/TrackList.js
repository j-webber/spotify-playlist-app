import React from "react";

export default function TrackList(params) {
  const { tracks } = params;
  console.log(tracks);
  const trackList = tracks.map((track) => (
    <li key={track.id}>
      {track.name}
      <br />
      {track.artists[0].name}
    </li>
  ));

  return <ul>{trackList}</ul>;
}
