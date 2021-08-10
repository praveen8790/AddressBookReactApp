import React, {Component} from 'react';
import logo from '../assets/icons/addressbook-4.png'
import '../assets/css/dashboard.css'
import addicon from '../assets/icons/add-24px.svg'
import {Person} from "./person";
import Modal from 'react-modal';
import AddressbookService from "./service/addressbookService";
import Display from './addressbook'

export default class Dashboard extends Component {

    constructor() {
        super();
        this.state={
            isModalOpen:false,
            addressbook:[],
            isUpdate:false,
            person:''
        }
        this.addressbookService=new AddressbookService()
    }
    getPersons=()=>{
        this.addressbookService.getPersons()
            .then(responseDTO => {
                let responseData = responseDTO;
                console.log("Data received after GET Call :\n" + responseData.data);
                this.setState({addressbook: responseData.data},()=>console.log(this.state.addressbook));
            }).catch(errror => {
            console.log("Error while fetching Employee List\nError : " + JSON.stringify(errror));
        })
    }
    head =()=>{
        return(
            <header className="header-content header">
            <div className="logo-content">
                <img src={logo} style={{width: "43px",height: "43px"}} alt="" />
                    <div>
                        <span className="emp-text">ADDRESS</span><br/>
                        <span className="emp-text emp-payroll">BOOK</span>
                    </div>
            </div>
        </header>
    )
    }
    addModalRef = () =>{
        this.setState({isModalOpen:!this.state.isModalOpen})
    };
    customStyles = {
        content: {
            top: '15%',
            left: '25%',
            right: '25%',
            bottom: '5%',
            overflow:'hidden',
            border:'none',
            padding:'none',
            background:'none',

        }
    };
    componentDidMount() {
        this.getPersons();
    }
    onUpdateFunc=(data)=>{
        this.setState({isUpdate:true},()=>this.setState({person:data},()=> {
            console.log(this.state.person)
            this.addModalRef()
        }))
    };
    render() {
        return (
            <div>
                <this.head />
                <div className="main-content">
                    <div className="header-content">
                        <div className="emp-detail-text"> Person Details
                            <div className="emp-count">{this.state.addressbook.length}</div>
                        </div>

                        <button className="add-button" onClick={this.addModalRef}>
                            <img src={addicon} alt="" style={{width: "16px", height: "17px"}} />Add
                                Person
                        </button>
                        <Modal isOpen={this.state.isModalOpen}
                               style={this.customStyles} onRequestClose={this.addModalRef} closeTimeoutMS={500}>
                            <Person oncancel={this.addModalRef.bind(this)} isUpdate={this.state.isUpdate} persondata={this.state.person}/>
                        </Modal>
                    </div>
                        <div className="table-main">
                            <table id="display" className="table">

                                <Display addressbook = {this.state.addressbook} onUpdate={this.onUpdateFunc.bind(this)}/>
                            </table>
                        </div>

                </div>
            </div>
        );
    }
}
