import DisplayMd from "../../components/DisplayMd";
import Wrapper from "../../layout/Wrapper/Wrapper";
import aboutMeMd from './aboutme.md?raw';

export default function About(): JSX.Element {
  // get current theme

  const headerBlock = (
    <div className="w-full text-center mx-auto m-0 primary">
      <h1 className="text-2xl font-bold">About Me 🛠️</h1>
    </div>
  );

  const asideBlock = (
    <div className="w-full text-center m-0">
      <h1 className="text-xl font-bold">About Me 🛠️</h1> 
      <div>
        <ul className="list-none flex flex-col justify-start items-start ">
          <li>
            <a
              href={'/about/akkodis-targeted-resume'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-teal-600 hover:underline"
            >
              Akkodis Targeted Resume
            </a>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <Wrapper header={headerBlock} footer={null} className="p-0 m-0" sidebar={asideBlock}>
      <DisplayMd markdownContent={aboutMeMd} />
    </Wrapper>
  );
}
