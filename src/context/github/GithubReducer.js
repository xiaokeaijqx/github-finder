const  githubReducer =(state,action)=>{
  switch (action.type){
    case "GET_USERS":
      return {
        ...state,
        users:action.payload,
        loading:false,
      }
    default:return state;

    case "GET_USER":
      return {
        ...state,
        user:action.payload,
        loading:false,
      }


    case "CLEAR_USERS":
      return {
        ...state,
        users:[]
      }
    case "SET_LOADING":
      return{
        ...state,
        loading:action.payload,
      }

    case "GET_REPOS":
      return{
        ...state,
        repos:action.payload,
        loading:false
      }
  }
}
export default githubReducer;