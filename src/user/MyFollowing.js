import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { myFollowing } from "./apiUser";
import DefaultProfile from '../images/avatar.png';
import { isAuthenticated } from '../auth';

class MyFollowing extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            error: '',
            open: false
        }
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        myFollowing(userId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({users: data})
            }
        })
    }

    renderUsers = (users) => {

        return (<div className="row">
            {users.map((user, i) =>
                (
                    <div className="card col-md-4 p-2" key={i}>
                        <img 
                            style={{height: "200px", width: "auto", objectFit: "cover"}}
                            className="img-thumbnail"
                            src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name}
                        /> 
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.email}</p>
                            <Link 
                                to={`/user/${user._id}`}
                                className="btn btn-raised btn-primary  btn-sm">View Profile
                            </Link>
                            <Link 
                                to={`/user/${user._id}`}
                                className="btn btn-raised btn-info float-right btn-sm">
                                    Send Message
                            </Link> 
                        </div>
                    </div>
                )
            )}
        </div>)
    }

    render() {
        const {users, open, followMessage} = this.state
        
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Following People</h2>

                {open && (
                    <div className="alert alert-success">
                        {open && (<p>{followMessage}</p>)}
                    </div>
                )}

                {this.renderUsers(users)}
            </div>
        )
    }
}

export default MyFollowing;
