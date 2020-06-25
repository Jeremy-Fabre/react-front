import React from 'react';
import Posts from '../post/Posts';

const Home = () => (
    <div>
        <div className="jumbotron">
            <h2>Welcome to GMRZ AREA</h2>
            <p className="lead">The new social network for gamerz !</p>
        </div>
        <div className="container">
            <Posts />
        </div>
    </div>
    
);

export default Home;