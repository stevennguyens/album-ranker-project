// map storing local storage keys
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_expire_time',
    timestamp: 'spotify_timestamp'
}

// map to get local storage values
const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
  };

const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    }
    const error = urlParams.get('error');
    if (error || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        getRefreshToken()
    }

    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken
    }

    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    return false;
}

const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
        return false
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return millisecondsElapsed / 1000 > Number(expireTime)
}

const getRefreshToken = async () => {
    try {
        if (!LOCALSTORAGE_VALUES.refreshToken ||
             LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
              (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp)/1000) < 1000) {
                console.error('No refresh token available');
                logout();
              }
        await fetch(`http://localhost:3001/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`)
        .then(response => response.json())
        .then(data => {
            // window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
            // window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
            // window.location.reload();
        });
        //console.log(data);
        // console.log("local storage" + LOCALSTORAGE_VALUES.refreshToken)
        // console.log("access token" + JSON.parse({data}));
        //window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
        //window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
        //window.location.reload();
    } catch (e) {
        console.error(e)
    }
}

export const logout = () => {
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property])
    }
    window.location = window.location.origin;
}
export const accessToken = getAccessToken();