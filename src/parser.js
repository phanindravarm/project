import { XMLParser } from "fast-xml-parser";

export async function parseXMLFile(url) {
  const parser = new XMLParser();
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const xmlText = await response.text();
    const jsonObj = parser.parse(xmlText);
    if (jsonObj.feed && jsonObj.feed.entry.updated) {
      jsonObj.feed.entry.updated = jsonObj.feed.entry.updated.split("T")[0]; // Split by 'T' and keep only the date part
    }
    if (Array.isArray(jsonObj.feed.entry)) {
      jsonObj.feed.entry.forEach((entry) => {
        if (entry.updated) {
          entry.updated = entry.updated.split("T")[0]; // Remove the time part
        }
      });
    }
    return jsonObj;
  } catch (error) {
    console.error("Error fetching and parsing XML:", error);
  }
}
