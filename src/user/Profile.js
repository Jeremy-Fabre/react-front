import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from "./apiUser";
import DefaultProfile from '../images/avatar.png';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';
import NewMessage from './NewMessage';
import { listByUser } from '../post/apiPost';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            followers: false,
            error: "",
            posts: []
        };
    };

    // Check Follow

    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id
        })
        return match;
    };

    checkFollowers = user => {
        const jwt = isAuthenticated();
        const match = user.following.find(following => {
            return following._id === jwt.user._id
        })
        return match;
    };

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        callApi(userId, token, this.state.user._id)
        .then(data => {
            if(data.error) {
                this.setState({error: data.error});
            } else {
                this.setState({user: data, following: !this.state.following});
            }
        });
    };

    init = userId => {
        const token = isAuthenticated().token;
            read(userId, token)
                .then(data => {
                    if (data.error) {
                        this.setState({ redirectToSignin: true });
                    } else {
                        let following = this.checkFollow(data);
                        let followers = this.checkFollowers(data);
                        this.setState({ user: data, following });
                        this.setState({ user: data, followers });
                        this.loadPosts(data._id);
                    }
                });
    };

    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token)
            .then(data => {
                if(data.error) {
                    console.log(data.error);
                } else {
                    this.setState({ posts: data });
                }
            })
    }

    createMessage = () => (
        <div className="d-inline-block">
            <NewMessage />
        </div>
    )

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    };

    UNSAFE_componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    };

    render() {
        const {redirectToSignin, user, posts} = this.state
        if(redirectToSignin) return <Redirect to="/signin" />

        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` 
        : DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-4">
                        <img 
                            style={{height: "200px", width: "auto"}}
                            className="img-thumbnail"
                            src={photoUrl}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name}
                        /> 
                    </div>
                    
                    <div className="col-md-8">
                        <div className="lead mt-2">
                            <h4>{user.name}</h4>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-info mr-5" to={`/post/create`}>
                                    Create Post
                                </Link>

                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>
                                    Edit Profile
                                </Link>

                                <DeleteUser userId={user._id}/>
                            </div>
                        ) : (
                            <div className="d-inline-block">
                                <FollowProfileButton 
                                    following={this.state.following}
                                    onButtonClick={this.clickFollowButton}
                                />

                                {this.state.followers && isAuthenticated().user._id !== user._id ? (
                                        <div className="d-inline-block">
                                            <button className="btn btn-success btn-raised ml-5" disabled>
                                                Chat
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="d-inline-block">
                                            <button className="btn btn-info btn-raised ml-5" onClick={this.followingRequest} disabled>
                                                Send mail to ask follow
                                            </button>
                                        </div>
                                )}
                            </div>
                            
                        )}
                        <div>
                            {isAuthenticated().user &&
                                isAuthenticated().user.role === "admin" && (
                                    <div class="card mt-5">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Admin
                                            </h5>
                                            <p className="mb-2 text-danger">
                                                Edit/Delete as an Admin
                                            </p>
                                            <Link
                                                className="btn btn-raised btn-success mr-5"
                                                to={`/user/edit/${user._id}`}
                                            >
                                                Edit Profile
                                            </Link>
                                            <DeleteUser userId={user._id} />
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                        <hr/>
                            <p className="lead">{user.about}</p>
                        <hr/>

                        <ProfileTabs 
                            followers={user.followers} 
                            following={user.following}
                            posts={posts}
                        />
                        
                    </div>
                    
                </div>
                <hr/>
                <div>
                    <h2>Message</h2>
                </div>
                <hr/>
                {this.state.followers && this.state.following || isAuthenticated().user._id === user._id ? (
                            <div>
                                {/*
                                    <div className="d-inline-block">
                                    <button 
                                        href={`/user/${user._id}#new-message`}
                                        className="btn btn-raised btn-info btn-sm">
                                            New Message
                                    </button>
    
                                    {
                                        this.state.followers && (
                                            <Link className="btn btn-raised btn-success btn-sm ml-5" to={`/user/edit/${user._id}`}>
                                                    Chat
                                            </Link>
                                        )
                                    }
                                
                                
                                    </div>
                                */}
                                <hr/>
                                <NewMessage />
                                
                            </div>
                        ) : (
                            <div className="d-inline-block">
                                <div className="alert alert-info">
                                    <p>You must follow and been folowed by {user.name} to access on this part..</p>
                                </div>
                            </div>
                            
                    )}
            </div>
        )
    };
};

export default Profile;