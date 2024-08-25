import React from 'react';
import Link from 'next/link';

interface BreadcrumbLink {
  label: string;
  href: string;
}

interface BreadcrumbNavigationProps {
  currentPage: string;
  breadcrumbLinks: BreadcrumbLink[];
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  currentPage,
  breadcrumbLinks,
}) => {
  return (
      <div className="plus-jakarta-sans-500 text-xs px-5 text-white">
        {currentPage}
        {breadcrumbLinks.map((link, index) => (
          <span key={index} className="text-[#ec5eb7]">
            {' '}
            / <Link href={link.href} className="cursor-pointer hover:underline">
              {link.label}
            </Link>
          </span>
        ))}
      </div>
  );
};

export default BreadcrumbNavigation;