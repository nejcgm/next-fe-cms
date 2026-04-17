export interface GalleryImage {
  src: string;
  alt?: string;
}

export interface GalleryProps {
  heading: string;
  subheading?: string;
  images: GalleryImage[];
}
