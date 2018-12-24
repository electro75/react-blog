import jsonPlaceholder from '../apis/jsonPlaceholder'
import _ from 'lodash';

export const fetchPosts = () => 
    async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({type: 'FETCH_POSTS', payload: response.data})
}

// fetchUser is a function that returns a function that in turn calls _fetchUser
// _fetchUser is memoized. ie. it returns the exact same data if called with repeated arguements.
// memoization is useful to making API requests with the exact same ID as same data is returned.

export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id, dispatch)=>{
    const response = await jsonPlaceholder.get(`/users/${id}`)
    dispatch({type: 'FETCH_USER', payload: response.data})
})