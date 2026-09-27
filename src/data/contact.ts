/**
 * Centralized Contact & Social Information
 * Single source of truth across Navbar, Footer, and ContactSection.
 */
export const contactInfo = {
  email: {
    address: 'rajputdhiraj1010@gmail.com',
    href: 'mailto:rajputdhiraj1010@gmail.com',
  },
  whatsapp: {
    number: '917972742879',
    display: '+91 79727 42879',
    href: 'https://wa.me/917972742879',
  },
  linkedin: {
    url: 'https://linkedin.com/in/dhiraj-rajput-',
    handle: 'linkedin.com/in/dhiraj-rajput-',
  },
  github: {
    url: 'https://github.com/dhiraj-rajput',
    handle: 'github.com/dhiraj-rajput',
  },
  location: 'Pune, India',
  resumeFile: 'Dhiraj_Rajput_Resume.pdf',
};

export const contactDetailsList = [
  {
    label: 'Email',
    value: contactInfo.email.address,
    href: contactInfo.email.href,
  },
  {
    label: 'WhatsApp',
    value: contactInfo.whatsapp.display,
    href: contactInfo.whatsapp.href,
  },
  {
    label: 'LinkedIn',
    value: contactInfo.linkedin.handle,
    href: contactInfo.linkedin.url,
  },
  {
    label: 'GitHub',
    value: contactInfo.github.handle,
    href: contactInfo.github.url,
  },
  {
    label: 'Location',
    value: contactInfo.location,
    href: null,
  },
];
