import axios from 'axios';
import appconfig from '../config/app.config.json';

const supplier = {
    GetAllSupplierHandler : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier,
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Supplier : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.client);
        console.log(token);

        try
        {
            let result = await axios(option);
            console.log(result);
            return result.data;
        }
        catch (error) 
        {
            return error.response.data;
        }
    }
}

export default supplier;


