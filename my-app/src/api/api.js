class Api {

    constructor() {

        if (!Api.instance) {
            Api.instance = this;
        }
        
        return Api.instance;
    }

    request(method,params) {

        const ApiUrl = 'https://newsapi.org/v2';
        const ApiKey = 'efdc24585d76400080dbc6f8d3e5079d';
        const Endpoints = ['top-headlines', 'everything', 'sources'];

        let responseData = null;

        let EndPointNumber = 2;

        let filters = '';

        for (let key in params) {
            filters += key + '=' + params[key] + '&';
        }

        const url = `${ApiUrl}/${Endpoints[EndPointNumber]}?${filters}apiKey=${ApiKey}`;

        console.log(url);

        return fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result);
                    return result
                },
                (error) => {
                    console.log('error')
                }
            )
    }

    // getSources(params = '', query = '') {
    //     return FetchData.get(
    //         routes.sources,
    //         params,
    //         query,
    //     )
    // }

}

const instance = new Api();
Object.freeze(instance);

export { instance as Api };


// export const sources = 'https://newsapi.org/v2/sources';
