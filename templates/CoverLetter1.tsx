import { renderHtmlContent } from "@/components/renderHTMLContent";
import { ICoverLetterPdf } from "@/interfaces/ICoverLetterPdf";
import { ITitles } from "@/interfaces/ICvPdf";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

interface Props {
  data: ICoverLetterPdf;
  accentColor?: string;
}

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "/fonts/Roboto-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/Roboto-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

export default function CoverLetter1({ data, accentColor }: Props) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 50,
      fontFamily: "Roboto",
    },
    header: {
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
    },
    contactInfo: {
      fontSize: 10,
      marginTop: 5,
    },
    date: {
      fontSize: 10,
      marginTop: 20,
      marginBottom: 20,
    },
    recipient: {
      fontSize: 10,
      marginBottom: 20,
    },
    salutation: {
      fontSize: 12,
      marginBottom: 15,
    },
    content: {
      fontSize: 10,
      lineHeight: 1.5,
      textAlign: "justify",
    },
    closing: {
      fontSize: 12,
      marginTop: 20,
    },
    signature: {
      fontSize: 12,
      marginTop: 40,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalDetails.name}</Text>
          <Text style={styles.contactInfo}>
            {data.personalDetails.email} | {data.personalDetails.phone}
          </Text>
          <Text style={styles.contactInfo}>{data.personalDetails.address}</Text>
        </View>

        {/* Date */}
        <Text style={styles.date}>{data.date}</Text>

        {/* Recipient */}
        <View style={styles.recipient}>
          <Text>{data.recipient.name}</Text>
          <Text>{data.recipient.title}</Text>
          <Text>{data.recipient.company}</Text>
          <Text>{data.recipient.address}</Text>
        </View>

        {/* Salutation */}
        <Text style={styles.salutation}>{data.salutation},</Text>

        {/* Content */}
        <View style={styles.content}>
          {data.paragraphs.map((paragraph, index) => (
            <Text key={index} style={{ marginBottom: 10 }}>
              {renderHtmlContent(paragraph)}
            </Text>
          ))}
        </View>

        {/* Closing */}
        <Text style={styles.closing}>{data.closing},</Text>

        {/* Signature */}
        <Text style={styles.signature}>{data.personalDetails.name}</Text>
      </Page>
    </Document>
  );
}
