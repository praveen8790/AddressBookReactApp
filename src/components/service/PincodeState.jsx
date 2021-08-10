import React from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import '../../assets/css/pincode.css'

export default class Pincode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pincode: this.props.pinValue,
            city: "",
            state: "",
            error: ""
        };
    }
    componentDidMount() {
        console.log(this.props.pinValue)
        this.setState({pincode:this.props.pinValue},()=>{
            if(this.state.pincode !== undefined) {
                if (this.state.pincode.length === 6) {
                    this.setState({
                        error: ""
                    });
                    axios
                        .get(`https://api.postalpincode.in/pincode/${this.state.pincode}`)
                        .then(res =>
                            this.setState({
                                state: res.data[0].PostOffice[0].State,
                                city: res.data[0].PostOffice[0].Block,
                            })
                        )
                        .then(() => {
                            document.getElementById("pincode").classList.remove("error");
                        })
                        .catch(err => {
                            document.getElementById("pincode").className = "error";
                            this.setState({
                                error: "Invalid PIN Code"
                            });
                        });
                }
                if (this.state.pincode.length !== 6) {
                    this.setState({
                        city: "",
                        state: "",
                        error: "ZIP code must be of 6 digits"
                    });
                }
            }
        })
    }
    value_r=()=>{
        var obj={
            zip:this.state.pincode,
            state:this.state.state,
            city:this.state.city
        }
        this.props.retrieveValue(obj)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.value.length === 6) {
            this.setState({
                error: ""
            });
            axios
                .get(`https://api.postalpincode.in/pincode/${e.target.value}`)
                .then(res =>
                    this.setState({
                        state: res.data[0].PostOffice[0].State,
                        city: res.data[0].PostOffice[0].Block,
                    },()=>{this.value_r()})
                )
                .then(() => {
                    document.getElementById("pincode").classList.remove("error");
                })
                .catch(err => {
                    document.getElementById("pincode").className = "error";
                    this.setState({
                        error: "Invalid PIN Code"
                    });
                });
        }
        if (e.target.value.length !== 6) {
            this.setState({
                city: "",
                state: "",
                error: "ZIP code must be of 6 digits"
            });
        }
    }

    render() {
        return (
            <div style={this.props.Container} className="row-content">
                {this.state.error ? (
                    <span className="error-display">{this.state.error}</span>
                ) : null}
                <div style={this.props.pincodeContainer} className="column-content">
                    <label className="label text">Pin code</label>
                    <input className="input_i"
                        maxLength={6}
                        minLength={6}
                        onChange={(e) => this.onChange(e)}
                        name="pincode"
                        placeholder=" "
                        value={this.state.pincode}
                        id="pincode"
                        type="number"
                        required
                    />
                    <span class="highlight"></span>

                </div>
                <div style={this.props.cityContainer} className="column-content">

                    <label className="label text">City</label>
                    <input
                        className="input_i"
                        type="String"
                        readonly
                        placeholder=" "
                        value={this.state.city}
                        required
                    />

                </div>

                <div style={this.props.stateContainer} className="column-content">
                    <label className="label text">State</label>
                    <input
                        className="input_i"
                        type="String"
                        placeholder=" "
                        readonly
                        value={this.state.state}
                        required
                    />

                </div>
            </div>
        );
    }
}