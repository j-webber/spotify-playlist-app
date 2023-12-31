const clientId = "e7cd7b8178204acab699f7e180cb52d8"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
const accessToken = await getAccessToken(clientId, code);

const Spotify = {
  hasAccessToken() {
    if (code) {
      return true;
    } else {
      return false;
    }
  },
  logIn() {
    redirectToAuthCodeFlow(clientId);
  },
  async search(query) {
    const params = new URLSearchParams({
      q: query,
      type: "track",
    });

    const response = await fetch(
      `https://api.spotify.com/v1/search?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const data = await response.json();
    return data;
  },
  async getTrackInfo(trackId) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.status);
      console.log(error.message);
    }
  },
};

async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:3000");
  params.append(
    "scope",
    "playlist-modify-private user-read-private user-read-email"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token, expires_in, refresh_token } = await result.json();
  localStorage.setItem("expires_in", expires_in); //use this to check if access token has epxire - max time 3600 seconds
  localStorage.setItem("refresh_token", refresh_token); //use this to refresh token when expired
  return access_token;
}

//write function to check whether accessToken has expired. If expired then refresh access token

export default Spotify;
