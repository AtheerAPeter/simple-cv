import React from "react";
import { ICoverLetterPdf } from "@/interfaces/ICoverLetterPdf";

interface Props {
  data: ICoverLetterPdf;
  accentColor?: string;
}

const renderHtmlContent = (content: string) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default function CoverLetterThumbnail({ data, accentColor }: Props) {
  const styles = `
    .cover-letter-thumbnail {
      font-family: Roboto, sans-serif;
      font-size: 4px;
      line-height: 1.2;
      padding: 8px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .header {
      margin-bottom: 4px;
      display: flex;
      flex-direction: column;
    }
    .name {
      font-size: 8px;
      font-weight: bold;
      margin: 0 0 2px 0;
    }
    .contact-info {
      font-size: 5px;
      margin-bottom: 1px;
    }
    .date {
      font-size: 5px;
      margin-bottom: 3px;
    }
    .recipient {
      font-size: 5px;
      margin-bottom: 6px;
    }
    .recipient-name {
      font-size: 4px;
      font-weight: bold;
      margin-bottom: 1px;
    }
    .content {
      font-size: 4px;
      flex-grow: 1;
      overflow: hidden;
    }
    .description {
      margin-bottom: 2px;
    }
  `;

  return (
    <div className="relative mx-auto h-96 shadow-md bg-white overflow-hidden rounded-md">
      <style>{styles}</style>
      <div className="cover-letter-thumbnail">
        {/* Header */}
        <div className="header">
          <h1 className="name">{data.personalDetails?.name}</h1>
          <div className="contact-info">{data.personalDetails?.email}</div>
          <div className="contact-info">{data.personalDetails?.phone}</div>
          <div className="contact-info">{data.personalDetails?.address}</div>
        </div>

        {/* Date */}
        <div className="date">{data.date}</div>

        {/* Recipient */}
        <div className="recipient">
          <div className="recipient-name">{data.recipient?.manager}</div>
          <div>{data.recipient?.company}</div>
          <div>{data.recipient?.address}</div>
          <div>{data.recipient?.position}</div>
        </div>

        {/* Content */}
        <div className="content">
          <div className="description">{data.opening}</div>
          <div className="description">
            {renderHtmlContent(data.description)}
          </div>
          <div className="description">{data.closing}</div>
        </div>
      </div>
    </div>
  );
}
