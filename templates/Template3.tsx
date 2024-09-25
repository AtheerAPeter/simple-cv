import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
  Font,
} from "@react-pdf/renderer";
import { ICvPdf } from "@/interfaces/ICvPdf";
import { renderHtmlContent } from "@/components/renderHTMLContent";

interface Props {
  data: ICvPdf;
  accentColor?: string;
}

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

/**
 * A React functional component that renders a resume template.
 * @param {Object} props - The component props.
 * @param {Object} props.data - The resume data containing personal details, experiences, education, skills, languages, hobbies, and projects.
 * @param {string} props.accentColor - The accent color to be used for certain elements in the template.
 * @returns {React.ReactElement} A Document component containing a styled resume layout.
 */
const Template3: React.FC<Props> = ({ data, accentColor }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
      fontFamily: "Roboto",
    },
    sidebar: {
      width: "30%",
      padding: 20,
      backgroundColor: "#666",
      color: "#FFFFFF",
    },
    main: {
      width: "70%",
      padding: 20,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 20,
      alignSelf: "center",
      objectFit: "cover",
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    title: {
      fontSize: 12,
      marginBottom: 20,
      color: "#BDC3C7",
      textAlign: "center",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      color: accentColor,
      textAlign: "center",
    },
    sidebarSection: {
      marginBottom: 20,
    },
    contactInfo: {
      fontSize: 10,
      marginBottom: 5,
    },
    mainSection: {
      marginBottom: 20,
    },
    experienceItem: {
      marginBottom: 15,
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: "bold",
    },
    jobDetails: {
      fontSize: 10,
      marginBottom: 5,
      color: "#7F8C8D",
    },
    jobDescription: {
      fontSize: 10,
      marginLeft: 10,
    },
    skillCategory: {
      marginBottom: 10,
    },
    skillTitle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 5,
    },
    skillList: {
      fontSize: 10,
    },
    link: {
      color: accentColor,
      textDecoration: "none",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {data.personalDetails.image && (
            <Image
              src={data.personalDetails.image}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.name}>{data.personalDetails.name}</Text>
          <Text style={styles.title}>{data.personalDetails.title}</Text>

          <View style={styles.sidebarSection}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.contactInfo}>{data.personalDetails.email}</Text>
            <Text style={styles.contactInfo}>{data.personalDetails.phone}</Text>
            <Text style={styles.contactInfo}>
              {data.personalDetails.address}
            </Text>
            {data.personalDetails.github && (
              <Link src={data.personalDetails.github} style={styles.link}>
                <Text style={styles.contactInfo}>
                  GitHub: {data.personalDetails.github}
                </Text>
              </Link>
            )}
          </View>

          <View style={styles.sidebarSection}>
            <Text style={styles.sectionTitle}>Skills</Text>
            /**
             * Renders a list of skill categories and their associated skills
             * @param {Array} data.skills - An array of skill category objects
             * @param {string} data.skills[].title - The title of the skill category
             * @param {Array} data.skills[].skills - An array of skills within the category
             * @returns {JSX.Element} A View component containing mapped skill categories and their skills
             */
            {data.skills.map((category, index) => (
              <View key={index} style={styles.skillCategory}>
                <Text style={styles.skillTitle}>{category.title}</Text>
                <Text style={styles.skillList}>
                  {category.skills.join(" • ")}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.sidebarSection}>
            <Text style={styles.sectionTitle}>Languages</Text>
            ```
            /**
             * Renders a list of languages with their proficiency levels
             * @param {Array} data.languages - An array of language objects containing language and proficiency information
             * @returns {Array} An array of Text components displaying language and proficiency for each language
             */
            ```
            {data.languages.map((lang, index) => (
              <Text key={index} style={styles.contactInfo}>
                {lang.language} ({lang.proficiency})
              </Text>
            ))}
          </View>

          {data.hobbies.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sectionTitle}>Hobbies</Text>
              <Text style={styles.contactInfo}>{data.hobbies.join(" • ")}</Text>
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <View style={styles.mainSection}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            /**
             * Renders a list of work experiences
             * @param {Array} data.experiences - An array of experience objects
             * @param {Function} renderHtmlContent - A function to render HTML content
             * @returns {JSX.Element} A View component containing a mapped list of experience items
             */
            {data.experiences.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{exp.title}</Text>
                <Text style={styles.jobDetails}>
                  {exp.employer} | {exp.startDate} - {exp.endDate}
                </Text>
                <View style={{ fontSize: 10, marginLeft: 10 }}>
                  {renderHtmlContent(exp.description)}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.mainSection}>
            <Text style={styles.sectionTitle}>Education</Text>
            ```
            /**
             * Renders a list of education items
             * @param {Array} data.educations - An array of education objects
             * @returns {JSX.Element} A View component containing a mapped list of education items
             */
            ```
            {data.educations.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.jobDetails}>
                  {edu.university} | {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </View>

          {data.projects?.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>Projects</Text>
              /**
               * Renders a list of projects from the provided data
               * @param {Array} data.projects - An array of project objects to be rendered
               * @returns {React.ReactNode} A mapped array of View components, each representing a project
               */
              {data.projects.map((project, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.jobTitle}>{project.title}</Text>
                  {project.link && (
                    <Link src={project.link} style={styles.link}>
                      <Text style={styles.jobDetails}>{project.link}</Text>
                    </Link>
                  )}
                  <View style={{ fontSize: 10, marginLeft: 10 }}>
                    {renderHtmlContent(project.description)}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default Template3;
