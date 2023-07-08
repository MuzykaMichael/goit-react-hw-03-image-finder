import axios from "axios";

const apiOptions = {
    defaultURL:'https://pixabay.com/api/?',
    key:'36775242-4d09ae0ae77a78f3b8d2db4c6',
    perPage:12,
}


export const fetchFromApi = async (searchQuery,page) => {
    const response = await axios.get(`${apiOptions.defaultURL}q=${searchQuery}&page=${page}&key=${apiOptions.key}&image_type=photo&orientation=horizontal&per_page=${apiOptions.perPage}`)
    console.log(response.data)
    return response.data;
    
}

export default fetchFromApi;