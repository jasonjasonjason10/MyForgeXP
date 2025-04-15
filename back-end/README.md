===================Need Auth token Before starting=====================

client_id = n1rw74f6gu7z0vp1mwnnjcnjxhydem

client_Secret = sfag42ajo6ay3tc5bptl5y9omwkiuq

grant_type = client_credentials

=====================================================================

post at TOKEN_URL to get TOKEN for Authorization

TOKEN_URL = https://id.twitch.tv/oauth2/token?client_id=n1rw74f6gu7z0vp1mwnnjcnjxhydem&client_secret=sfag42ajo6ay3tc5bptl5y9omwkiuq&grant_type=client_credentials

responseExample = {
  "access_token": "access12345token",
  "expires_in": 5587808,
  "token_type": "bearer"
}

================use access_token for Authorization below=============

PostURL = https://api.igdb.com/v4/OPTION ============POST=ONLY=======

headers: 
  Accept: application/json,
  Client-ID: n1rw74f6gu7z0vp1mwnnjcnjxhydem,
  Authorization: Bearer TOKEN

=====================================================================
