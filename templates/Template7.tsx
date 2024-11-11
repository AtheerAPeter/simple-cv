import { renderHtmlContent } from "@/components/renderHTMLContent";
import { ICvPdf, ITitles } from "@/interfaces/ICvPdf";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Link,
} from "@react-pdf/renderer";

interface Props {
  data: ICvPdf;
  accentColor?: string;
  titles: ITitles;
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

export default function Template7({ data, accentColor, titles }: Props) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 30,
      fontFamily: "Roboto",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    headerLeft: {
      flexDirection: "column",
      flex: 1,
    },
    headerRight: {
      alignItems: "flex-end",
    },
    name: {
      fontSize: 32,
      fontWeight: "bold",
    },
    title: {
      fontSize: 20,
      color: accentColor || "#4A90E2",
      marginTop: 5,
    },
    contactInfo: {
      fontSize: 10,
      marginTop: 10,
    },
    contactRow: {
      flexDirection: "row",
      marginBottom: 5,
    },
    contactLabel: {
      fontWeight: "bold",
      width: 60,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 10000,
      objectFit: "cover",
    },
    section: {
      marginTop: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: accentColor || "#4A90E2",
    },
    content: {
      fontSize: 10,
    },
    experienceItem: {
      marginBottom: 10,
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: "bold",
    },
    jobDetails: {
      fontSize: 10,
      marginBottom: 5,
    },
    skillCategory: {
      marginBottom: 8,
    },
    skillTitle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 2,
    },
    skillList: {
      fontSize: 10,
    },
    languageItem: {
      flexDirection: "row",
      fontSize: 10,
      marginBottom: 2,
      gap: 5,
    },
    link: {
      color: accentColor || "#4A90E2",
      textDecoration: "none",
      fontSize: 10,
    },
    jobTitleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    experienceDate: {
      fontSize: 10,
      color: accentColor || "#4A90E2",
      fontWeight: "bold",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{data.personalDetails.name}</Text>
            <Text style={styles.title}>{data.personalDetails.title}</Text>
            <View style={styles.contactInfo}>
              {data.personalDetails.email.length > 0 && (
                <View style={styles.contactRow}>
                  <Text style={styles.contactLabel}>{titles.email}</Text>
                  <Text>{data.personalDetails.email}</Text>
                </View>
              )}
              {data.personalDetails.phone.length > 0 && (
                <View style={styles.contactRow}>
                  <Text style={styles.contactLabel}>{titles.phone}</Text>
                  <Text>{data.personalDetails.phone}</Text>
                </View>
              )}
              {data.personalDetails.address.length > 0 && (
                <View style={styles.contactRow}>
                  <Text style={styles.contactLabel}>{titles.address}</Text>
                  <Text>{data.personalDetails.address}</Text>
                </View>
              )}
              {data.personalDetails.github.length > 0 && (
                <View style={styles.contactRow}>
                  <Text style={styles.contactLabel}>{titles.github}</Text>
                  <Link src={data.personalDetails.github} style={styles.link}>
                    {data.personalDetails.github}
                  </Link>
                </View>
              )}
            </View>
          </View>
          <View style={styles.headerRight}>
            {data.personalDetails.image && (
              <Image
                src={data.personalDetails.image}
                style={styles.profileImage}
              />
            )}
          </View>
        </View>

        {data.experiences?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.experience}</Text>
            {data.experiences.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobTitleContainer}>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <Text style={styles.experienceDate}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.jobDetails}>{exp.employer}</Text>
                <View style={styles.content}>
                  {renderHtmlContent(exp.description)}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.educations?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.education}</Text>
            {data.educations.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.jobDetails}>
                  {edu.university} | {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.skills}</Text>
            {data.skills.map((category, index) => (
              <View key={index} style={styles.skillCategory}>
                <Text style={styles.skillTitle}>{category.title}</Text>
                <Text style={styles.skillList}>
                  {category.skills.join(" | ")}
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.languages?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.languages}</Text>
            {data.languages.map((lang, index) => (
              <View key={index} style={styles.languageItem}>
                <Text>{lang.language}</Text>
                <Text>({lang.proficiency})</Text>
              </View>
            ))}
          </View>
        )}

        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.projects}</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{project.title}</Text>
                {project.link && (
                  <Link src={project.link} style={styles.link}>
                    {project.link}
                  </Link>
                )}
                <View style={styles.content}>
                  {renderHtmlContent(project.description)}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.hobbies?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.hobbies}</Text>
            <Text style={styles.content}>{data.hobbies.join(" | ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
