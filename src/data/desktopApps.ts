import { DesktopApp, DockItemData } from '../types/desktop';

/**
 * MASTER SPECIFICATION — EXACTLY 7 DESKTOP ITEMS
 * Deterministic scattered layout matching visual reference.
 */
export const DESKTOP_APPS: DesktopApp[] = [
  // 1. Framer (Graphic design portfolio shortcut)
  {
    id: 'framer',
    name: 'Framer',
    iconType: 'framer',
    actionType: 'external_link',
    actionUrl: 'https://tajalli.framer.website/',
    isInteractive: true,
    defaultPosition: { x: 50, y: 100 },
    percentX: 3.5,
    percentY: 11,
  },
  // 2. Projects (Mac folder — empty / inactive)
  {
    id: 'projects',
    name: 'Projects',
    iconType: 'folder',
    actionType: 'none',
    isInteractive: false,
    defaultPosition: { x: 400, y: 200 },
    percentX: 28,
    percentY: 22,
  },
  // 3. About Me (Mac-style visual icon — inactive)
  {
    id: 'about-me',
    name: 'About Me',
    iconType: 'about',
    actionType: 'none',
    isInteractive: false,
    defaultPosition: { x: 55, y: 550 },
    percentX: 3.8,
    percentY: 61,
  },
  // 4. Hackathons (Mac folder — empty / inactive)
  {
    id: 'hackathons',
    name: 'Hackathons',
    iconType: 'folder',
    actionType: 'none',
    isInteractive: false,
    defaultPosition: { x: 700, y: 125 },
    percentX: 49,
    percentY: 14,
  },
  // 5. Skills (Mac folder — empty / inactive)
  {
    id: 'skills',
    name: 'Skills',
    iconType: 'folder',
    actionType: 'none',
    isInteractive: false,
    defaultPosition: { x: 345, y: 470 },
    percentX: 24,
    percentY: 52,
  },
  // 6. GitHub (GitHub shortcut)
  {
    id: 'github',
    name: 'GitHub',
    iconType: 'github',
    actionType: 'external_link',
    actionUrl: 'https://github.com/qrstajalli',
    isInteractive: true,
    defaultPosition: { x: 1060, y: 200 },
    percentX: 74,
    percentY: 22,
  },
  // 7. LinkedIn (LinkedIn shortcut)
  {
    id: 'linkedin',
    name: 'LinkedIn',
    iconType: 'linkedin',
    actionType: 'external_link',
    actionUrl: 'https://www.linkedin.com/in/tajalli-us-samad/',
    isInteractive: true,
    defaultPosition: { x: 1310, y: 100 },
    percentX: 91,
    percentY: 11,
  },
];

/**
 * MASTER SPECIFICATION — EXACTLY 5 DOCK SLOTS
 * Inactive until future instructions explicitly define them.
 */
export const DOCK_ITEMS: DockItemData[] = [
  // Slot 1: About Me (Inactive)
  {
    id: 'about',
    name: 'About Me',
    isInteractive: false,
    actionType: 'none',
  },
  // Slot 2: RESERVED / UNSPECIFIED (Inactive)
  {
    id: 'reserved-2',
    name: 'Reserved',
    isReserved: true,
    isInteractive: false,
    actionType: 'none',
  },
  // Slot 3: Gallery (Inactive)
  {
    id: 'gallery',
    name: 'Gallery',
    isInteractive: false,
    actionType: 'none',
  },
  // Slot 4: RESERVED / UNSPECIFIED (Inactive)
  {
    id: 'reserved-4',
    name: 'Reserved',
    isReserved: true,
    isInteractive: false,
    actionType: 'none',
  },
  // Slot 5: Contact (Inactive)
  {
    id: 'contact',
    name: 'Contact',
    isInteractive: false,
    actionType: 'none',
  },
];
