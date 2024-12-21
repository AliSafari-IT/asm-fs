import Wrapper from "./Wrapper/Wrapper";

const Layout = ({ children, topbar, sidebar, header, footer, pageTitle, pageDescription }:   
  { children: React.ReactNode, sidebar?: React.ReactNode, topbar?: React.ReactNode, header?: React.ReactNode, footer?: React.ReactNode, pageTitle?: string, pageDescription?: string }
) => (
    <Wrapper pageTitle={pageTitle} pageDescription={pageDescription} header={header} footer={footer} sidebar={sidebar} topbar={topbar}>
      {children}
    </Wrapper>
  );
  
  export default Layout;