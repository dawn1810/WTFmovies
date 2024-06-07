
export const getYoutubePlaylistItems = async (playlistId) => {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    const params = {
        key: 'AIzaSyB6yUQdrzm1DXO4BVSWc75nubzIq6WbfnY',
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 50,
    };

    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);

    const res = await response.json();

    const result = await res.items.map(async (item, i) => {
        const yUrl = new URL('https://www.youtube.com/watch');
        const yParams = {
            v: item.snippet.resourceId.videoId
        };

        yUrl.search = new URLSearchParams(yParams).toString();

        return {
            film_id: playlistId,
            index: i + 1,
            name: item.snippet.title,
            uploader_email: "support@wtfdev.xyz",
            upload_date: {
                "$date": item.snippet.publishedAt
            },
            rating: null,
            views: 0,
            link: yUrl.href
        };
    });

    return result;
};

export const getYoutubePlaylistInfo = async (playlistId) => {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlists');
    const params = {
        key: 'AIzaSyB6yUQdrzm1DXO4BVSWc75nubzIq6WbfnY',
        part: 'snippet',
        id: playlistId,
        maxResults: 50,
    };

    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);

    const res = await response.json();

    return res.items[0].snippet;
};
