export interface Profile {
  id: number;
  name: string;
  imageSrc: string;
}

export interface Society extends Profile {
  colour: string;
}