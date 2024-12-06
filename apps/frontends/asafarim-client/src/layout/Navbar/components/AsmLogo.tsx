import logo from './logoT.svg';
const AsmLogo = ({ logoPath, className, brandName }: { logoPath?: string, className?: string, brandName?: string }) => {
    return (
        <div className={ "flex items-center shrink-0" + className}>
            {logoPath && <img src={logoPath} alt="Logo" className=" size-8 " />}
            {!logoPath && <img src={logo} alt="Logo" className=" size-8 " />}
            {brandName && <span className="text-2xl font-semibold tracking-wide ml-2">{brandName}</span>}
        </div>
    );
};

export default AsmLogo;