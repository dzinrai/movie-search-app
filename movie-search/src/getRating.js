export default async function getRating(imdbID) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=4679477d`;
    let data = localStorage.getItem(imdbID);
    let result = {};
    let rate = 0;
    if (data) {
        data = await JSON.parse(data);
    } else {
        result = await fetch(url);
        data = await result.json();
        localStorage.setItem(imdbID, JSON.stringify(data));
    }
    rate = await data.imdbRating;
    return rate;
}
