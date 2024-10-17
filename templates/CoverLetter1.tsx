import { ICoverLetterPdf } from "@/interfaces/ICoverLetterPdf";
import { renderHtmlContent } from "@/components/renderHTMLContent";
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
      marginBottom: 10,
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
      marginBottom: 10,
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
    recipientName: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 5,
    },
    recipientCompany: {
      fontSize: 10,
    },
    recipientAddress: {
      fontSize: 10,
    },
    description: {
      fontSize: 10,
      lineHeight: 1.6,
      textAlign: "justify",
      marginBottom: 3,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalDetails.name}</Text>
          <Text style={styles.contactInfo}>{data.personalDetails.email}</Text>
          <Text style={styles.contactInfo}>{data.personalDetails.phone}</Text>
          <Text style={styles.contactInfo}>{data.personalDetails.address}</Text>
        </View>

        {/* Date */}
        <Text style={styles.date}>{data.date}</Text>

        {/* Recipient */}
        <View style={styles.recipient}>
          <Text style={styles.recipientName}>{data.recipient.manager}</Text>
          <Text style={styles.recipientCompany}>{data.recipient.company}</Text>
          <Text style={styles.recipientAddress}>{data.recipient.address}</Text>
          <Text style={styles.recipientAddress}>{data.recipient.position}</Text>
        </View>

        {/* Content */}
        <Text style={styles.description}>{data.opening}</Text>
        <View style={styles.description}>
          {renderHtmlContent(data.description)}
        </View>
        <Text style={styles.description}>{data.closing}</Text>
      </Page>
    </Document>
  );
}
