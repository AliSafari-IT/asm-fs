import './Footer.scss';
export function Footer({ children = <p className="text-sm">
  &copy; {new Date().getFullYear()}{' '}
  <a
    href="https://asafarim.com"
    className="footer__links hover:underline"
  >
    ASafariM
  </a>
  . All Rights Reserved.
</p> }: { children?: React.ReactNode }) {
  
  return (
    <footer>
      {children}
    </footer> 
  );
}

export default Footer;
