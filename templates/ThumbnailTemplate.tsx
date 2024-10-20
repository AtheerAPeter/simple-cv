import React from "react";
import { ICvPdf, ITitles } from "@/interfaces/ICvPdf";

interface Props {
  data: ICvPdf;
  accentColor?: string;
  titles: ITitles;
}

const renderHtmlContent = (content: string) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default function ThumbnailTemplate({
  data,
  accentColor,
  titles,
}: Props) {
  const styles = `
    .cv-thumbnail {
      font-family: Roboto, sans-serif;
      font-size: 4px;
      line-height: 1.2;
      padding: 8px;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .header {
      display: flex;
      margin-bottom: 6px;
      flex-direction: row;
    }
    .profile-img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 4px;
    }
    .name {
      font-size: 8px;
      font-weight: bold;
      margin: 0;
    }
    .title {
      font-size: 5px;
      color: #666;
      margin: 0 0 2px 0;
    }
    .contact-info {
      font-size: 3px;
    }
    .contact-info div {
      margin-bottom: 1px;
    }
    .section {
      margin-bottom: 6px;
    }
    .section-title {
      font-size: 6px;
      font-weight: bold;
      margin-bottom: 2px;
      padding-bottom: 1px;
      border-bottom: 0.5px solid ${accentColor || "#ccc"};
      color: ${accentColor || "#333"};
    }
    .experience-item, .education-item, .skill-item {
      margin-bottom: 3px;
    }
    .experience-header {
      display: flex;
      justify-content: space-between;
    }
    .job-title, .degree {
      font-size: 5px;
      font-weight: bold;
    }
    .job-date, .edu-details, .skill-list {
      font-size: 3px;
    }
    .job-employer {
      font-size: 4px;
    }
    .job-description {
      font-size: 3px;
      margin-left: 2px;
    }
  `;

  return (
    <div className="relative mx-auto h-96 shadow-md bg-white overflow-hidden rounded-md">
      <style>{styles}</style>
      <div className="cv-thumbnail">
        {/* Header */}
        <header className="header">
          <div>
            {data.personalDetails?.image && (
              <img
                src={data.personalDetails.image}
                alt="Profile"
                className="profile-img"
              />
            )}
          </div>
          <div>
            <h1 className="name">{data.personalDetails?.name}</h1>
            <h2 className="title">{data.personalDetails?.title}</h2>
            <div className="contact-info">
              {data.personalDetails?.email && (
                <div>
                  <strong>{titles.email}:</strong> {data.personalDetails.email}
                </div>
              )}
              {data.personalDetails?.phone && (
                <div>
                  <strong>{titles.phone}:</strong> {data.personalDetails.phone}
                </div>
              )}
              {data.personalDetails?.address && (
                <div>
                  <strong>{titles.address}:</strong>{" "}
                  {data.personalDetails.address}
                </div>
              )}
              {data.personalDetails?.github && (
                <div>
                  <strong>{titles.github}:</strong>{" "}
                  {data.personalDetails.github}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Experience */}
        {data.experiences?.length > 0 && (
          <section className="section">
            <h3 className="section-title">{titles.experience}</h3>
            {data.experiences.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <span className="job-title">{exp.title}</span>
                  <span className="job-date">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="job-employer">{exp.employer}</div>
                <div className="job-description">
                  {renderHtmlContent(exp.description)}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.educations?.length > 0 && (
          <section className="section">
            <h3 className="section-title">{titles.education}</h3>
            {data.educations.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="degree">{edu.degree}</div>
                <div className="edu-details">
                  {edu.university} | {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section className="section">
            <h3 className="section-title">{titles.skills}</h3>
            {data.skills.map((category, index) => (
              <div key={index} className="skill-item">
                <div className="job-title">{category.title}</div>
                <div className="skill-list">{category.skills.join(" | ")}</div>
              </div>
            ))}
          </section>
        )}

        {/* Projects, Languages, and Hobbies are omitted for brevity in the thumbnail */}
      </div>
    </div>
  );
}
