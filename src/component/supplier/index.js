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
            startDate : moment()
        };

        this.getAllSupplier = this.getAllSupplier.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    editHandler(clientid){
        console.log("Klik Edit");
        console.log(this.props.history);
        localStorage.setItem('idSupplier', clientid); 
        console.log(localStorage.getItem('idSupplier')); 
        this.props.history.push("/supplier/edit/" + clientid);
    }

    handleChange(date) {
        this.setState({
            startDate: date
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
                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" placeholder="Company Name"/>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" placeholder="Contact Name"/>
                                        </div>
                                        <div className="col-md-2">
                                            <div class="input-group date">
                                                 <div class="input-group-addon">
                                                    <i class="fa fa-calendar"></i>
                                                </div>
                                                <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChange}
                                                    className="form-control pull-right"
                                                    fixedHeight
                                                    dateFormat="DD/MM/YYYY"
                                                    id="datepicker"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" placeholder="Created By"/>
                                        </div>
                                        <div className="col-md-1">
                                            <button type="button" className="btn btn-warning" style={{float : 'right'}}>Search</button>
                                        </div>
                                    </div>
                                </div>
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