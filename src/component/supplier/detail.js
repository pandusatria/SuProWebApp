import React, { Component } from 'react';

class DetailClient extends Component{
    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Detail Supplier - {this.props.Supplier.Code}</h4>
                </div>
                <form>
                    <div className="modal-body">
                        <div className="box-body">
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Supplier Code</label>
                                    <input type="text" className="form-control" placeholder="Supplier Code" value={this.props.Supplier.Code} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input ref="CompanyName" type="text" className="form-control" placeholder="Company Name" id="CompanyName" name="CompanyName" value={this.props.Supplier.CompanyName} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Contact Title Name</label>
                                    <input ref="CompanyName" type="text" className="form-control" placeholder="Company Name" id="CompanyName" name="CompanyName" value={this.props.Supplier.CompanyName} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Contact Name</label>
                                    <input ref="ContactName" type="text" className="form-control" placeholder="Contact Name" id="ContactName" name="ContactName" value={this.props.Supplier.ContactName} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Contact Email</label>
                                    <input ref="ContactEmail" type="text" className="form-control" placeholder="Contact Email" id="ContactEmail" name="ContactEmail" value={this.props.Supplier.ContactEmail} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Contact Title</label>
                                    <input ref="ContactTitle" type="text" className="form-control" placeholder="Contact Title" id="ContactTitle" name="ContactTitle" value={this.props.Supplier.ContactTitle} disabled/>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input ref="Address" type="text" className="form-control" placeholder="Address" id="Address" name="Address" value={this.props.Supplier.Address} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input ref="City" type="text" className="form-control" placeholder="City" id="City" name="City" value={this.props.Supplier.City} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Postal Code</label>
                                    <input ref="PostalCode" type="text" className="form-control" placeholder="Postal Code" id="PostalCode" name="PostalCode" value={this.props.Supplier.PostalCode} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <input ref="Country" type="text" className="form-control" placeholder="Country" id="Country" name="Country" value={this.props.Supplier.Country} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Phone No</label>
                                    <input ref="Phone" type="text" className="form-control" placeholder="Phone" id="Phone" name="Phone" value={this.props.Supplier.Phone} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Fax No</label>
                                    <input ref="Fax" type="text" className="form-control" placeholder="Fax" id="Fax" name="Fax" value={this.props.Supplier.Fax} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default DetailClient