export type Member = {
  name: string;
  title: string;
  email: string;
  picturePath: string | null;
};

export type ProgramItem = {
    time?: string;
    what: string;
    where: string;
};

export type BedriftItem = {
    name: string;
    logo: string;
    spons: string;
}