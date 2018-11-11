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
    GetAllSupplierHandlerSearch : async(query) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier + 'search',
            method: 'POST',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                filter: query
            }
        };

        console.log('Supplier GetAllSupplierHandlerSearch : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.supplier + 'search');
        console.log(token);
        console.log(option);

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
    GetListContactTitleName : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier + "gettitle",
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Supplier GetListContactTitleName : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.supplier + "gettitle");
        console.log(token);
        console.log(option);

        try
        {
            let result = await axios(option);
            console.log('Supplier GetListContactTitleName Result : Axios User');
            console.log(result);
            return result.data;
        }
        catch (error)
        {
            return error.response.data;
        }
    },
    GetDetailSupplierAllProductBySupplierID : async(id) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier + 'getsupplierproduct/' + id,
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('SupplierGetProductBySupplierID : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.supplier + 'getproduct/' + id);
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
    InsertNewSupplier : async (formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier,
            method: 'POST',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                CompanyName : formdata.CompanyName,
                ContactName : formdata.ContactName,
                ContactEmail : formdata.ContactEmail,
                ContactTitle : formdata.ContactTitle,
                Address : formdata.Address,
                City : formdata.City,
                PostalCode : formdata.PostalCode,
                Country : formdata.Country,
                Phone : formdata.Phone,
                Fax : formdata.Fax,
                Code : formdata.Code,
                ContactNameTitleId : formdata.ContactNameTitleId
            }
        };

        console.log('Supplier Create New : Axios User');

        console.log('Formdata');
        console.log(formdata);

        console.log('Option : Data');
        console.log(option.data);

        console.log('Supplier GetListContactTitleName : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.supplier);
        console.log(option);

        try
        {
            let result = await axios(option);
            console.log("Result From Axios : ");
            console.log(result);
            return result.data;
        }
        catch (error)
        {
            return error.response.data;
        }
    },
    EditSupplierProduct : async (formdata, id) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier + id,
            method: 'PUT',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                CompanyName : formdata.CompanyName,
                ContactName : formdata.ContactName,
                ContactEmail : formdata.ContactEmail,
                ContactTitle : formdata.ContactTitle,
                Address : formdata.Address,
                City : formdata.City,
                PostalCode : formdata.PostalCode,
                Country : formdata.Country,
                Phone : formdata.Phone,
                Fax : formdata.Fax,
                Code : formdata.Code,
                ContactNameTitleId : formdata.ContactNameTitleId,
                DetailProduct : formdata.DetailProduct
            }
        };

        console.log('Supplier Update Supplier : Axios User');

        console.log('Formdata');
        console.log(formdata);

        console.log('Option : Data');
        console.log(option.data);

        console.log('Supplier GetListContactTitleName : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.supplier);
        console.log(option);

        try
        {
            let result = await axios(option);
            console.log("Result From Axios : ");
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


