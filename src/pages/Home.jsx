import React from 'react';
import UserResults from "../components/users/UserResults";
import userSearch from "../components/users/UserSearch";
import UserSearch from "../components/users/UserSearch";

function Home(props) {

  return (
    <>
      <UserSearch/>
     <UserResults/>
      {/*{process.env.REACT_APP_GITHUB_TOKEN}*/}
    </>
  );
}

export default Home;