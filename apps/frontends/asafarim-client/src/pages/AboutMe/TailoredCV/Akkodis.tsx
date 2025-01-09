// E:\asm\apps\dashboard-client\src\pages\AboutMe\TailoredCV\Akkodis.tsx
import DisplayMd from "../../../components/MarkdownPage/DisplayMd";
import Wrapper from "../../../layout/Wrapper/Wrapper";
import Akkodis from './Akkodis.md?raw';

export default function AkkodisTargetedResume(): JSX.Element {

  const headerBlock = (
    <div className="w-full text-center mx-auto m-0 ">
      <h1 className="text-3xl font-bold py-3">About Me 🛠️</h1>
    </div>
  );

  return (
    <Wrapper header={headerBlock} footer={null} className="p-0 m-0  ">
      <DisplayMd markdownContent={Akkodis} id = "akkodis-targeted-resume"/>
    </Wrapper>
  );
};
