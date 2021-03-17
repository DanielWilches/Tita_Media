const URL = 'https://api.unsplash.com/';

class Conexion {
    endPoint = 'https://api.unsplash.com/search/photos';
    accesKey = "4IaRMCk0GeRAbeZKYvmpUujXHLiPpNChRXVmU3kK05s";
    nombre;
    query;
    page=0;
    constructor() {
        // this.query = query;
        // this.count = count;
        // console.log(query)
        
        // console.log(this.getLocalStorage())
    }
    // input:  string  number   / retrunt array
    async getImages(query, page) {
        this.query = query
        this.setLocalstorage();
        let result;
        this.page = page ;
        let response = await fetch(`${this.endPoint}?query=${this.query}&page=${this.page}&per_page=${12}&client_id=${this.accesKey}`)
            .then(response => response.json())
            .then(json => {
                // console.log(json.results)
                result = json.results;
            })
            .catch(err => {
                console.log(err)
            });
        return result;
    }

    // string
    setLocalstorage(  ) {
        localStorage.setItem('busqueda', this.query );
    }

    getLocalStorage() {
        return localStorage.getItem('busqueda');
    }


}

