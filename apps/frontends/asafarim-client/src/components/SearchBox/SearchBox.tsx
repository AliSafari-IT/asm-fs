function SearchBox() {
    return       <div className="relative w-full">
        <input
          type="text"
          className="block w-full ml-10 pr-3 py-2 border rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:border-indigo-200 sm:text-sm"
          placeholder="Search..."
          style={{ textIndent: "25px" }} />
        <div className="absolute inset-y-0 left-10 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5  text-indigo-600 p-1 rounded-md"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="1.414"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
              clipRule="evenodd" />
          </svg>
        </div>
      </div>;
  }

  export default SearchBox