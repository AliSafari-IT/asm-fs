import Wrapper from "./Wrapper/Wrapper";

const Layout = ({ children, sidebar, header, footer, pageTitle, pageDescription }:   
  { children: React.ReactNode, sidebar?: React.ReactNode, header?: React.ReactNode, footer?: React.ReactNode, pageTitle?: string, pageDescription?: string }
) => (
    <Wrapper pageTitle={pageTitle} pageDescription={pageDescription} header={header} footer={footer} sidebar={sidebar}>
      {children}
    </Wrapper>
  );
  
  export default Layout;