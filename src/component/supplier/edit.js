import React, { Component } from 'react';
import productapi from '../../handler/product';
import supplierapi from '../../handler/supplier';

class edit extends Component {
    constructor (props){
        super(props)

        this.state={
            formdata:{
                _id : "",
                CompanyName : "",
                ContactName : "",
                ContactEmail : "",
                ContactTitle : "",
                Address : "",
                City : "",
                PostalCode : "",
                Country : "",
                Phone : "",
                Fax : "",
                IsDelete : "",
                CreatedDate : "",
                CreatedBy : "",
                UpdateDate : "",
                UpdateBy : "",
                Code : "",
                ContactNameTitleId : ""
            },
            product : []
        };

        this.getAllProductBySupplierID = this.getAllProductBySupplierID.bind(this);
        this.getDetailSupplierByID = this.getDetailSupplierByID.bind(this);
        this.textHandler = this.textHandler.bind(this);
    }

    textHandler(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }

    async getAllProductBySupplierID(id) {
        let result = await productapi.GetAllProductBySupplierIDHandler(id);

        if(result.status === 200)
        {
            console.log('Product - Edit.js Debugger');
            console.log(result.message);
            this.setState({
                product: result.message
            });
        }
        else
        {
            console.log(result.message);
        }
    }

    async getDetailSupplierByID(id) {
        let result = await supplierapi.GetDetailBySupplierIDHandler(id);
        let currSuplier = {};

        if(result.status === 200)
        {
            console.log('Supplier - Edit.js Debugger');
            console.log(result.message);

            result.message.map((ele) => {
                currSuplier = ele;
            });

            this.setState({
                formdata: currSuplier
            });
        }
        else
        {
            console.log(result.message);
        }
    }

    componentDidMount(){
        var id = localStorage.getItem('idSupplier');
        this.getDetailSupplierByID(id);
        this.getAllProductBySupplierID(id);
    }

    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Supplier
                        <small>edit supplier</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> App</a></li>
                        <li><a href="#">Supplier</a></li>
                        <li className="active">Edit</li>
                    </ol>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Edit Supplier</h3>
                                </div>
                                <form>
                                    <div className="box-body">
                                        <div className="col-xs-6">
                                            <div className="form-group">
                                                <label>Company Name</label>
                                                <input type="text" className="form-control" id="CompanyName" name="CompanyName" 
                                                value={this.state.formdata.CompanyName} onChange={this.textHandler} placeholder="Enter Company Name"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Name</label>
                                                <input type="text" className="form-control" id="ContactName" name="ContactName" 
                                                value={this.state.formdata.ContactName} onChange={this.textHandler} placeholder="Enter Contact Name"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Email</label>
                                                <input type="text" className="form-control" id="ContactEmail" name="ContactEmail" 
                                                value={this.state.formdata.ContactEmail} onChange={this.textHandler} placeholder="Enter Contact Email"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Title</label>
                                                <input type="text" className="form-control" id="ContactTitle" name="ContactTitle" 
                                                value={this.state.formdata.ContactTitle} onChange={this.textHandler} placeholder="Enter Contact Title"/>
                                            </div>
                                        </div>
                                        <div className="col-xs-6">
                                            <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" className="form-control" id="Address" name="Address" 
                                                value={this.state.formdata.Address} onChange={this.textHandler} placeholder="Enter Address"/>
                                            </div>
                                            <div className="form-group">
                                                <label>City</label>
                                                <input type="text" className="form-control" id="City" name="City" 
                                                value={this.state.formdata.City} onChange={this.textHandler} placeholder="Enter City"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Postal Code</label>
                                                <input type="text" className="form-control" id="PostalCode" name="PostalCode" 
                                                value={this.state.formdata.PostalCode} onChange={this.textHandler} placeholder="Enter Postal Code"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Country</label>
                                                <input type="text" className="form-control" id="Country" name="Country" 
                                                value={this.state.formdata.Country} onChange={this.textHandler} placeholder="Enter Country"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Phone No</label>
                                                <input type="text" className="form-control" id="Phone" name="Phone" 
                                                value={this.state.formdata.Phone} onChange={this.textHandler} placeholder="Enter Phone No"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Fax No</label>
                                                <input type="text" className="form-control" id="Fax" name="Fax" 
                                                value={this.state.formdata.Fax} onChange={this.textHandler} placeholder="Enter Fax"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                <h3 className="box-title">List Product</h3>
                                    <div className="box-tools">
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-btn">
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-create" style={{float : 'right'}}><i className="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product Name</th>
                                                <th>Supplier Name</th>
                                                <th>Category Name</th>
                                                <th>Quantity Per Unit</th>
                                                <th>Unit Price</th>
                                                <th>Unit In Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { 
                                                this.state.product.map((ele,x)=>
                                                    <tr key={ele._id}>
                                                        <td>{x+1}</td>
                                                        <td>{ele.ProductName}</td>
                                                        <td>{ele.SupplierName}</td>
                                                        <td>{ele.CategoryName}</td>
                                                        <td>{ele.QuantityPerUnit}</td>
                                                        <td>{ele.UnitPrice}</td>
                                                        <td>{ele.UnitInStock}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-info"  data-toggle="modal" data-target="#modal-view" style={{marginRight : '5px'}}><i className="fa fa-search"></i></button>
                                                            <button type="button" className="btn btn-success" onClick = {() => {this.editHandler(ele._id)}} style={{marginRight : '5px'}}><i className="fa fa-edit"></i></button>
                                                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modal-delete"><i className="fa fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="box-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    };
};

export default edit;