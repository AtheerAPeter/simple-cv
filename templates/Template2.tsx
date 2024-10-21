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

export default function Template2({ data, accentColor, titles }: Props) {
  const mainColor = accentColor || "#6ba5e3";
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 30,
      fontFamily: "Roboto",
    },
    section: {
      marginBottom: 15,
      borderRadius: 5,
      padding: 10,
    },
    header: {
      marginBottom: 20,
      display: "flex",
      flexDirection: "row",
      backgroundColor: mainColor,
      padding: 10,
      borderRadius: 5,
    },
    name: {
      fontSize: 36,
      fontWeight: "bold",
      color: "#ffffff",
    },
    title: {
      fontSize: 18,
      marginBottom: 5,
      color: "#ffffff",
    },
    contactInfo: {
      fontSize: 12,
      display: "flex",
      flexDirection: "column",
      color: "#ffffff",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: mainColor,
    },
    jobTitle: {
      fontSize: 12,
      color: mainColor,
      fontWeight: "bold",
    },
    jobDetails: {
      fontSize: 12,
      marginBottom: 3,
      color: "#333333",
      fontWeight: "bold",
    },
    jobDescription: {
      fontSize: 12,
      marginLeft: 10,
      color: "#555555",
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
      width: 150,
      height: 150,
      borderRadius: 1000,
      marginRight: 20,
    },
    titleImageContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
    experienceItem: {
      marginBottom: 10,
    },
    jobTitleContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    jobDate: {
      fontSize: 12,
      color: "#777777",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* header */}
        <View style={styles.header} wrap={false}>
          {data.personalDetails.image && (
            <Image
              src={data.personalDetails.image}
              style={{ ...styles.profileImage, objectFit: "cover" }}
            />
          )}

          <View style={styles.contactInfo} wrap={false}>
            <Text style={styles.name}>{data.personalDetails.name}</Text>
            <Text style={styles.title}>{data.personalDetails.title}</Text>
            {data.personalDetails.email.length > 0 && (
              <View
                style={{ flexDirection: "row", gap: 4, marginBottom: 5 }}
                wrap={false}
              >
                <Text style={{ fontWeight: "bold" }}>{titles.email}</Text>{" "}
                <Text style={{ fontWeight: "normal" }}>
                  {data.personalDetails.email}
                </Text>
              </View>
            )}
            {data.personalDetails.phone.length > 0 && (
              <View
                style={{ flexDirection: "row", gap: 4, marginBottom: 5 }}
                wrap={false}
              >
                <Text style={{ fontWeight: "bold" }}>{titles.phone}</Text>{" "}
                <Text style={{ fontWeight: "normal" }}>
                  {data.personalDetails.phone}
                </Text>
              </View>
            )}
            {data.personalDetails.address.length > 0 && (
              <View
                style={{ flexDirection: "row", gap: 4, marginBottom: 5 }}
                wrap={false}
              >
                <Text style={{ fontWeight: "bold" }}>{titles.address}</Text>{" "}
                <Text style={{ fontWeight: "normal" }}>
                  {data.personalDetails.address}
                </Text>
              </View>
            )}
            {data.personalDetails.github.length > 0 && (
              <View
                style={{ flexDirection: "row", gap: 4, marginBottom: 5 }}
                wrap={false}
              >
                <Text style={{ fontWeight: "bold" }}>{titles.github}</Text>{" "}
                <Text style={{ fontWeight: "normal" }}>
                  {data.personalDetails.github}
                </Text>
              </View>
            )}
          </View>
        </View>

        {data.experiences.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>{titles.experience}</Text>
            <View style={styles.section}>
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
          </View>
        )}

        {data.educations.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>{titles.education}</Text>
            <View style={styles.section} wrap={false}>
              {data.educations.map((edu, index) => (
                <View key={index} style={styles.educationItem} wrap={false}>
                  <Text style={styles.jobTitle}>{edu.degree}</Text>
                  <Text style={styles.jobDetails}>
                    {edu.university} | {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.skills.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>{titles.skills}</Text>
            <View style={styles.section} wrap={false}>
              {data.skills.map((category, index) => (
                <View key={index} style={styles.skillCategory} wrap={false}>
                  <Text style={styles.skillTitle}>{category.title}</Text>
                  <Text style={styles.skillList}>
                    {category.skills.join(" | ")}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.projects?.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>{titles.projects}</Text>
            <View style={styles.section} wrap={false}>
              {data.projects.map((project, index) => (
                <View key={index} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.jobTitle}>{project.title}</Text>
                  {project.link && (
                    <Text style={styles.jobDetails}>
                      <Link
                        style={{ color: "#000", fontWeight: "bold" }}
                        href={project.link}
                      >
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
          </View>
        )}

        {data.languages.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>{titles.languages}</Text>
            <View style={styles.section} wrap={false}>
              {data.languages.map((lang, index) => (
                <View key={index} style={styles.languageItem} wrap={false}>
                  <Text>{lang.language}</Text>
                  <Text>({lang.proficiency})</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.hobbies.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>{titles.hobbies}</Text>
            <View style={styles.section} wrap={false}>
              <Text style={styles.hobbies}>{data.hobbies.join(" | ")}</Text>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
