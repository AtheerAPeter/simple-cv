import { ICoverLetterPdf } from "@/interfaces/ICoverLetterPdf";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

export const useCoverLetterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  // employer states
  const [company, setCompany] = useState("");
  const [manager, setManager] = useState("");
  const [position, setPosition] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  //   description
  const [description, setDescription] = useState("");
  const [opening, setOpening] = useState("");
  const [closing, setClosing] = useState("");

  const data: ICoverLetterPdf = {
    personalDetails: {
      name,
      email,
      phone,
      address,
    },
    date,
    recipient: {
      company,
      manager,
      address: companyAddress,
      position,
    },
    paragraph: description,
    opening,
    closing,
  };

  const [debouncedData, setDebouncedData] = useState(data);
  const debouncedSetData = useCallback(
    debounce((newData: ICoverLetterPdf) => {
      setDebouncedData(newData);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetData(data);
  }, [data, debouncedSetData]);

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    date,
    setDate,
    company,
    setCompany,
    manager,
    setManager,
    position,
    setPosition,
    companyAddress,
    setCompanyAddress,
    description,
    setDescription,
    data,
    debouncedData,
    opening,
    setOpening,
    closing,
    setClosing,
  };
};
