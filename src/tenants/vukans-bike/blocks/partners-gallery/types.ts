export interface Partner {
  id: string;
  name: string;
  /** Logo or icon image URL */
  icon: string;
  /** Short about / description text */
  about: string;
  /** Optional link to partner website or social profile */
  url?: string;
  /** CTA line when `url` is set (default: "Obiščite spletno stran") */
  linkLabel?: string;
}

export interface PartnersGalleryProps {
  heading: string;
  subheading?: string;
  partners: Partner[];
}
