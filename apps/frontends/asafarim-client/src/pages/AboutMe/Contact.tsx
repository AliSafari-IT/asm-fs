import Wrapper from "../../layout/Wrapper/Wrapper";

const Contact = () => {
  const headerBlock = (
    <header className="w-full text-center text-gray-200  bg-gray-700">
      <h1 className="text-3xl font-bold">Contact Us!</h1>
    </header>
  );

  return (
    <Wrapper header={headerBlock}>
      <h1 className="text-3xl font-bold">Contact Page</h1>
      <p>This is the Contact page.</p>
    </Wrapper>
  );
};

export default Contact;
