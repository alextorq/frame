import axios from 'axios'
const PREFIX = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/' : '/api/';

console.log(PREFIX)

class CinemaRepository {
    constructor(transport) {
        this.transport = transport
    }

    suggestCinema(payload) {
        return this.transport.post(`${PREFIX + 'cinema/create'}`, payload)
    }

    convertToFormData(payload) {
        const formData = new FormData();
        Object.entries(payload).forEach(el => {
           const [key, value] =  el;
            formData.append(key, value);
        });
        return formData;
    }


    getFirstOrLastMemory() {
        return this.transport.get(`${PREFIX + 'cinema/get_last_remember/'}`, {withCredentials: true});
    }


    getNext(id) {
        return this.transport.get(`${PREFIX + 'cinema/get_next/' + id}`, {withCredentials: true});
    }

    weekly() {
        return this.transport.get(`${PREFIX}'cinema/weekly/`)
    }

    answer(cinema) {
        return this.transport.post(`${PREFIX + 'cinema/answer'}`, cinema, {withCredentials: true});
    }

}


export default new CinemaRepository(axios)