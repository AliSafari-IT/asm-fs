import Layout from "../../layout/Layout";
import NotAuthenticated from "../../components/NotAuthenticated";
import HomePanels from "./HomePanels";
import useAuth from "../../hooks/useAuth";

export const Home = () => {

  const user = useAuth(); 
  if (!user) {
    return ( 
      <Layout header={undefined}>
        <div className="w-full mt-3 alert alert-danger alert-dismissible fade show" role="alert">
          <NotAuthenticated />
        </div>
      </Layout>
    );
  }

  return (
    <Layout  header={<></>}>
      {/* <HomeHeaderBlock />
      <AccountSettings /> */}
      <HomePanels />
    </Layout>
  );

};

export default Home;
