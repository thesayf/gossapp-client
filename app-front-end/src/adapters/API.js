const endpoint = 'http://localhost:3000'
const signupUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
const postsUrl = `${endpoint}/posts`
const validateUrl = `${endpoint}/validate`
const searchAddress = `${endpoint}/search`
const newPost = `${endpoint}/newpost`

const constructHeaders = (moreHeaders = {}) => (
    {
        'Authorization': localStorage.getItem('token'),
        ...moreHeaders
    }
)

const jsonify = res => {
    if (res.ok)
        return res.json()
    else
        throw res.json()
}

const saveToken = data => {
    localStorage.setItem('token', data.token)
    return data.user
}

const handleServerError = response => {
    throw response
}

const validateUser = () => {
    if (!localStorage.getItem('token')) return Promise.resolve({ error: 'no token' })

    return fetch(validateUrl, {
        headers: constructHeaders()
    }).then(jsonify)
        .then(saveToken)
        .catch(handleServerError)
}

const logIn = (user) => {
    return fetch(loginUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    }).then(jsonify)
    .then(saveToken)
}

const getPostsByCurrentLocation = (longitude, latitude) => {
   return fetch(postsUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            longitude: longitude,
            latitude: latitude
           })
        }).then(jsonify)
}

const getCoordinatesFromSearchInput = (state) => {
      return fetch(searchAddress, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            searchInput: state
        })
      }).then(jsonify)
}

const createPost = (formDetails, state) => {
    const h = new Headers();
    h.append('Accept', 'application/json');
    let fd = new FormData();
    fd.append("title", formDetails.title)
    fd.append("description", formDetails.description)
    fd.append("userID", state.user.id)
    fd.append("longitude", state.longitude)
    fd.append("latitude", state.latitude)
    if(formDetails.recordedImage){
      fd.append("image", formDetails.recordedImage)
    }
    else{
      fd.append('image', formDetails.img, "avatar.png")
    }
    let req = new Request(newPost, {
      method: 'POST',
      headers: h,
      body: fd
    })

    return fetch(req).then(jsonify)

}

const createUser = (formDetails) => {
    const h = new Headers();
    h.append('Accept', 'application/json');
    let fd = new FormData();

    fd.append("name", formDetails.name)
    fd.append("email", formDetails.email)
    fd.append("password", formDetails.password)
    fd.append("img", formDetails.image)

    let req = new Request(signupUrl, {
      method: 'POST',
      headers: h,
      body: fd
    })

    return fetch(req).then(jsonify)
}

const getPostsUsingCoordinates = (coordinates) => {

    return fetch(postsUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            longitude: coordinates[1],
            latitude: coordinates[0]
            })
        }).then(jsonify)

}

export default {
    validateUser,
    logIn,
    getCoordinatesFromSearchInput,
    getPostsByCurrentLocation,
    getPostsUsingCoordinates, 
    createPost, 
    createUser
}