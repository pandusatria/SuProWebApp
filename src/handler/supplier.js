import axios from 'axios';
import appconfig from '../config/app.config.json';

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
};

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

        console.log('Supplier Get All : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.supplier);
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
    },
    GetDetailBySupplierIDHandler : async(id) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier + id,
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Supplier Get Detail : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.supplier + id);
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


