"use client";
import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import ReactHtmlParser from "react-html-parser";

const styles = StyleSheet.create({
  ul: {
    marginLeft: 10,
  },
  li: {
    marginBottom: 2,
  },
  bulletPoint: {
    width: 3,
    height: 3,
    borderRadius: 1,
    backgroundColor: "black",
    marginRight: 5,
    marginTop: 3,
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 5,
  },
});

export const renderHtmlContent = (htmlContent: string) => {
  const parsedContent = ReactHtmlParser(htmlContent);
  return parsedContent.map((element: React.ReactNode, index: number) => {
    if (element && typeof element === "object" && "type" in element) {
      if (element.type === "ul") {
        return (
          <View key={index} style={styles.ul}>
            {element.props?.children?.map(
              (li: React.ReactElement, liIndex: number) => (
                <View
                  key={liIndex}
                  style={{ flexDirection: "row", marginBottom: 2 }}
                >
                  <View style={styles.bulletPoint} />
                  <Text style={styles.li}>{li.props.children[0]}</Text>
                </View>
              )
            )}
          </View>
        );
      } else if (element.type === "p") {
        return (
          <Text key={index} style={styles.paragraph}>
            {element.props.children}
          </Text>
        );
      }
    } else if (typeof element === "string") {
      return (
        <Text key={index} style={styles.paragraph}>
          {element}
        </Text>
      );
    }
    return null;
  });
};
