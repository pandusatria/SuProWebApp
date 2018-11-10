import React, { Component } from 'react';
import AutoGen from '../../common/autoGenerateNumber';
import supplierapi from '../../handler/supplier';

class CreateSupplier extends Component{
    constructor (props){
        super(props);

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
            contactTitleNameList : [],
            errors: {}
        };

        this.submitHandler=this.submitHandler.bind(this);
        this.resetForm=this.resetForm.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.autoGenSupplier = this.autoGenSupplier.bind(this);
        this.getContactTitleName = this.getContactTitleName.bind(this);
    }

    resetForm() {
        this.setState({
            formdata:{
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
                ContactNameTitleId : ""
            },
            errors: {}
        });
    }

    handleValidation(){
        let fields = this.state.formdata;
        let errors = {};
        let formIsValid = true;

        if(typeof fields.CompanyName === "undefined" || fields.CompanyName === null ||  fields.CompanyName === ""){
            formIsValid = false;
            errors.CompanyName = "Nama Company tidak boleh kosong.";
        }

        if(typeof fields.ContactName === "undefined" || fields.ContactName === null ||  fields.ContactName === ""){
            formIsValid = false;
            errors.ContactName = "Nama Contact tidak boleh kosong.";
        }
        else
        {
            if(!fields.ContactName.match(/^[a-zA-Z\s]+$/)){
                formIsValid = false;
                errors.ContactName = "Nama Contact harus berupa huruf.";
            }
        }

        if(typeof fields.ContactEmail === "undefined" || fields.ContactEmail === null ||  fields.ContactEmail === "")
        {
        }
        else
        {
            if(!fields.ContactEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/)){
                formIsValid = false;
                errors.ContactEmail = "Mohon masukkan email yang valid.";
            }
        }

        if(typeof fields.Phone === "undefined" || fields.Phone === null ||  fields.Phone === "")
        {
        }
        else
        {
            if(!fields.Phone.match(/^[0-9() +-]+$/)){
                formIsValid = false;
                errors.Phone = "Mohon masukkan nomor telepon yang valid.";
            }
        }

        if(typeof fields.Fax === "undefined" || fields.Fax === null ||  fields.Fax === "")
        {
        }
        else
        {
            if(!fields.Fax.match(/^[0-9() +-]+$/)){
                formIsValid = false;
                errors.Fax = "Mohon masukkan nomor fax yang valid.";
            }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }

    async submitHandler() {
        if(this.handleValidation())
        {
            console.log(this.state.formdata);

            let result = await supplierapi.InsertNewSupplier(this.state.formdata);

            // Purpose Test
            // let result = {
            //   status : 200,
            //    message : "OK"
            // }

            if(result.status === 200)
            {
                console.log('Supplier - Create.js Debugger');
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(1, 'Success', this.state.formdata.Code);
            }
            else
            {
                console.log('Supplier - Create.js Debugger');
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(0, 'Failed', this.state.formdata.Code);
            }

            this.autoGenSupplier();
        }
    }

    async autoGenSupplier() {
        let result = await AutoGen.createCodeSupplier();
        console.log("autoGenSupplier");
        console.log(result);
        this.setState({
            formdata:{
                Code: result
            }
        });
    }

    async getContactTitleName(){
        let result = await supplierapi.GetListContactTitleName();

        if(result.status === 200)
        {
            console.log('Supplier - create.js Debugger');
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
        this.autoGenSupplier();
        this.getContactTitleName();
    }

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtn" onClick = {this.resetForm} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Add Supplier</h4>
                </div>
                <form>
                    <div className="modal-body">
                        <div className="box-body">
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Supplier Code</label>
                                    <input ref="Code" type="hidden" className="form-control" id="Code" name="Code" value={this.state.formdata.Code} onChange={this.textChanged}/>
                                    <input type="text" className="form-control" placeholder="Supplier Code" value={this.state.formdata.Code} disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input ref="CompanyName" type="text" className="form-control" placeholder="Company Name" 
                                    id="CompanyName" name="CompanyName" value={ this.state.formdata.CompanyName } onChange={ this.textChanged } required/>
                                    <span className="help-block" style={{color: "red"}}>{this.state.errors.CompanyName}</span>
                                </div>
                                <div className="form-group">
                                    <label>Contact Title Name</label>
                                    <select style= {{ marginTop : '10px'}} ref="ContactNameTitleId" className="form-control" id="ContactNameTitleId" name="ContactNameTitleId" value={this.state.formdata.ContactNameTitleId} onChange={this.textChanged}>
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
                                    <input ref="ContactName" type="text" className="form-control" placeholder="Contact Name" 
                                    id="ContactName" name="ContactName" value={this.state.formdata.ContactName} onChange={this.textChanged} required/>
                                    <span className="help-block" style={{color: "red"}}>{this.state.errors.ContactName}</span>
                                </div>
                                <div className="form-group">
                                    <label>Contact Email</label>
                                    <input ref="ContactEmail" type="text" className="form-control" placeholder="Contact Email" 
                                    id="ContactEmail" name="ContactEmail" value={this.state.formdata.ContactEmail} onChange={this.textChanged} required/>
                                    <span className="help-block" style={{color: "red"}}>{this.state.errors.ContactEmail}</span>
                                </div>
                                <div className="form-group">
                                    <label>Contact Title</label>
                                    <input ref="ContactTitle" type="text" className="form-control" placeholder="Contact Title" 
                                    id="ContactTitle" name="ContactTitle" value={this.state.formdata.ContactTitle} onChange={this.textChanged} required/>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input ref="Address" type="text" className="form-control" placeholder="Address" 
                                    id="Address" name="Address" value={this.state.formdata.Address} onChange={this.textChanged} required/>
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input ref="City" type="text" className="form-control" placeholder="City" 
                                    id="City" name="City" value={this.state.formdata.City} onChange={this.textChanged} required/>
                                </div>
                                <div className="form-group">
                                    <label>Postal Code</label>
                                    <input ref="PostalCode" type="text" className="form-control" placeholder="Postal Code" 
                                    id="PostalCode" name="PostalCode" value={this.state.formdata.PostalCode} onChange={this.textChanged} required/>
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <input ref="Country" type="text" className="form-control" placeholder="Country" 
                                    id="Country" name="Country" value={this.state.formdata.Country} onChange={this.textChanged} required/>
                                </div>
                                <div className="form-group">
                                    <label>Phone No</label>
                                    <input ref="Phone" type="text" className="form-control" placeholder="Phone" 
                                    id="Phone" name="Phone" value={this.state.formdata.Phone} onChange={this.textChanged} required/>
                                    <span className="help-block" style={{color: "red"}}>{this.state.errors.Phone}</span>
                                </div>
                                <div className="form-group">
                                    <label>Fax No</label>
                                    <input ref="Fax" type="text" className="form-control" placeholder="Fax" 
                                    id="Fax" name="Fax" value={this.state.formdata.Fax} onChange={this.textChanged} required/>
                                    <span className="help-block" style={{color: "red"}}>{this.state.errors.Fax}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" data-dismiss="modal" onClick = {this.resetForm}>Close</button>
                        <button type="button" className="btn btn-primary" onClick = {this.submitHandler}>Save</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default CreateSupplier