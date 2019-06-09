import React, { Component } from 'react';
import FormField from './../widgets/formtemplate/formfield';
import {firebase} from './../../firebase';
class SingIn extends Component{
    state={
        registerError:'',
        loading:false,
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email address'
                },validation:{
                    required:true,
                    email:true
                },valid:false,
                touched:false,
                validationMSg:''
            },
             password: {
                 element: 'input',
                 value: '',
                 config: {
                     name: 'password_input',
                     type: 'password',
                     placeholder: 'Enter your password'
                 },
                 validation: {
                     required: true,
                     password: true
                 },
                 valid: false,
                 touched: false,
                 validationMSg :''
             }
        }
    }
    updateForm(e){
        const newFormData={
            ...this.state.formdata
        }
        const newElement={
            ...newFormData[e.id]
        }
        newElement.value=e.event.target.value;
        
        if(e.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMsg = validData[1];
        }
        newElement.touched = e.blur;

        newFormData[e.id] = newElement;
        // console.log(newElement)
        this.setState({
            formdata: newFormData
        })
    }
    validate = (element) => {
        // console.log(element)
        let error = [true, '']
        if (element.validation.email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const valid = re.test(element.value);
            const msg = `${!valid?'Must be a valid Email ':""}`;
            error = !valid ? [valid, msg] : error

        }
        if (element.validation.password) {
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Must be greater than 5':''}`;
            error = !valid ? [valid, message] : error
        }

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const msg = `${!valid?'this field is required':""}`;
            error = !valid ? [valid, msg] : error

        }
        return error;


    }
      submitBtn=()=>{
       return this.state.loading?'loading...':(<div>
            <button className="btn btn-secondary" onClick={(event)=>this.submitForm(event,false)}>Register</button>
            <span>       </span>
            <button className="btn btn-secondary"  onClick={(event)=>this.submitForm(event,true)}>Log In</button>
        </div>)
    }
    showError=()=>{
        return this.state.registerError!==''?
        (<div style={{ 
            "color": "red",
            "fontSize": "15px"}}>{this.state.registerError}</div>):''}
    submitForm = (event, type) => {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        for (var key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;

        }
        for (let key in this.state.formdata) {
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }
        if (formIsValid) {
            this.setState({
                loading: true,
                registerError: '',
            })
        if(type){
            firebase.auth().signInWithEmailAndPassword(
                dataToSubmit.email,dataToSubmit.password)
   .then(()=>{
                this.props.history.push("/")
            }).catch(error=>{
                this.setState({
                    loading: false,
                    registerError: error.message,
                })
            })
        }
    else{
        firebase.auth().createUserWithEmailAndPassword(
                dataToSubmit.email, dataToSubmit.password)
            .then(() => {
                this.props.history.push("/")
            }).catch(error => {
                this.setState({
                    loading: false,
                    registerError: error.message,
                })
            })

    }
}}
    render(){
        return(
             <div className="container" id="logContainer">
            <div className = "form-group" >
                <form onSubmit={(event)=>this.submitForm(event,null)}>
                <h2 id = "heading" > Register / Log in </h2>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(e)=>this.updateForm(e)}
                    />
                    <br/>
                     <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(e)=>this.updateForm(e)}
                    />
                      <br/>
                    {this.submitBtn()}
                    {this.showError()}
                </form>
            </div>
            </div>
        )
    }
        }
export default SingIn;