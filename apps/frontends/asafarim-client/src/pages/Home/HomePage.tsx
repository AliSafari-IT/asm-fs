import Wrapper from "../../layout/Wrapper/Wrapper";
import { HomeHeaderBlock } from "./HomeHeaderBlock";
import NotAuthenticated from "../../components/NotAuthenticated";
import API_URL from "../../api/getApiUrls";
import UserProfile from "../Accountpage/UserProfile";

const Home = () => {
  console.log("API_URL", API_URL);

  const userData = localStorage.getItem('user');
  const token = userData ? JSON.parse(userData).token : null;


  if (!token) {
    {
      return (
        <Wrapper pageTitle="Home">
          <div className="w-1/2 mx-auto my-10 px-4 py-3 rounded relative" role="alert">
            <NotAuthenticated />
          </div>
        </Wrapper>
      );
    }
  }

  return (
    <Wrapper pageTitle="Home" pageDescription="Home Page" header={<div className="w-full text-center py-8 text-2xl border z-10">User Profile</div>}>
      <HomeHeaderBlock />
      <UserProfile />
    </Wrapper>
  );

};

export default Home;
