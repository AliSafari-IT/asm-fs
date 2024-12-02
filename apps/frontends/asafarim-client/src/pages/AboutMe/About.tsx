import DisplayMd from "../../components/DisplayMd";
import Wrapper from "../../layout/Wrapper/Wrapper";
import aboutMeMd from './aboutme.md?raw';

export default function About(): JSX.Element {
  // get current theme

  const headerBlock = (
    <div className="w-full flex flex-col items-center justify-center text-center mx-auto my-4 p-4 bg-primary-50 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-2">
        About Me 🛠️
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        A quick overview of who I am and what I do.
      </p>
    </div>
  );

  const asideBlock = (
    <div className="sidebar w-full text-left m-0 p-4 bg-secondary-50 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Explore More 🛠️
      </h2>
      <ul className="list-none flex flex-col gap-2">
        <li>
          <a
            href={'/about/akkodis-targeted-resume'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-teal-600 hover:underline"
          >
            Akkodis Targeted Resume
          </a>
        </li>
      </ul>
    </div>
  );

  return (
    <Wrapper header={headerBlock} footer={null} className="p-0 m-0" sidebar={asideBlock}>
      <DisplayMd markdownContent={aboutMeMd} id="about-me-markdown" />
    </Wrapper>
  );
}