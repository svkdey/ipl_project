import React, { Component } from 'react';
import FormField from './../widgets/formtemplate/formfield';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html'
import './dashboard.css';
import {firebase,firebaseTeams, firebaseArticles} from './../../firebase';
import Uploader from './../uploader/uploader'
class DashBoard extends Component{
    state={
        EditorState:EditorState.createEmpty(),
        postError: '',
        loading: false,
        formdata:{
            author:{
                element: 'input',
                    value: '',
                    config: {
                        name: 'author_input',
                        type: 'text',
                        placeholder: 'Enter your Name'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMsg: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter your Title'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMsg: ''
            },
            body:{
                element:'texteditor',
                value:'',
                valid:true
            }, 
            image: {
                element: 'image',
                value: '',
                valid: true
            },
            team:{
                element: 'select',
                value: '',
                config: {
                    name: 'teams_input',
                    options:[]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMsg: ''
            }
        }

    }
    componentDidMount(){
        this.loadTeams();
    }
    loadTeams=()=>{
        firebaseTeams.once('value')
        .then((snapshot)=>{
            let team=[];
            snapshot.forEach((childSnapshot)=>{
                team.push({
                    id:childSnapshot.val().teamId,
                    name:childSnapshot.val().city
                })
            })
            const newFormData={...this.state.formdata}
            const newElement={...newFormData['team']}
            newElement.config.options=team;
            newFormData['team']=newElement;

            this.setState({
                formdata:newFormData
            })
        })
    }
    updateForm = (e,content='') => {
        const newFormData = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormData[e.id]

        }
        if(content==='')
        {newElement.value = e.event.target.value;}
        else{
            newElement.value=content;
        }
        if (e.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMsg = validData[1];
        }
        newElement.touched = e.blur;

        newFormData[e.id] = newElement;

        this.setState({
            formdata: newFormData
        })
    }
    validate = (element) => {
        // console.log(element)
        let error = [true, '']
        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const msg = `${!valid?'this field is required':""}`;
            error = !valid ? [valid, msg] : error

        }
        return error;


    }
    submitForm = (event) => {
        event.preventDefault(); 
            let dataToSubmit = {};
            let formIsValid = true;
            for (var key in this.state.formdata) {
                dataToSubmit[key] = this.state.formdata[key].value;

            }
            for (let key in this.state.formdata) {
                formIsValid = this.state.formdata[key].valid && formIsValid;
            }
              if (formIsValid){
                this.setState({
                    loading:'true',
                    postError:''
                })
                firebaseArticles.orderByChild("id").limitToLast(1).once('value')
                .then((snapshot)=>{
                    let articleId=null;
                    snapshot.forEach(childSnapshot=>{
                        articleId=childSnapshot.val().id
                    });
                    dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP
                    dataToSubmit['id'] = articleId+1;
                    dataToSubmit['team']=parseInt(dataToSubmit['team'])
                    firebaseArticles.push(dataToSubmit)
                    .then(article=>{
                        this.props.history.push(`/articles/${article.key}`)
                    }).catch(error=>{
                        this.setState({
                            postError:error.message
                        })
                    })
                })
              }
              else{
                this.setState({
                postError:"something went wrong"
                })
              }
    }
    submitBtn = () => {
         return this.state.loading?'loading...':
         (  
            <div>
                <button className="btn btn-primary" type="submit">Create The Post</button>
            </div>
            )
    }
    showError=()=>{
        return this.state.postError!==''?
        (<div style={{ 
            "color": "red",
            "fontSize": "15px"}}>{this.state.postError}</div>):''
    }
    onEditorStateChange=(editorState)=>{
        let contentState=editorState.getCurrentContent();
        // let rawState = convertToRaw(contentState);
        let needHTML = stateToHTML(contentState)
        this.updateForm({ id: 'body' }, needHTML)
        this.setState({
            editorState
        })
    }
    storeFilename(filename){
    // {   console.log(filename)
        this.updateForm({ id: 'image' }, filename)
    }
    render(){
        // console.log(this.state)
        return(
            <div className = "container" style={{"padding":"10px"}}>
            <div className="jumbotron">
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>
                    <FormField
                        id={'author'}
                        formdata={this.state.formdata.author}
                        change={(e)=>this.updateForm(e)}
                    />
                    <br/>
                    <FormField
                        id={'title'}
                        formdata={this.state.formdata.title}
                        change={(e)=>this.updateForm(e)}
                    /><br/>
                    <Uploader fileImageName={(filename)=>this.storeFilename(filename)}/>
                        <br/>
                        <Editor
                            editorState={this.state.editorState}
                            wrapperClassName="myEditor-wrapper"
                            editorClassName = "myEditor-editor"
                            onEditorStateChange={this.onEditorStateChange}
                        />
                               <br/>
                        <FormField
                            id={'team'}
                            formdata={this.state.formdata.team}
                            change={(e) => this.updateForm(e)}
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

export default DashBoard;