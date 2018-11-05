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
    },
    createCodeSupplier : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        console.log('Supplier createCodeSupplier : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.supplier + "orderdesc");
        console.log(token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier + "orderdesc",
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        try
        {
            console.log(option);
            let result = await axios(option);
            console.log(result);
            console.log(result.data.message);

            let data = result.data.message;
            console.log(data);
            if(data.length > 0)
            {
                if(data[0].Code === null || typeof data[0].Code === "undefined")
                {
                    return "SP0001";
                }
                else
                {
                    let lastcode= data[0].Code;
                    let lastnum = lastcode.replace("SP"," ");
                    lastnum = parseInt(lastnum);
                    lastnum +=1;
                    let padnum = (lastnum).pad(4);
                    let gencode = "SP"+ padnum;
                    return gencode;
                }
            }
            else
            {
                return "SP0001";
            }
        }
        catch (error) 
        {
            console.log(option);
            console.log(error);
            return error.response.data;
        }
    }
}

export default supplier;


