import DisplayMd from '../../../../../../components/MarkdownPage/DisplayMd';
import Wrapper from '../../../../../../layout/Wrapper/Wrapper';
import mdFile from './dynamic-nav.md?raw';

export default function RTNav(): JSX.Element {
  // get current theme

  const headerBlock = '';

  const asideBlock = (
    <div className="sidebartext-left m-4 p-4 shadow-sm ">
      <h2 className="text-xl font-semibold mb-4">
        Explore More 🛠️
      </h2>
      <ul className="list-none flex flex-col">
      <li>
          <a
            href={'/projects/react/tailwind/navbar-with-dynamic-nav-items'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-600 hover:underline"
          >
            Tailwind CSS navbar dropdowns
          </a>
        </li>
       
      </ul>
    </div>
  );

  return (
    <Wrapper header={headerBlock} footer={null} sidebar={asideBlock}>
      <DisplayMd markdownContent={mdFile} id="about-me-markdown" />
    </Wrapper>
  );
}

