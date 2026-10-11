/** Social profiles. Edit links/labels here; every page reads from this list. */
export interface Social {
  label: string;
  handle?: string;
  href: string;
}

export const socials: Social[] = [
  {
    label: 'Instagram',
    handle: '@lyrak3o6',
    href: 'https://www.instagram.com/lyrak3o6/',
  },
  {
    label: 'X',
    handle: '@lyrak_3o6',
    href: 'https://x.com/lyrak_3o6',
  },
  {
    label: 'VGen',
    href: 'https://vgen.co/lyrak',
  },
  {
    label: 'Pixiv',
    href: 'https://www.pixiv.net/en/users/107585362',
  },
];

/** Primary booking link — used on the commissions page and header. */
export const bookingUrl = 'https://vgen.co/lyrak';

/** Contact address for written enquiries. */
export const contactEmail = 'lyrak.commissions@gmail.com';
