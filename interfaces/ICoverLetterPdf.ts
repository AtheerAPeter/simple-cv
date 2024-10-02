export interface ICoverLetterPdf {
  personalDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  date: string;
  recipient: {
    company: string;
    manager: string;
    address: string;
    position: string;
  };
  paragraph: string;
  opening: string;
  closing: string;
}
