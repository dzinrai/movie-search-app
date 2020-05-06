export default async function getMovieByID(slide, imdbID) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=4679477d`;
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
    slide.update(rate);
    //
    const genre = await data.Genre;
    const director = await data.Director;
    const released = await data.Released;
    const rated = await data.Rated;
    const runtime = await data.Runtime;
    const actors = await data.Actors;
    const plot = await data.Plot;
    slide.updateDescription({
        genre, director, released, rated, runtime, actors, plot,
    });
    return data;
}
