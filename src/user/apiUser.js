export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const update = (userId, token, user) => {
    console.log("User data update: ", user);
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const remove = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const updateUser = (user, next) => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.user = user;
            localStorage.setItem('jwt', JSON.stringify(auth));
            next();
        }
    }
}

export const follow = (userId, token, followId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, followId})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const unfollow = (userId, token, unfollowId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, unfollowId})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const findPeople = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const myFollowing = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/myfollowing/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

/////////////////////////////////////////// MESSAGE /////////////////////////////////////////////

export const createMessage = (userId, token, message) => {
    return fetch(`${process.env.REACT_APP_API_URL}/message/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: message
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

export const listMessage = page => {
    return fetch(`${process.env.REACT_APP_API_URL}/messages/?page=${page}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleMessage = (messageId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/message/${messageId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

export const listByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/messages/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

export const removeMessage = (messageId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/message/${messageId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

export const updateMessage = (messageId, token, message) => {
    return fetch(`${process.env.REACT_APP_API_URL}/message/${messageId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: message
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

export const like = (userId, token, messageId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/message/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, messageId})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

export const unlike = (userId, token, messageId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/message/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, messageId})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

export const comment = (userId, token, messageId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/message/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, messageId, comment})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

export const uncomment = (userId, token, messageId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/message/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, messageId, comment})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

// export const followingRequest = email => {
//     return fetch(`${process.env.REACT_APP_API_URL}/user/followingRequest/`, {
//         method: "PUT",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email })
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };