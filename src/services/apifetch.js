export const apiFetch = (urlPet) => {
    return fetch(urlPet)
        .then(response => {
            if(!response.ok){
                throw new error("No se a podido realizar la petición")
            }
            return response.json()
        })
}