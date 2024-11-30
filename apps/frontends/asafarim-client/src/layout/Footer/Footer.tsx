import './Footer.scss';
export function Footer() {
  return (
    <footer>
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{' '}
        <a
          href="https://asafarim.com"
          className="footer__links hover:underline"
        >
          ASafariM
        </a>
        . All Rights Reserved. 
      </p>
    </footer>
  );
}

export default Footer;
