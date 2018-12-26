import jsonPlaceholder from '../apis/jsonPlaceholder'
import _ from 'lodash';


export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    _.chain(getState().posts)                           // _.chain allows you to execute nultiple methods on a collection
        .map('userId')                                  // .map extracts values with the key 'userId'
        .uniq()                                         // .uniq deletes duplicate data from the userId array                
        .forEach(id => dispatch(fetchUser(id)))         // forEach is used to dispatch the fetchUser() action
        .value()                                        // value() is used to tell lodash to execute the chain. CHAIN IS NOT EXECUTED WITHOUT THE VALUE().
}

export const fetchPosts = () => 
    async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({type: 'FETCH_POSTS', payload: response.data})
}

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({type: 'FETCH_USER', payload: response.data});
}


// SOLUTION 1 FOR OVER FETCHING
// fetchUser is a function that returns a function that in turn calls _fetchUser
// _fetchUser is memoized. ie. it returns the exact same data if called with repeated arguements.
// memoization is useful to making API requests with the exact same ID as same data is returned.
// ---- memoization logic.----
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch)=>{
//     const response = await jsonPlaceholder.get(`/users/${id}`)
//     dispatch({type: 'FETCH_USER', payload: response.data})
// })

