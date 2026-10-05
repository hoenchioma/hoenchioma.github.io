import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

// The CV link carries a hash of the PDF so browsers fetch the new file as soon as it changes
// (GitHub Pages lets browsers cache files for hours).
const cvVersion = createHash('sha256').update(readFileSync('public/files/resume.pdf')).digest('hex').slice(0, 8);

// Site-wide identity and links.
export const site = {
  name: 'Raheeb Hassan',
  role: 'CS PhD Student',
  institution: 'University of California, Irvine',
  email: 'contact@raheeb.xyz',
  cv: `/files/resume.pdf?v=${cvVersion}`,
  /** Home page introduction, one string per paragraph (later paragraphs are de-emphasized). */
  intro: [
    "I'm a PhD student in Computer Science at UC Irvine, advised by Dr. Mohsen Imani. I work on machine learning, with a focus on neurosymbolic methods. Lately, I've been especially drawn to reinforcement learning and world models.",
    'Before that, I studied Computer Science at the University of Dhaka, where I worked on safe multi-agent reinforcement learning with Dr. Md. Mosaddek Khan. After graduating, I spent two years in industry as a machine learning engineer at Therap Services before starting my PhD.',
    'Outside research, I enjoy art, anime, competitive programming, and table tennis.',
  ],
  /** Shown on the Journey page's timeline header. */
  route: '~13,000 km travelled',
  /** Lead line under the Art page title. */
  artCaption:
    'I try to draw when I can, mostly digital pieces and pencil sketches. A few favourites are below; more are on Instagram.',
  description:
    'Raheeb Hassan, CS PhD student at UC Irvine working on machine learning, neurosymbolic AI, and reinforcement learning.',
  links: [
    { label: 'Email', href: 'mailto:contact@raheeb.xyz' },
    { label: 'Scholar', href: 'https://scholar.google.com/citations?user=73zHDeoAAAAJ' },
    { label: 'GitHub', href: 'https://github.com/hoenchioma' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/raheebhassan' },
    { label: 'X', href: 'https://x.com/raheebomega' },
  ],
  instagram: 'https://www.instagram.com/raheebomega',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Research', href: '/research/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Journey', href: '/journey/' },
    { label: 'Achievements', href: '/achievements/' },
    { label: 'Art', href: '/art/' },
  ],
};
