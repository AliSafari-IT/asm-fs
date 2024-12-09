import Layout from "../../layout/Layout";
import NotAuthenticated from "../../components/NotAuthenticated";
import HomePanels from "./HomePanels";
import useAuth from "../../hooks/useAuth";
import SidebarNavItem from "../../layout/Wrapper/SidebarNavItem";


export const Home = () => {

  const user = useAuth(); 
  if (!user) {
    return ( 
      <Layout sidebar={<SidebarNavItem />} header={null} footer={null}>
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <NotAuthenticated />
        </div>
      </Layout>
    );
  }

  return (
    <Layout sidebar={null} header={null} footer={null}>
      {/* <HomeHeaderBlock />
      <AccountSettings /> */}
      <HomePanels />
    </Layout>
  );

};

export default Home;
