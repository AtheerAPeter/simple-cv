import { renderHtmlContent } from "@/components/renderHTMLContent";
import { ICvPdf } from "@/interfaces/ICvPdf";
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

/**
 * Renders a resume template using the provided data and accent color
 * @param {Object} data - The resume data containing personal details, experiences, education, skills, projects, languages, and hobbies
 * @param {string} accentColor - The accent color to be used in the resume template (optional)
 * @returns {JSX.Element} A React component representing the formatted resume
 */
export default function Template4({ data, accentColor }: Props) {
  const primaryColor = accentColor || "#f4a300";
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 30,
      fontFamily: "Roboto",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 4,
    },
    contactInfo: {
      fontSize: 10,
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
    },
    title: {
      fontSize: 12,
      color: "#666666",
    },
    contactItem: {
      flexDirection: "row",
      gap: 4,
    },
    section: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: primaryColor,
      paddingBottom: 2,
      color: primaryColor,
    },
    experienceItem: {
      marginBottom: 8,
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: "bold",
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
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} wrap={false}>
          <View style={styles.contactInfo} wrap={false}>
            <View>
              <Text style={styles.name}>{data.personalDetails.name}</Text>
              <Text style={styles.title}>{data.personalDetails.title}</Text>
            </View>
            {data.personalDetails.address && (
              <View style={styles.contactItem} wrap={false}>
                <Text style={{ fontWeight: "bold" }}>Address:</Text>{" "}
                <Text style={{ fontWeight: "normal" }}>
                  {data.personalDetails.address}
                </Text>
              </View>
            )}
            {data.personalDetails.phone && (
              <View style={styles.contactItem} wrap={false}>
                <Text style={{ fontWeight: "bold" }}>Phone:</Text>{" "}
                <Text style={{ fontWeight: "normal" }}>
                  {data.personalDetails.phone}
                </Text>
              </View>
            )}
            {data.personalDetails.email && (
              <View style={styles.contactItem} wrap={false}>
                <Text style={{ fontWeight: "bold" }}>Email:</Text>{" "}
                <Text style={{ fontWeight: "normal" }}>
                  {data.personalDetails.email}
                </Text>
              </View>
            )}
            {data.personalDetails.github && (
              <View style={styles.contactItem} wrap={false}>
                <Text style={{ fontWeight: "bold" }}>LinkedIn:</Text>{" "}
                <Link src={data.personalDetails.github}>
                  <Text style={{ fontWeight: "normal", color: "#000" }}>
                    {data.personalDetails.github}
                  </Text>
                </Link>
              </View>
            )}
          </View>
          {data.personalDetails.image && (
            <Image
              src={data.personalDetails.image}
              style={{ ...styles.profileImage, objectFit: "cover" }}
            />
          )}
        </View>

        {data.experiences.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            /**
             * Renders a list of work experiences
             * @param {Array} data.experiences - An array of experience objects
             * @returns {React.ReactNode} A mapped array of View components representing each work experience
             */
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
            <Text style={styles.sectionTitle}>Education</Text>
            /**
             * Renders a list of education items
             * @param {Array} data.educations - An array of education objects
             * @returns {Array} An array of View components, each representing an education item
             */
            {data.educations.map((edu, index) => (
              <View key={index} style={styles.educationItem} wrap={false}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.jobDetails}>
                  {edu.university} | {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        /**
         * Renders a list of skill categories and their associated skills
         * @param {Array} data.skills - An array of skill category objects
         * @param {string} data.skills[].title - The title of the skill category
         * @param {string[]} data.skills[].skills - An array of skills in the category
         * @returns {JSX.Element} A React Native View component containing skill categories and skills
         */
        )}

        {data.skills.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.map((category, index) => (
              <View key={index} style={styles.skillCategory} wrap={false}>
                <Text style={styles.skillTitle}>{category.title}</Text>
                <Text style={styles.skillList}>
                  {category.skills.join(" | ")}
                </Text>
              </View>
            ))}
          </View>
        /**
         * Renders a list of projects
         * @param {Array} data.projects - An array of project objects to be rendered
         * @returns {JSX.Element} A View component containing a mapped list of project items
         */
        )}

        {data.projects?.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.experienceItem} wrap={false}>
                ```
                /**
                 * Renders a list of language items
                 * @param {Array} data.languages - An array of language objects
                 * @param {string} data.languages[].language - The name of the language
                 * @param {string} data.languages[].proficiency - The proficiency level of the language
                 * @returns {React.ReactNode} A list of View components, each containing language information
                 */
                
                ```                <Text style={styles.jobTitle}>{project.title}</Text>
                {project.link && (
                  <Text style={styles.jobDetails}>
                    <Link href={project.link}>{project.link}</Link>
                  </Text>
                )}
                <View style={styles.jobDescription} wrap={false}>
                  {renderHtmlContent(project.description)}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.languages.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Languages</Text>
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
            <Text style={styles.sectionTitle}>Hobbies</Text>
            <Text style={styles.hobbies}>{data.hobbies.join(" | ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
