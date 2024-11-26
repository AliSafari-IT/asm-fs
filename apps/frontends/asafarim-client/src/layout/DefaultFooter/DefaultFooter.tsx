export function DefaultFooter() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{' '}
        <a
          href="https://asafarim.com"
          className="text-blue-400 hover:text-blue-500 hover:underline"
        >
          ASafariM
        </a>
        . All Rights Reserved. 
      </p>
    </footer>
  );
}

export default DefaultFooter;
