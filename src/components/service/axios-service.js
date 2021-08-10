const axios = require('axios').default;

class AxiosService {
    post(url = '', payload = null, tokenRequired = false, httpOptions = null) {
        return axios.post(url, payload, tokenRequired && httpOptions);
    }
    get(url = '', tokenRequired = false, httpOptions = null) {
        return axios.get(url, tokenRequired && httpOptions);
    }
    delete(url='',tokenRequired=false, httpOptions=null){
        return axios.delete(url, tokenRequired && httpOptions);
    }

    put(url='', payload=null, tokenRequired=false, httpOptions=null){
        return axios.put(url,payload,tokenRequired && httpOptions);
    }
}
module.exports = new AxiosService();