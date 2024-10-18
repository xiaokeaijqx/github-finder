import {createContext, useReducer} from 'react'
import githubReducer from "./GithubReducer";
import user from "../../pages/User";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  //两个会变化的量 默认值
  const initialState = {
    users: [],
    loading: false,
    repos: [],
    user: {}
  }

  //state 存值 ，dispatch改变值的方法 发送action 触发更新状态，reducer关联的函数：gitHubReducer,initialState:默认值
  const [state, dispatch] = useReducer(githubReducer, initialState)
  //接口获取返回体，dispatch函数调用传 类型和 新值  get initial users
  const fetchUsers = async () => {
    setLoading(true)
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
      method: 'GET'
    });
    const data = await response.json();
    console.log(data)
    //获取到值 ，就要触发改变
    dispatch({
      type: "GET_USERS",
      payload: data
    })
  };
  const getUser = async (login) => {
    setLoading(true)
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
    });

    const data = await response.json();
    console.log(data)
    if (response.status === 404) {
      window.location = '/notfound'
    } else {
      const user = data;

      //获取到值 ，就要触发改变
      dispatch({
        type: "GET_USER",
        payload: user
      })

    }
  }

  const searchUsers = async (text) => {
    setLoading(true)
    //URLSearchParams 是一个用于处理 URL 查询参数的 Web API。new URLSearchParams() 允许你创建一个查询参数对象，并轻松地为 URL 构建和管理查询字符串。
    const params = new URLSearchParams({
      q: text
    })
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
      method: 'GET'
    });
    const data = await response.json();
    console.log(data)
    //获取到值 ，就要触发改变
    dispatch({
      type: "GET_USERS",
      payload: data.items
    })
  };

  const getUsersRepos = async (login) => {

    setLoading(true)
    const params=new URLSearchParams({sort:"created",per_page:10})
    //URLSearchParams 是一个用于处理 URL 查询参数的 Web API。new URLSearchParams() 允许你创建一个查询参数对象，并轻松地为 URL 构建和管理查询字符串。
    //这里你使用了一个对象 { sort: "created", per_page: 10 } 作为初始值，它会生成一个查询参数字符串，例如：?sort=created&per_page=10。
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
      method: 'GET'
    });

    const data = await response.json();
    console.log(data)
    //获取到值 ，就要触发改变
    dispatch({
      type: "GET_REPOS",
      payload: data
    })
  };

  const clearUsers = () => dispatch({
    type: "CLEAR_USERS"
  })
  //SET LOADING
  const setLoading = (loading) => dispatch(
    {
      type: "SET_LOADING",
      payload: loading
    }
  )

  return (
    <GithubContext.Provider value={{
      ...state,
      dispatch,
      getUsersRepos,
      fetchUsers, clearUsers, setLoading, getUser
    }
    }>{children}</GithubContext.Provider>)
}


export default GithubContext