import Wrapper from "../../layout/Wrapper/Wrapper";
import NotAuthenticated from "../../components/NotAuthenticated";
import API_URL from "../../api/getApiUrls";
import HomePanels from "./HomePanels";
  const userData = localStorage.getItem('user');
  // const token = userData ? JSON.parse(userData).token : null;
  console.debug("API_URL", API_URL, "UserData", userData);

export const Home = () => {
  if (!userData) {
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
    <Wrapper pageTitle="Home" pageDescription="Home Page" header={''}>
      {/* <HomeHeaderBlock />
      <AccountSettings /> */}
      <HomePanels />
    </Wrapper>
  );

};

export default Home;
