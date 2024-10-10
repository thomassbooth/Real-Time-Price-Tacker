import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-16 px-4">
      <Link href="/" className="hover:text-opacity-50 font-bold">Stock Tracker - M2</Link>

    </div>
  );
};

export default Navbar;
