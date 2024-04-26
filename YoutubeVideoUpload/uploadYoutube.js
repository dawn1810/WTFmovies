
const getYoutubePlaylistIds = async (playlistId) => {
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
    const result = res.items.map((item, i) => {
        const yUrl = new URL('https://www.youtube.com/watch');
        const yParams = {
            v: item.resourceId.videoId
        };

        yUrl.search = new URLSearchParams(yParams).toString();

        return yUrl.href;
    });

    return result;
};

getYoutubePlaylistIds('PLON1ufyN39kVMnxWGuA6ZAkMBwPqDmuut');