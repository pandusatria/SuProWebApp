import React, { Component } from 'react';
import productapi from '../../handler/product';
import supplierapi from '../../handler/supplier';

// React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class edit extends Component {

    idx = 0;

    ProductModel = {
        _id             :  0,
        ProductName     :  "",
        CategoryName    :  "",
        QuantityPerUnit :  "",
        UnitPrice       :  0,
        UnitInStock     :  0
    };

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
                DetailProduct : []
            },
            contactTitleNameList : [],
            errors: {}
        };

        this.textHandler = this.textHandler.bind(this);
        this.getContactTitleName = this.getContactTitleName.bind(this);
        this.getDetailSupplierAllProductBySupplierID = this.getDetailSupplierAllProductBySupplierID.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.addRow = this.addRow.bind(this);
    }

    textHandler(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }

    deleteRow(index) {
        var currProduct = [...this.state.formdata.DetailProduct];
        const selectIdx = currProduct.findIndex(u => u._id === index);
        currProduct.splice(selectIdx, 1);
        this.setState({
            formdata: {
                DetailProduct : currProduct
            }
        });
    }

    addRow() {
        var currProduct = [...this.state.formdata.DetailProduct];
        let _id = this.idx + 1;
        this.idx = this.idx + 1;

        var newProduct = {
            _id             :  _id,
            ProductName     :  "",
            CategoryName    :  "",
            QuantityPerUnit :  "",
            UnitPrice       :  0,
            UnitInStock     :  0
        };

        currProduct.push(newProduct);
        this.setState({
            formdata: {
                DetailProduct : currProduct
            }
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

    componentDidMount(){
        console.log('Supplier - componentDidMount Debugger');
        var id = localStorage.getItem('idSupplier');
        this.getDetailSupplierAllProductBySupplierID(id);
        this.getContactTitleName();
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
                                    <h3 className="box-title">Edit Supplier - {this.state.formdata.Code}</h3>
                                </div>
                                <form>
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
                                                <button type="button" className="btn btn-primary" onClick = {() => {this.addRow()}} style={{float : 'right'}}><i className="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="box-body table-responsive no-padding">
                                <ReactTable
                                    data ={ this.state.formdata.DetailProduct }
                                    columns={[
                                        {
                                            Header: "Product Name",
                                            id: "ProductName",
                                            accessor: "ProductName"
                                        },
                                        {
                                            Header: "Category Name",
                                            id: "CategoryName",
                                            accessor: "CategoryName"
                                        },
                                        {
                                            Header: "Quantity Per Unit",
                                            id: "QuantityPerUnit",
                                            accessor: "QuantityPerUnit"
                                        },
                                        {
                                            Header: "Unit Price",
                                            id: "UnitPrice",
                                            accessor: "UnitPrice"
                                        },
                                        {
                                            Header: "Unit In Stock",
                                            id: "UnitInStock",
                                            accessor: "UnitInStock"
                                        },
                                        {
                                            Header: "Action",
                                            id : "_id",
                                            Cell: row => (
                                                <div>
                                                     <button type="button" className="btn btn-success"style={{marginRight : '5px'}}><i className="fa fa-edit"></i></button>
                                                     <button type="button" className="btn btn-danger" onClick = {() => {this.deleteRow(this.id)}}><i className="fa fa-trash"></i></button>
                                                </div>
                                            )
                                        }
                                    ]}
                                    defaultPageSize={5}
                                    className="-striped -highlight"
                                />
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