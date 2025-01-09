import DisplayMd from "../../components/MarkdownPage/DisplayMd";
import Wrapper from "../../layout/Wrapper/Wrapper";
import aboutMeMd from './aboutme.md?raw';

export default function About(): JSX.Element {
  const asideBlock = (
    <div className="sidebartext-left m-4 p-4 shadow-sm ">
      <h2 className="text-xl font-semibold mb-4">
        Explore More 🛠️
      </h2>
      <ul className="list-none flex flex-col">
      <li>
          <a
            href={'/about/akkodis-targeted-resume'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-600 hover:underline"
          >
            Akkodis Targeted Resume
          </a>
        </li>
       
      </ul>
    </div>
  );

  return (
    <Wrapper  footer={null} sidebar={asideBlock}>
      <DisplayMd markdownContent={aboutMeMd} id="about-me-markdown" />
    </Wrapper>
  );
}