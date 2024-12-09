import Wrapper from "./Wrapper/Wrapper";

const Layout = ({ children, sidebar, header, footer }: { children: React.ReactNode, sidebar?: React.ReactNode, header?: React.ReactNode, footer?: React.ReactNode }) => (
    <Wrapper pageTitle="" pageDescription="" header={header} footer={footer} sidebar={sidebar}>
      {children}
    </Wrapper>
  );
  
  export default Layout;