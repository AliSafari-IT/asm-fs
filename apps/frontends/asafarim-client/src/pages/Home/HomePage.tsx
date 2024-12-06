import Wrapper from "../../layout/Wrapper/Wrapper";
import NotAuthenticated from "../../components/NotAuthenticated";
import HomePanels from "./HomePanels";
import useAuth from "../../hooks/useAuth";


export const Home = () => {
  const user = useAuth(); 
  if (!user) {
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
