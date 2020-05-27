export interface Profile {
  id: string;
  name: string;
  imageSrc: string;
}

export interface Society extends Profile {
  colour: string;
}