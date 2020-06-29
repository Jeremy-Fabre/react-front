import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from "../auth";
import Logo from '../images/logo_gmrz_area_orange.png';

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#333"}
    else return {color : "#fff"}
};

const Menu = ({history}) => {

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    });
        
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
    <div>
        {isDesktopOrLaptop &&
        <ul className="nav nav-tabs bg-danger">
            <li className="nav-item mr-3 ml-3">
                <Link className="nav-link" style={isActive(history, "/")} to="/">
                    <img src={Logo} style={{height: "50px"}}/>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
            </li>

            <li className="nav-item">
                <Link
                    to={`/post/create`}
                    style={isActive(history, `/post/create`)}
                    className="nav-link">
                    Create Post
                </Link>
            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sign In</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign Up</Link>
                    </li>
                </>
            )}

            {isAuthenticated() && (
                <>

                <li className="nav-item">
                        <Link 
                            to={`/user/${isAuthenticated().user._id}`} 
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)} 
                            className="nav-link">{`${isAuthenticated().user.name}'s profile`}
                        </Link>
                </li>

                <li className="nav-item">
                        <Link 
                            to={`/myfollowing`} 
                            style={isActive(history, `/myfollowing`)} 
                            className="nav-link">
                            Following
                        </Link>
                </li>

                <li className="nav-item">
                        <Link 
                            to={`/findpeople`} 
                            style={isActive(history, `/findpeople`)} 
                            className="nav-link">
                            Find People
                        </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                <li className="nav-item">
                    <Link
                        to={`/admin`}
                        style={isActive(history, `/admin`)}
                        className="nav-link"
                    >
                        Admin
                    </Link>
                </li>
                )}

                <li className="nav-item">
                    <span 
                        className="nav-link" 
                        style={{ cursor: "pointer", color: "white" }} 
                        onClick={() => signout(() => history.push('/'))}>Sign Out
                    </span>
                </li>
                </>
            )}
        </ul>
        }

{isTabletOrMobile &&
        <div>
            <Link className="nav-link" style={isActive(history, "/"), {backgroundColor: "#f44336", textAlign: "center"}} to="/">
                    <img src={Logo} style={{width: "100px", height: "50px"}}/>
            </Link>
        <ul className="nav nav-tabs bg-danger">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
            </li>

            <li className="nav-item">
                <Link
                    to={`/post/create`}
                    style={isActive(history, `/post/create`)}
                    className="nav-link">
                    Create Post
                </Link>
            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sign In</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign Up</Link>
                    </li>
                </>
            )}

            {isAuthenticated() && (
                <>

                <li className="nav-item">
                        <Link 
                            to={`/user/${isAuthenticated().user._id}`} 
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)} 
                            className="nav-link">{`${isAuthenticated().user.name}'s profile`}
                        </Link>
                </li>

                <li className="nav-item">
                        <Link 
                            to={`/myfollowing`} 
                            style={isActive(history, `/myfollowing`)} 
                            className="nav-link">
                            Following
                        </Link>
                </li>

                <li className="nav-item">
                        <Link 
                            to={`/findpeople`} 
                            style={isActive(history, `/findpeople`)} 
                            className="nav-link">
                            Find People
                        </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                <li className="nav-item">
                    <Link
                        to={`/admin`}
                        style={isActive(history, `/admin`)}
                        className="nav-link"
                    >
                        Admin
                    </Link>
                </li>
                )}

                <li className="nav-item">
                    <span 
                        className="nav-link" 
                        style={{ cursor: "pointer", color: "white" }} 
                        onClick={() => signout(() => history.push('/'))}>Sign Out
                    </span>
                </li>
                </>
            )}
        </ul>
        </div>
        }
    </div>
    )
};

export default withRouter(Menu);
