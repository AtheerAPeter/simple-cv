import React from "react";
import ShowcaseItem from "./ShowcaseItem";
import { getLocale } from "next-intl/server";

const showcaseList = [
  {
    title: "Enter your details",
    description: "Enter your details and start creating your CV",
    image: "/landing/1.png",
  },
  {
    title: "Enter your details",
    description: "Enter your details and start creating your CV",
    image: "/landing/2.png",
  },
  {
    title: "Enter your details",
    description: "Enter your details and start creating your CV",
    image: "/landing/3.png",
  },
];

export default async function ShowcaseList() {
  const locale = await getLocale();

  const showcaseList =
    locale === "de"
      ? [
          {
            title: "Neu Erstellen",
            description:
              "Erstellen Sie ein neues Dokument in der Dokumentenliste. Es wird in Ihrem Konto gespeichert und kann von überall aus abgerufen und heruntergeladen werden.",
            image: "/landing/0-de.png",
          },
          {
            title: "Füllen Sie Ihre Daten aus",
            description:
              "Geben Sie Ihre Daten, Erfahrungen, Fähigkeiten und Ausbildung ein, um Ihren Lebenslauf zu erstellen.",
            image: "/landing/1-de.png",
          },
          {
            title: "Verwenden Sie das magische Eingabefeld",
            description:
              "Bewerben Sie sich ganz einfach, indem Sie eine Stellenbeschreibung und Anforderungen in dieses magische Eingabefeld einfügen. Es verwendet KI, um Ihren Lebenslauf zu modifizieren und besser an die Stellenbeschreibung anzupassen.",
            image: "/landing/2-de.png",
          },
          {
            title: "Der Differenz-Viewer",
            description:
              "Wählen Sie mit dem Differenz-Viewer aus, was Sie behalten möchten. Sie können die Änderungen sehen, die an Ihrem Lebenslauf vorgenommen werden.",
            image: "/landing/3-de.png",
          },
          {
            title: "KI-Übersetzung",
            description:
              "Nutzen Sie unsere KI-gestützte Übersetzungsfunktion, um Ihren Lebenslauf mühelos zu übersetzen und sicherzustellen, dass Ihr berufliches Profil ein globales Publikum erreicht.",
            image: "/landing/4-de.png",
          },
          {
            title: "KI-Bewerbungsschreiben",
            description:
              "Nachdem Sie Ihren Lebenslauf fertiggestellt haben, nutzen Sie unseren KI-gestützten Generator für Bewerbungsschreiben, um ein überzeugendes Anschreiben zu erstellen. Es integriert nahtlos Ihre Lebenslaufdaten und die Stellenbeschreibung, um ein maßgeschneidertes Anschreiben zu erstellen.",
            image: "/landing/5-de.png",
          },
        ]
      : [
          {
            title: "Create New",
            description:
              "Create a new document in your documents list. It will be saved to your account, allowing you to access and download it from anywhere.",
            image: "/landing/0.png",
          },
          {
            title: "Fill in Your Details",
            description:
              "Enter your personal details, experiences, skills, and education to generate your CV.",
            image: "/landing/1.png",
          },
          {
            title: "Use the Magic Input",
            description:
              "Easily apply for jobs by pasting a job description and requirements into the magic input. Our AI will adjust and organize your CV for a better match to the job.",
            image: "/landing/2.png",
          },
          {
            title: "The Difference Viewer",
            description:
              "Use the difference viewer to select what you want to keep. You’ll see the changes being made to your CV in real time.",
            image: "/landing/3.png",
          },
          {
            title: "AI Translation",
            description:
              "Take advantage of our AI-powered translation feature to effortlessly translate your CV, making your professional profile accessible to a global audience.",
            image: "/landing/4.png",
          },
          {
            title: "AI Cover Letter",
            description:
              "Once your CV is ready, use our AI-powered cover letter generator to create a tailored cover letter. It integrates your CV information with the job description to craft a compelling letter.",
            image: "/landing/5.png",
          },
        ];

  return (
    <div className="space-y-6">
      {showcaseList.map((showcase, index) => (
        <ShowcaseItem
          key={index}
          side={index % 2 === 0 ? "left" : "right"}
          // side="left"
          title={showcase.title}
          description={showcase.description}
          image={showcase.image}
        />
      ))}
    </div>
  );
}
