import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const defaultSections = [
  {
    title: 'Product',
    links: [
      { name: 'Overview', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Marketplace', href: '#' },
      { name: 'Features', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Team', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Help', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'Advertise', href: '#' },
      { name: 'Privacy', href: '#' },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <Instagram className="size-5" />, href: '#', label: 'Instagram' },
  { icon: <Facebook className="size-5" />, href: '#', label: 'Facebook' },
  { icon: <Twitter className="size-5" />, href: '#', label: 'Twitter' },
  { icon: <Linkedin className="size-5" />, href: '#', label: 'LinkedIn' },
];

const defaultLegalLinks = [
  { name: 'Terms and Conditions', href: '#' },
  { name: 'Privacy Policy', href: '#' },
];

const Footer = ({
  logo = {
    url: '/',
    src: '/edly.png',
    alt: 'logo',
  },
  sections = defaultSections,
  description = 'Learn today, lead tomorrow.',
  socialLinks = defaultSocialLinks,
  copyright = '© 2025 edly. All rights reserved.',
  legalLinks = defaultLegalLinks,
}) => {
  return (
    <section className="border-t">
      <div className="container-padding section-padding">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <img src={logo.src} alt={logo.alt} className="h-16 w-40 object-contain" />
              </a>
            </div>
            <p className="text-muted-foreground max-w-[70%] body-default">{description}</p>
            <ul className="text-muted-foreground flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-16">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-semibold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-3 body-small">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="hover:text-primary transition-colors">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t pt-8 body-small md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-4">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
