export default async function getByTitle(search) {
    const url = `https://www.omdbapi.com/?t=${search}&apikey=4679477d`;
    let data;
    let result;
    try {
        result = await fetch(url);
        data = await result.json();
        if (data.Response === 'False') {
            // {"Response":"False","Error":"Movie not found!"}
            return data.Error;
        }
    } catch (err) {
        return data.Error;
    }
    localStorage.setItem(data.imdbID, JSON.stringify(data));
    return data;
}
