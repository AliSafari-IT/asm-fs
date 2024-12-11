import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Layout from "@/layout/Layout";

const SERVICE_ID = "service_9m1uuup";
const TEMPLATE_ID = "template_2ie8whg";
const PUBLIC_KEY = "vVlEiwNEj0k6uzMt3";

export const ContactUs = () => {
  const [loggedInUserName, setLoggedInUserName] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const form = useRef<HTMLFormElement | null>(null); // Initialize to null

  // if the user is logged in, from hook useAuth
  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    const userName = currentUser ? JSON.parse(currentUser).user.userName : null;
    if (userName) {
      setLoggedInUserName({ userName });
    }
  }, []);


  // Utility function to validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (name === "from_name") setName(value);
    if (name === "from_email") setEmail(value);
    if (name === "message") setMessage(value);
  };

  const sendEmail = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");

    // Create template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_name: "ASafariM Team" 
    };

    if (form.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
        .then(() => {
          alert("Message Sent, We will get back to you shortly!");
          console.log("Email sent successfully...");
          setName("");
          setEmail("");
          setMessage("");
        }, (error) => {
          console.error("Email send failed...", error.text);
          alert("An error occurred, Please try again.");
        });
    } else {
      console.error("Form is not defined");
      alert("Form is not available. Please try again.");
    }
  };

  return (
    <Layout pageTitle={"Contact Us"} pageDescription={"Contact Us Page Description"}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-lg px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">Contact Us</h1>
            {loggedInUserName && (
              <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                <span className="text-sm text-gray-600 dark:text-gray-300">{loggedInUserName.userName}</span>
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center ml-2">
                  <span className="text-sm text-blue-600 dark:text-blue-400">{loggedInUserName.userName.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="text-sm text-red-600 dark:text-red-400 text-center mb-4">
              {errorMessage}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-6">Contact Information</h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Name</label>
                <input
                  className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md
                           text-gray-800 dark:text-gray-200 placeholder-gray-400
                           focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                  type="text"
                  name="from_name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email</label>
                <input
                  className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md
                           text-gray-800 dark:text-gray-200 placeholder-gray-400
                           focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                  type="email"
                  name="from_email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Message</label>
                <textarea
                  className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md
                           text-gray-800 dark:text-gray-200 placeholder-gray-400
                           focus:outline-none focus:border-blue-500 dark:focus:border-blue-400
                           h-32 resize-none"
                  name="message"
                  value={message}
                  onChange={handleChange}
                  placeholder="Type your message here"
                  required
                />
              </div>

              <div className="flex justify-end">
                {/** Add the "to_name" field with the value "ASafariM Team" */}
                <input
                  type="hidden"
                  name="to_name"
                  value="ASafariM Team"
                />

              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 
                           transition-colors duration-200 focus:outline-none"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
