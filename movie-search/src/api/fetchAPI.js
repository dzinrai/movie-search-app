export default async function fetchAPI(url, storageKey) {
    let result;
    let data;
    if (storageKey) {
        data = localStorage.getItem(storageKey);
        data = JSON.parse(data);
        if (data) return data;
    }
    try {
        result = await fetch(url);
        data = await result.json();
        if (data.Response === 'False') {
            // {"Response":"False","Error":"Movie not found!"}
            return data.Error;
        }
    } catch (err) {
        return 'Error';
    }
    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
}
