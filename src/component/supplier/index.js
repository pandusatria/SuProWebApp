import React, { Component } from 'react';
import supplierapi from '../../handler/supplier';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client : []
        };

        this.getAllSupplier = this.getAllSupplier.bind(this);
        this.editHandler = this.editHandler.bind(this);
    }

    editHandler(clientid){
        console.log("Klik Edit");
        console.log(this.props.history);
        localStorage.setItem('idSupplier', clientid); 
        console.log(localStorage.getItem('idSupplier')); 
        this.props.history.push("/edit");
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