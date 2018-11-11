import React, { Component } from 'react';
import productapi from '../../handler/product';
import supplierapi from '../../handler/supplier';

// React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class edit extends Component {
    idx = 0;
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
                ContactNameTitleId : "",
                DetailProduct : [{
                    _id             :  "",
                    ProductName     :  "",
                    CategoryName    :  "",
                    QuantityPerUnit :  "",
                    UnitPrice       :  "",
                    UnitInStock     :  ""
                }]
            },
            contactTitleNameList : [],
            categories: [
                    { _id: 1, name: 'Beverages', deskripsi : 'Beverages' },
                    { _id: 2, name: 'Condiments', deskripsi : 'Condiments' },
                    { _id: 3, name: 'Dairy Products', deskripsi : 'Dairy Products' },
                    { _id: 4, name: 'Seafood', deskripsi : 'Seafood' },
            ],
            errors: {}
        };

        this.textHandler = this.textHandler.bind(this);
        this.getContactTitleName = this.getContactTitleName.bind(this);
        this.getDetailSupplierAllProductBySupplierID = this.getDetailSupplierAllProductBySupplierID.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.addRow = this.addRow.bind(this);
        this.rowHandleChange = this.rowHandleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    textHandler(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }

    rowHandleChange = index => e => {
        const { name, value } = e.target;
        var currDetail = this.state.formdata;
        var product = currDetail.DetailProduct.find(o => o._id === index);
        product[name] = value;

        this.setState({
            formdata: currDetail
        });

        console.log("rowHandleChange");
        console.log("idx : " + index);
        console.log("name : " + name);
        console.log("value : " + value);
    };

    deleteRow(index){
        var currDetail =this.state.formdata;
        const selectIdx = currDetail.DetailProduct.findIndex(u => u._id === index);
        currDetail.DetailProduct.splice(selectIdx, 1);
        this.setState({
            formdata: currDetail
        });
    }

    addRow(){
        var currDetail =this.state.formdata;
        let _id = this.idx + 1;
        this.idx = this.idx + 1;

        var newProduct = {
            _id             : _id,
            ProductName     :  "",
            CategoryName    :  "",
            QuantityPerUnit :  "",
            UnitPrice       :  0,
            UnitInStock     :  0
        };

        currDetail.DetailProduct.push(newProduct);
        this.setState({
            formdata: currDetail
        });
    }

    async getDetailSupplierAllProductBySupplierID(id) {
        let result = await supplierapi.GetDetailSupplierAllProductBySupplierID(id);
        let currSuplier = {};

        if(result.status === 200)
        {
            console.log('Supplier - Edit.js Debugger');
            console.log("getProductBySupplierID");
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

    async getContactTitleName(){
        let result = await supplierapi.GetListContactTitleName();

        if(result.status === 200)
        {
            console.log('Supplier - edit.js Debugger');
            console.log("getContactTitleName");
            console.log(result);
            console.log(result.message);

            this.setState({
                contactTitleNameList: result.message
            });
        }
        else
        {
            console.log(result.message);
        }
    }

    async submitHandler() {
        console.log(this.state.formdata);

        var id = localStorage.getItem('idSupplier');
        let result = await supplierapi.EditSupplierProduct(this.state.formdata, id);

        if(result.status === 200)
        {
            console.log('Supplier - Edit.js Success Debugger');
            console.log(result.message);
            this.props.history.push('/supplier/list');
        }
        else
        {
            console.log('Supplier - Edit.js Failed Debugger');
            console.log(result.message);
        }
    }

    componentDidMount(){
        console.log('Supplier - componentDidMount Debugger');
        var id = localStorage.getItem('idSupplier');
        this.getDetailSupplierAllProductBySupplierID(id);
        this.getContactTitleName();
    }

    render(){
        const { categories } = this.state;
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
                     <form>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Edit Supplier - {this.state.formdata.Code}</h3>
                                    </div>
                                        <div className="box-body">
                                            <div className="col-xs-6">
                                                <div className="form-group">
                                                    <label>Supplier Code</label>
                                                    <input ref="Code" type="hidden" className="form-control" id="Code" name="Code" value={this.state.formdata.Code} onChange={this.textChanged}/>
                                                    <input type="text" className="form-control" placeholder="Supplier Code" value={this.state.formdata.Code} disabled/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Company Name</label>
                                                    <input ref="CompanyName" type="text" className="form-control" id="CompanyName" name="CompanyName" 
                                                    value={this.state.formdata.CompanyName} onChange={this.textHandler} placeholder="Enter Company Name"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Contact Title Name</label>
                                                    <select style= {{ marginTop : '10px'}} ref="ContactNameTitleId" className="form-control" id="ContactNameTitleId" name="ContactNameTitleId" value={ this.state.formdata.ContactNameTitleId } onChange={ this.textChanged }>
                                                        <option value="">Select Contact Title Name</option>
                                                        {
                                                            this.state.contactTitleNameList.map((elemen) =>
                                                                <option key={ elemen._id } value={ elemen._id }> { elemen.Name } </option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Contact Name</label>
                                                    <input type="text" ref="ContactName" className="form-control" id="ContactName" name="ContactName" 
                                                    value={this.state.formdata.ContactName} onChange={this.textHandler} placeholder="Enter Contact Name"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Contact Email</label>
                                                    <input type="text" ref="ContactEmail" className="form-control" id="ContactEmail" name="ContactEmail" 
                                                    value={this.state.formdata.ContactEmail} onChange={this.textHandler} placeholder="Enter Contact Email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Contact Title</label>
                                                    <input type="text" ref="ContactTitle" className="form-control" id="ContactTitle" name="ContactTitle" 
                                                    value={this.state.formdata.ContactTitle} onChange={this.textHandler} placeholder="Enter Contact Title"/>
                                                </div>
                                            </div>
                                            <div className="col-xs-6">
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <input type="text" ref="Address" className="form-control" id="Address" name="Address" 
                                                    value={this.state.formdata.Address} onChange={this.textHandler} placeholder="Enter Address"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>City</label>
                                                    <input type="text" ref="City" className="form-control" id="City" name="City" 
                                                    value={this.state.formdata.City} onChange={this.textHandler} placeholder="Enter City"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Postal Code</label>
                                                    <input type="text" ref="PostalCode" className="form-control" id="PostalCode" name="PostalCode" 
                                                    value={this.state.formdata.PostalCode} onChange={this.textHandler} placeholder="Enter Postal Code"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Country</label>
                                                    <input type="text" ref="Country" className="form-control" id="Country" name="Country" 
                                                    value={this.state.formdata.Country} onChange={this.textHandler} placeholder="Enter Country"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Phone No</label>
                                                    <input type="text" ref="Phone" className="form-control" id="Phone" name="Phone" 
                                                    value={this.state.formdata.Phone} onChange={this.textHandler} placeholder="Enter Phone No"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Fax No</label>
                                                    <input type="text" ref="Fax" className="form-control" id="Fax" name="Fax" 
                                                    value={this.state.formdata.Fax} onChange={this.textHandler} placeholder="Enter Fax"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-footer">
                                        </div>
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
                                                <button type="button" className="btn btn-primary" onClick = {() => {this.addRow()}} style={{float : 'right'}}><i className="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product Name</th>
                                                <th>Category Name</th>
                                                <th>Quantity Per Unit</th>
                                                <th>Unit Price</th>
                                                <th>Unit In Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { 
                                                this.state.formdata.DetailProduct.map((ele,x)=>
                                                    <tr id="addr0" key={ele._id}>
                                                        <td>{x+1}</td>
                                                        <td>
                                                            <input
                                                            type="text"
                                                            name="ProductName"
                                                            value={this.state.formdata.DetailProduct[x].ProductName}
                                                            onChange={this.rowHandleChange(ele._id)}
                                                            className="form-control"
                                                            />
                                                        </td>
                                                        <td>
                                                            <select
                                                            className="form-control" 
                                                            name="CategoryName" 
                                                            value={this.state.formdata.DetailProduct[x].CategoryName}
                                                            onChange={this.rowHandleChange(ele._id)}>
                                                                <option value="">Select Category</option>
                                                                {
                                                                    categories.map((elemen) =>
                                                                        <option key={ elemen.name } value={ elemen.name }> { elemen.deskripsi } </option>
                                                                    )
                                                                }
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input
                                                            type="text"
                                                            name="QuantityPerUnit"
                                                            value={this.state.formdata.DetailProduct[x].QuantityPerUnit}
                                                            onChange={this.rowHandleChange(ele._id)}
                                                            className="form-control"
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                            type="number"
                                                            name="UnitPrice"
                                                            value={this.state.formdata.DetailProduct[x].UnitPrice}
                                                            onChange={this.rowHandleChange(ele._id)}
                                                            className="form-control"
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                            type="number"
                                                            name="UnitInStock"
                                                            value={this.state.formdata.DetailProduct[x].UnitInStock}
                                                            onChange={this.rowHandleChange(ele._id)}
                                                            className="form-control"
                                                            />
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger" onClick = {() => {this.deleteRow(ele._id)}}><i className="fa fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="box-footer">
                                    <button type="button" onClick = {this.submitHandler} className="btn btn-primary">Submit</button>
                                    <br></br>
                                    <br></br>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    </form>
                </section>
            </div>
        )
    };
};

export default edit;