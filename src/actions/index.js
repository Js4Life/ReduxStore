import jsonPlaceholder from "../apis/jsonPlaceholder"
import _ from 'lodash'

export const fetchPostsAndUsers = () => async (dispatch,getState) => {

console.log('about to get posts')

 await dispatch(fetchPosts());

//   const userIds =  _.uniq(_.map(getState().posts , 'userId'))
//   userIds.forEach(id => dispatch(fetchUser(id)))

  _.chain(getState().posts)
  .map('userId')
  .uniq()
  .forEach(id => dispatch(fetchUser(id)))
  .value();
   
   // console.log('fetched all posts',userId)
}

export const fetchPosts = () =>  async dispatch => {

   const response = await jsonPlaceholder.get('/posts')

    dispatch({type:'FETCH_POSTS' , payload : response.data})
}

export const fetchUser = (id) => async (dispatch) =>  {
    const response = await jsonPlaceholder(`/users/${id}`)
    dispatch({type : 'FETCH_USER' , payload : response.data})
}



// export const fetchUser = (id) =>  (dispatch) =>  _fetchUser(id,dispatch);
// const _fetchUser = _.memoize(async (id,dispatch) => {
//     const response = await jsonPlaceholder(`/users/${id}`)
//     dispatch({type : 'FETCH_USER' , payload : response.data})
// });




    // return {
    //     type : 'FETCH_POSTS' ,
    //     payload: response     
    // };

  



// totally fine
// export const selectPost = () => {
//     return {
//         type :'SELECT_POST'
//     }
// }