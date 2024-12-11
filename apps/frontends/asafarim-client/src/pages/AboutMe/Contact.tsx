import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";
import Wrapper from "../../layout/Wrapper/Wrapper";

const Contact = () => {

  return (
    <Wrapper 
      header={<Header>Contact Page Header</Header>}
      pageTitle="Contact"
      footer={<Footer />}
    >
      <p>
        This is the Contact page content.
      </p>
    </Wrapper>
  );
};

export default Contact;
