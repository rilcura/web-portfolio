export interface TeamPhoto {
  id: string;
  src: string;
  smallSrc: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const teamPhotos: TeamPhoto[] = [
  {
    id: 'christmas-table-2025',
    src: 'images/team/chinabank-christmas-table-2025-1440.webp',
    smallSrc: 'images/team/chinabank-christmas-table-2025-720.webp',
    width: 1440,
    height: 810,
    alt: 'Colleagues smiling together around a red banquet table at a Christmas celebration.',
    caption: 'Celebrating with colleagues at the 2025 Christmas party.',
  },
  {
    id: 'christmas-photobooth-2025',
    src: 'images/team/chinabank-christmas-photobooth-2025-1440.webp',
    smallSrc: 'images/team/chinabank-christmas-photobooth-2025-720.webp',
    width: 1440,
    height: 960,
    alt: 'Four-photo collage of colleagues posing at the China Bank Innovation and Transformation Segment Christmas party.',
    caption: 'Christmas party with the China Bank team, November 2025.',
  },
];
