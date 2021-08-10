import config from '../config/config';
import AxiosService from './axios-service';


export default class AddressbookService {
    baseUrl = config.baseUrl;
    addPersom(personData){
        return AxiosService.post(`${this.baseUrl}`, personData);
    }
    getPersons() {
        return AxiosService.get(`${this.baseUrl}`);
    }
    deletePerson(personId){
        return AxiosService.delete(`${this.baseUrl}/${personId}`);
    }

    // getEmployeeById(employeeId){
    //     return AxiosService.get(`${this.baseUrl}/${employeeId}`);
    // }

    updatePerson(person){
        return AxiosService.put(`${this.baseUrl}/${person._id}`,person)
    }

}