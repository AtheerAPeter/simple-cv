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

export default function Template6({ data, accentColor, titles }: Props) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 30,
      fontFamily: "Roboto",
    },
    section: {
      marginBottom: 10,
    },
    header: {
      marginBottom: 20,
      display: "flex",
      flexDirection: "row",
    },
    name: {
      fontSize: 32,
      fontWeight: "bold",
      color: accentColor,
    },
    title: {
      fontSize: 16,
      marginBottom: 10,
      color: accentColor,
    },
    contactInfo: {
      fontSize: 10,
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },
    contactLabel: {
      fontWeight: "bold",
      color: accentColor,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
      borderBottomWidth: 2,
      borderBottomColor: accentColor,
      paddingBottom: 2,
      color: accentColor,
    },
    experienceItem: {
      marginBottom: 8,
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: accentColor,
    },
    jobTitleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    jobDetails: {
      fontSize: 10,
      marginBottom: 3,
    },
    jobDate: {
      fontSize: 10,
      marginBottom: 3,
      fontWeight: "bold",
    },
    jobDescription: {
      fontSize: 10,
      marginLeft: 10,
    },
    educationItem: {
      marginBottom: 5,
    },
    skillCategory: {
      marginBottom: 8,
    },
    skillTitle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 2,
      color: accentColor,
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
    hobbies: {
      fontSize: 10,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 1000,
    },
    titleImageContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      marginRight: 20,
    },
    combinedSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    halfSection: {
      width: "48%",
    },
    link: {
      color: accentColor,
      textDecoration: "none",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* header */}
        <View style={styles.header} wrap={false}>
          <View wrap={false}>
            <View style={styles.titleImageContainer}>
              {data.personalDetails.image && (
                <Image
                  src={data.personalDetails.image}
                  style={{ ...styles.profileImage, objectFit: "cover" }}
                />
              )}
            </View>
          </View>
          <View style={styles.contactInfo} wrap={false}>
            <Text style={styles.name}>{data.personalDetails.name}</Text>
            <Text style={styles.title}>{data.personalDetails.title}</Text>
            {data.personalDetails.email && (
              <View style={{ flexDirection: "row", gap: 4 }} wrap={false}>
                <Text style={styles.contactLabel}>{titles.email}</Text>
                <Text>{data.personalDetails.email}</Text>
              </View>
            )}
            {data.personalDetails.phone && (
              <View style={{ flexDirection: "row", gap: 4 }} wrap={false}>
                <Text style={styles.contactLabel}>{titles.phone}</Text>
                <Text>{data.personalDetails.phone}</Text>
              </View>
            )}
            {data.personalDetails.address && (
              <View style={{ flexDirection: "row", gap: 4 }} wrap={false}>
                <Text style={styles.contactLabel}>{titles.address}</Text>
                <Text>{data.personalDetails.address}</Text>
              </View>
            )}
            {data.personalDetails.github && (
              <View style={{ flexDirection: "row", gap: 4 }} wrap={false}>
                <Text style={styles.contactLabel}>{titles.github}</Text>
                <Text>{data.personalDetails.github}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.combinedSection}>
          {data.skills.length > 0 && (
            <View style={styles.halfSection} wrap={false}>
              <Text style={styles.sectionTitle}>{titles.skills}</Text>
              {data.skills.map((category, index) => (
                <View key={index} style={styles.skillCategory} wrap={false}>
                  <Text style={styles.skillTitle}>{category.title}</Text>
                  <Text style={styles.skillList}>
                    {category.skills.join(" | ")}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {data.projects?.length > 0 && (
            <View style={styles.halfSection} wrap={false}>
              <Text style={styles.sectionTitle}>{titles.projects}</Text>
              {data.projects.map((project, index) => (
                <View key={index} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.jobTitle}>{project.title}</Text>
                  {project.link && (
                    <Text style={styles.jobDetails}>
                      <Link style={styles.link} href={project.link}>
                        {project.link}
                      </Link>
                    </Text>
                  )}
                  <View style={styles.jobDescription} wrap={false}>
                    {renderHtmlContent(project.description)}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {data.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.experience}</Text>
            {data.experiences.map((exp, index) => (
              <View key={index} style={styles.experienceItem} wrap={false}>
                <View style={styles.jobTitleContainer} wrap={false}>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <Text style={styles.jobDate}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.jobDetails}>{exp.employer}</Text>
                <View style={styles.jobDescription} wrap={false}>
                  {renderHtmlContent(exp.description)}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.educations.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{titles.education}</Text>
            {data.educations.map((edu, index) => (
              <View key={index} style={styles.educationItem} wrap={false}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.jobDetails}>
                  {edu.university} | {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.languages.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{titles.languages}</Text>
            {data.languages.map((lang, index) => (
              <View key={index} style={styles.languageItem} wrap={false}>
                <Text>{lang.language}</Text>
                <Text>({lang.proficiency})</Text>
              </View>
            ))}
          </View>
        )}

        {data.hobbies.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{titles.hobbies}</Text>
            <Text style={styles.hobbies}>{data.hobbies.join(" | ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
