import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth';

class Signin extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            user: "",
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        };
    };

    handleChange = (name) => (event) => {
        this.setState({error: ""});
        this.setState({[name]: event.target.value});
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        const {email, password} = this.state;
        const user = {
            email,
            password
        };
        signin(user)
            .then(data => {
                if(data.error) {
                    this.setState({error: data.error, loading: false})
                }
                else {
                    // Authenticate
                    authenticate(data, () => {
                        this.setState({redirectToReferer: true})
                    });
                }
            });
    };

    signinForm = (email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="text" className="form-control"
                    value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control"
                    value={password} />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
        </form>
    )

    render() {
        const {email, password, error, redirectToReferer, loading} = this.state;

        if(redirectToReferer) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Sign In</h2>

                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                {loading ? (<div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>) : (
                    ""
                )}

                {this.signinForm(email, password)}

                <p>
                    <Link to="/forgot-password" className="text-danger">
                        {" "}
                        Forgot Password
                    </Link>
                </p>
            </div>
        )
    }
}

export default Signin;
