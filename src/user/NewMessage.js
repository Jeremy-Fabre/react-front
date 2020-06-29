import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { createMessage } from "./apiUser";
import { Redirect } from "react-router-dom";

class NewMessage extends Component {

    constructor() {
        super()
        this.state = {
            title: '',
            body: '',
            photo: '',
            error: '',
            user: {},
            loading: false,
            redirectToProfile: false
        }
    };

    componentDidMount() {
        this.messageData = new FormData();
        this.setState({user: isAuthenticated().user});
    };

    isValid = () => {
        const {title, body, fileSize} = this.state
        if(fileSize > 1000000) {
            this.setState({error: "File size should be less than 100kb"})
            return false
        }
        if(title.length === 0 || body.length === 0) {
            this.setState({error: "All fields are required", loading: false})
            return false
        }
        return true;
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""})
        const value = name === 'photo' ? event.target.files[0] :event.target.value;

        const fileSize = name === 'photo' ? event.target.files[0].size : 0;
        this.messageData.set(name, value);
        this.setState({[name]: value, fileSize});
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});

        if(this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            createMessage(userId, token, this.messageData)
                .then(data => {
                    if (data.error) this.setState({ error: data.error })
                    else 
                        this.setState({
                            loading: false, 
                            title: "", 
                            body: "",
                            photo: "",
                            redirectToProfile: true
                        });
                });
        };
        
    };

    newMessageForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input onChange={this.handleChange("photo")} type="file" 
                accept="image/*"
                className="form-control"
            />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={this.handleChange("title")} type="text" className="form-control"
                    value={title} />
            </div>
            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea onChange={this.handleChange("body")} type="text" className="form-control"
                    value={body} />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-info btn-sm disable" disabled>Post Message</button>
        </form>
    )

    render() {
        const {
            title, 
            body, 
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;

        if(redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            <div>
                <h2 className="mt-5 mb-5">Create a new Message</h2>
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                {loading ? (<div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>) : (
                    ""
                )}

                {this.newMessageForm(title, body)}
            </div>
        )
    }
}

export default NewMessage;