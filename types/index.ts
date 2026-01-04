export type InternGroup = {
  content: string;
  title?: string;
};

export type PageProps = {
  content: string;
};

export type MemberCardProps = {
  memberPicture?: string;
  memberName: string;
  memberTitle: string;
  titleMail: string;
};

export type ArrangementCardProps = {
  title: string;
  date: string;
  description: string;
};

export type JobCardProps = {
  company: string;
  position: string;
  deadline: string;
  location: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Member = {
  name: string;
  title: string;
  email: string;
  picturePath: string | null;
};

export type ContentItem = {
  type: "image" | "markdown";
  content: string;
  buttonHref?: string | null; // Link til sub pages - "/bedrift", "/", "kontakt", osv.
  buttonLabel?: string | null; // Det som skal stå på knappen
};

export type ContentRow = ContentItem[];


export type LayoutCsvRow = {
    index: string;
    file: string;
    buttonhref?: string;
    buttonlabel?: string;
};

export type FaqProps = {
  question: string;
  answer: string;
};