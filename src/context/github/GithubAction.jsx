const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN



export const searchUsers = async (text) => {
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
    const {items} = await response.json();

  return items
};
