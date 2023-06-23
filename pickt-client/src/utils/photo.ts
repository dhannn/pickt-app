import { createApi } from "unsplash-js";
import { Random } from "unsplash-js/dist/methods/photos/types";

const unsplash = createApi({
    accessKey: `${process.env.REACT_APP_ACCESS_KEY}`
});

export function getRandomPhoto(setBg: React.Dispatch<React.SetStateAction<string>>) {
    unsplash.photos.getRandom({orientation: 'landscape', query: 'abstract'})
        .then((res) => {
            const response: Random[] | Random = res.response!;
            getAPIPhoto(setBg, (response as Random))
        })
        .catch(() => { // means we have exhausted our 50 requests per hour
            getLocalPhoto(setBg);
        });
}

export function getLocalPhoto(setBg: React.Dispatch<React.SetStateAction<string>>) {
    const index = Math.floor(Math.random() * 4) + 1;
    console.log(index);
    setBg(`/bg/${index}.jpg`);
}

function getAPIPhoto(setBg: React.Dispatch<React.SetStateAction<string>>, response: Random) {
    setBg(() => response.urls.full);
}
