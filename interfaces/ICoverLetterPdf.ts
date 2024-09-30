export interface ICoverLetterPdf {
  personalDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  date: string;
  recipient: {
    name: string;
    title: string;
    company: string;
    address: string;
  };
  salutation: string;
  paragraphs: string[];
  closing: string;
}
