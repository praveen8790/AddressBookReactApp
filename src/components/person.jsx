import cancelicon from '../assets/icons/cancel-3.png'
import React, {Component} from 'react';
import '../assets/css/person.css'
import Pincode from './service/PincodeState';

import AddressbookService from "./service/addressbookService";

export class Person extends Component {
    setForm =()=>{
        this.setState({
            id:this.props.persondata._id,
            name:this.props.persondata._name,
            mobile:this.props.persondata._mobile,
            address:this.props.persondata._address,
            city:this.props.persondata._city,
            state:this.props.persondata._state,
            zip:this.props.persondata._pin,
        })
    };
    constructor() {
        super();
        this.state={
            id:0,
            name:'',
            mobile:'',
            address:'',
            city:'',
            state:'',
            zip:'',
            nameError: '',
            isError:'',
        }
        console.log("hi")
    }
    componentDidMount() {
        console.log(this.props.isUpdate)
        if(this.props.isUpdate){
            this.setForm()
        }
    }

    cancel =()=>{
        this.props.oncancel()
        window.location.reload();

    }
    onsave=async (event)=>{
        event.preventDefault();
        let object={
            _id:this.state.id,
            _name:this.state.name,
            _mobile:this.state.mobile,
            _address:this.state.address,
            _city:this.state.city,
            _state:this.state.state,
            _pin:this.state.zip
        }
        console.log(object)
        if(this.props.isUpdate){
            new AddressbookService().updatePerson(object).then(responseText => {
                console.log("data updated successfully" +JSON.stringify(responseText.data));
                this.cancel()
            })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            new AddressbookService().addPersom(object).then(responseText => {
                console.log("data added successfully" + JSON.stringify(responseText.data));
                this.cancel()
            })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    valueRetriever=(obj)=>{
        console.log(obj)
        this.setState({state:obj.state,zip:obj.zip,city:obj.city})
    }
    render() {
        return (
           <div>
                <div className="form-head">
                    <form-head-1>PERSON ADDRESS FORM
                        <img id="cancel" src={cancelicon}
                             style={{width: "24px", height: "24px"}} onClick={this.cancel}/>
                    </form-head-1>
                </div>

                <div className="form-content">
                    <form className="form" action="#" onSubmit={this.onsave}>
                        <div className="column-content">
                            <label className="label text" htmlFor="name">Full Name</label>
                            <input className="input"  value={this.state.name} type="text" id="name" name="name" onChange={this.nameChange} required />
                            <error-output className="text-error" htmlFor="text">{this.state.nameError}</error-output>
                        </div>
                        <div className="column-content">
                            <label className="label text"  htmlFor="mobile">Mobile Number</label>
                            <input className="input" type="text" value={this.state.mobile} id="mobile" name="mobile" required onChange={this.mobileChange}/>
                            <error-output id="number-error" className="text-error" htmlFor="text"></error-output>
                        </div>
                        <div className="column-content">
                            <label className="label text"  htmlFor="address">Address</label>
                            <input className="input" type="text" value={this.state.address} id="address" name="address" style={{height: "80px"}}
                                   required onChange={this.addressChange}/>
                        </div>
                        <div className="row-content">
                            {/*<div className="column-content">*/}
                            {/*    <label className="label text" htmlFor="city">city</label>*/}
                            {/*    <input className="input" type="text" value={this.state.city} id="city" name="city" onChange={this.cityChange} required />*/}
                            {/*</div>*/}
                            {/*<div className="column-content">*/}
                            {/*    <label className="label text" htmlFor="state">state</label>*/}
                            {/*    <input className="input" type="text" id="state" value={this.state.state} name="state"onChange={this.stateChange} required />*/}
                            {/*</div>*/}
                            {/*<div className="column-content">*/}
                            {/*    <label className="label text" htmlFor="zip">zip</label>*/}
                            {/*    <input className="input" type="text" id="zip" name="zip" value={this.state.zip} onChange={this.zipChange}required />*/}
                            {/*</div>*/}
                            <Pincode pinValue={this.props.persondata._pin} retrieveValue={this.valueRetriever.bind(this)} />
                        </div>
                        <div className="buttonParent">
                            <div className="submit-reset">
                                <button type="submit" className="button submitButton" id="submitButton" onClick={this.onsave}>Add</button>
                                <button type="reset" className="resetButton button">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
           </div>
        );
    }
    nameChange = (e) => {
        this.setState({name:e.target.value})
        const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(nameRegex.test(e.target.value)){
            this.setState({nameError: ''})
            this.setState({isError:false})
            this.setState({name:e.target.value});
        }else{
            this.setState({nameError:'Invalid Name'});
            this.setState({isError:true})
        }
    }
    mobileChange=(e)=>{
        this.setState({mobile:e.target.value})
    }
    addressChange=(e)=>{
        this.setState({address:e.target.value})
    }

}
