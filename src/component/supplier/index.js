import React, { Component } from 'react';
import supplierapi from '../../handler/supplier';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import CreateSupplier from './create';
import { AlertList } from "react-bs-notifier";


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
            createdDate : '',
            alertData: {
                status: 99,
                message: ''
            },
            alerts : []
        };

        this.getAllSupplier = this.getAllSupplier.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.textHandler = this.textHandler.bind(this);
        this.searchSupplier = this.searchSupplier.bind(this);
        this.modalStatus = this.modalStatus.bind(this);
        this.onAlertDismissed = this.onAlertDismissed.bind(this);
    }

    onAlertDismissed(alert) {
		const alerts = this.state.alerts;
		const idx = alerts.indexOf(alert);

		if (idx >= 0) {
			this.setState({
				alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
			});
		}
	}

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

    modalStatus(status, message, code) {
        this.getAllSupplier();
        this.setState({
            alertData : {
                status : status,
                message : message
            }
        });

        if(status === 1)
        {
            this.setState({
                alerts : [{
                    key : 1,
                    type: "success",
                    headline: "Good Job!",
                    message: "Process successfully with Supplier Code " + code
                }]
            });
        }
        else if(status === 0)
        {
            this.setState({
                alerts : [{
                    key : 2,
                    type: "danger",
                    headline: "Whoa!",
                    message: "Process failed! with Supplier Code " + code
                }]
            });
        }

        console.log("Check Modal Status");
        console.log(this.state.alertData.status);
        console.log(this.state.alertData.message);
    }

    async searchSupplier() {
        var query = [];
        
        console.log("search" + this.state.formdata);
        console.log(this.state.formdata.companyName);
        console.log(this.state.formdata.contactName);
        console.log(this.state.formdata.createdBy);
        console.log(this.state.createdDate._d);

        query.push("{ is_delete : false }");
            
        if(this.state.formdata.companyName === '' || this.state.formdata.companyName === null || typeof this.state.formdata.companyName === undefined || this.state.formdata.companyName === undefined){
        } 
        else
        {
            query.push("{ companyName : '" + this.state.formdata.companyName + "'}");
        }

        if(this.state.formdata.contactName === '' || this.state.formdata.contactName === null || typeof this.state.formdata.contactName === undefined || this.state.formdata.contactName === undefined) { 
        } 
        else
        {
            query.push("{ contactName : '" + this.state.formdata.contactName + "'}");
        }

        if(this.state.formdata.createdBy === '' || this.state.formdata.createdBy === null || typeof this.state.formdata.createdBy === undefined || this.state.formdata.createdBy === undefined) {
        } 
        else
        {
            query.push("{ createdBy : '" + this.state.formdata.createdBy + "'}");
        }

        if(this.state.createdDate._d === '' || this.state.createdDate._d === null || typeof this.state.createdDate._d === undefined || this.state.createdDate._d === undefined) {
        } 
        else
        {
            query.push("{ createdDate : '" + this.state.createdDate._d + "'}");
        }

        console.log(query);

        let result = await supplierapi.GetAllSupplierHandlerSearch(query);
    }

    async getAllSupplier() {
        let result = await supplierapi.GetAllSupplierHandler();

        if(result.status === 200)
        {
            console.log('Client - Index.js Debugger : getAllSupplier');
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

                {
                    (this.state.alertData.status === 1) ? <AlertList alerts={this.state.alerts} timeout={250} onDismiss={this.onAlertDismissed.bind(this)}/> :''
                }
                {
                    (this.state.alertData.status === 0) ? <AlertList alerts={this.state.alerts} timeout={250} onDismiss={this.onAlertDismissed.bind(this)}/> :''
                }

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
                                                <th>Supplier Code</th>
                                                <th>Company Name</th>
                                                <th>Contact Name</th>
                                                <th>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.client.map((ele,x)=>
                                                    <tr key={ele._id}>
                                                        <td>{x+1}</td>
                                                        <td>{ele.Code}</td>
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
                <div className="modal fade" id="modal-create">
                    <div className="modal-dialog">
                            <CreateSupplier
                                modalStatus = {this.modalStatus}
                            />
                    </div>
                </div>
            </div>
        )
    }
};

export default index