import React, { Component } from 'react';
import supplierapi from '../../handler/supplier';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client : [],
            formdata : {
                companyName : '',
                contactName : '',
                createdBy : ''
            },
            createdDate : ''
        };

        this.getAllSupplier = this.getAllSupplier.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.textHandler = this.textHandler.bind(this);
        this.searchSupplier = this.searchSupplier.bind(this);
    };

    editHandler(clientid){
        console.log("Klik Edit");
        console.log(this.props.history);
        localStorage.setItem('idSupplier', clientid); 
        console.log(localStorage.getItem('idSupplier')); 
        this.props.history.push("/supplier/edit/" + clientid);
    }

    handleChangeDate(date) {
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            createdDate: date
        });
    }

    textHandler(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }

    async searchSupplier() {
        let currentList = this.state.client;
        let array = [];
        console.log(this.state.formdata.companyName);
        console.log(this.state.formdata.contactName);
        console.log(this.state.formdata.createdBy);
        console.log(this.state.createdDate._d);

        for(let i = 0; i < currentList.length; i++)
        {
            if(currentList[i].CompanyName == this.state.formdata.companyName)
            {
                 array.push(currentList[i]);
            }
            else if(currentList[i].ContactName == this.state.formdata.contactName)
            {
                array.push(currentList[i]);
            }
            else if(currentList[i].CreatedDate == this.state.createdDate._d)
            {
                array.push(currentList[i]);
            }
            else if(currentList[i].CreatedBy == this.state.formdata.createdBy)
            {
                array.push(currentList[i]);
            }
        }

        console.log(array);

        this.setState({
            client: array
        });
    }

    async getAllSupplier() {
        let result = await supplierapi.GetAllSupplierHandler();

        if(result.status === 200)
        {
            console.log('Client - Index.js Debugger');
            console.log(result.message);
            this.setState({
                client: result.message
            });
        }
        else
        {
            console.log(result.message);
        }
    }

    componentDidMount(){
        this.getAllSupplier();
        localStorage.removeItem('idSupplier');
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Supplier
                        <small>list supplier</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> App</a></li>
                        <li><a href="#">Supplier</a></li>
                        <li className="active">List</li>
                    </ol>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">List All Supplier</h3>
                                    <div className="box-tools">
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-btn">
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-create" style={{float : 'right'}}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form>
                                    <div className="box-header">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <input type="text" className="form-control" id="companyName" name="companyName" value={this.state.formdata.companyName} onChange={this.textHandler} placeholder="Company Name"/>
                                            </div>
                                            <div className="col-md-3">
                                                <input type="text" className="form-control" id="contactName" name="contactName" value={this.state.formdata.contactName} onChange={this.textHandler} placeholder="Contact Name"/>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="input-group date">
                                                    <DatePicker
                                                        selected={this.state.createdDate}
                                                        onChange={this.handleChangeDate}
                                                        className="form-control pull-right"
                                                        fixedHeight
                                                        dateFormat="DD/MM/YYYY"
                                                        id="datepicker"
                                                        name="datepicker"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        placeholderText = "Created Date"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <input type="text" className="form-control" id="createdBy" name="createdBy" value={this.state.formdata.createdBy} onChange={this.textHandler} placeholder="Created By"/>
                                            </div>
                                            <div className="col-md-1">
                                                <div className="input-group-btn">
                                                    <button type="button" className="btn btn-warning" onClick={this.searchSupplier} style={{float : 'right'}}>Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>CompanyName</th>
                                                <th>Contact Name</th>
                                                <th>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.client.map((ele,x)=>
                                                    <tr key={ele._id}>
                                                        <td>{x+1}</td>
                                                        <td>{ele.CompanyName}</td>
                                                        <td>{ele.ContactName}</td>
                                                        <td>{ele.FullAddress}</td>
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
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
};

export default index