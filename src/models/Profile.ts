export interface Profile {
  id: string;
  name: string;
  imageSrc: string;
  shortName: string;
}

export interface Society extends Profile {
  colour: string;
}