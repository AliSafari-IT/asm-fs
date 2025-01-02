import React, { useState } from 'react';

interface MenuItem {
  name: string;
  link?: string;
  subMenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Services', subMenu: [
      { name: 'Service 1', link: '/services/service1' },
      { name: 'Service 2', link: '/services/service2' },
      { name: 'Service 3', subMenu: [
          { name: 'Sub Service 1', link: '/services/service3/sub1' },
          { name: 'Sub Service 2', link: '/services/service3/sub2' },
        ]
      },
    ]
  },
  { name: 'Contact', link: '/contact' },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderMenu = (items: MenuItem[]) => {
    return (
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="relative group">
            {item.link ? (
              <a href={item.link} className="block px-4 py-2 text-white hover:bg-gray-600">
                {item.name}
              </a>
            ) : (
              <>
                <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 focus:outline-none">
                  {item.name}
                </button>
                {item.subMenu && (
                  <div className="absolute left-0 mt-1 hidden group-hover:block bg-gray-700 text-white py-2 rounded shadow-lg">
                    {renderMenu(item.subMenu)}
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Brand</div>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          {renderMenu(menuItems)}
        </div>
      </div>
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        {renderMenu(menuItems)}
      </div>
    </nav>
  );
};

export default Navbar;