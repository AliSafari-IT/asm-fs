import Wrapper from "./Wrapper/Wrapper";

const Layout = ({ children, header, footer }: { children: React.ReactNode, header: React.ReactNode, footer: React.ReactNode }) => (
    <Wrapper header={header} footer={footer}>
      {children}
    </Wrapper>
  );
  
  export default Layout;