class Api {

    constructor() {

        if (!Api.instance) {
            Api.instance = this;
        }
        
        return Api.instance;
    }

    request(method,endpoint,params) {

        const ApiUrl = 'https://newsapi.org/v2';
        const ApiKey = 'efdc24585d76400080dbc6f8d3e5079d';
        let responseData = null;

        let filters = '';

        for (let key in params) {
            if (params[key] === 'all'){
                params[key] = '';
            }
            filters += key + '=' + params[key] + '&';
        }


        const url = `${ApiUrl}/${endpoint}?${filters}apiKey=${ApiKey}`;

        console.log(url);

        return fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    return result
                },
                (error) => {
                    console.log('error')
                }
            )
    }
}

const instance = new Api();
Object.freeze(instance);

export { instance as Api };


// export const sources = 'https://newsapi.org/v2/sources';
