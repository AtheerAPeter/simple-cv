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
  description: string;
  opening: string;
  closing: string;
}

export interface ICoverLetterResponse {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  manager: string;
  position: string;
  companyAddress: string;
  description: string;
  opening: string;
  closing: string;
}
