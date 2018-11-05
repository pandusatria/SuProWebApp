import React, { Component } from 'react';
import AutoGen from '../../common/autoGenerateNumber';

class CreateSupplier extends Component{
    constructor (props){
        super(props);

        this.state={
            formdata:{
                SupplierCode:'',
                CompanyName:''
            },
            errors: {}
        };

        this.submitHandler=this.submitHandler.bind(this);
        this.resetForm=this.resetForm.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.autoGenSupplier = this.autoGenSupplier.bind(this);
    }

    resetForm() {
        this.setState({
            formdata:{
                SupplierCode: '',
                CompanyName:''
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
        console.log(this.state.formdata);
    }

    async autoGenSupplier() {
        let result = await AutoGen.createCodeSupplier();
        console.log("autoGenSupplier");
        console.log(result);
        this.setState({
            formdata:{
                SupplierCode: result
            }
        });
    }

    componentDidMount(){
        this.autoGenSupplier();
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
                             <div className="form-group">
                                <label>Supplier Code</label>
                                <input ref="SupplierCode" type="text" className="form-control" placeholder="Supplier Code" 
                                name="SupplierCode" value={this.state.formdata.SupplierCode} onChange={this.textChanged} required/>
                                <span className="help-block" style={{color: "red"}}>{this.state.errors.SupplierCode}</span>
                            </div>
                            <div className="form-group">
                                <label>Company Name</label>
                                <input ref="CompanyName" type="text" className="form-control" placeholder="Company Name" 
                                name="CompanyName" value={this.state.formdata.CompanyName} onChange={this.textChanged} required/>
                                <span className="help-block" style={{color: "red"}}>{this.state.errors.CompanyName}</span>
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