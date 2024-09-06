import { XMLParser } from 'fast-xml-parser';

// const parser = new XMLParser();



// export async function parseXMLFile(url) {
//     const options = {
//         ignoreAttributes : false
//     };
//     const parser = new XMLParser(options);
//     const response = fetch(url);
//     const xmlText = await response.text();
//     const jsonObj = parser.parse(xmlText)
//     console.log(jsonObj)
//     return jsonObj
// }

export async function parseXMLFile(url) {
    // const options = {
    //     ignoreAttributes: false,
        
    // };
    // const getDayOfWeek = (dateString) => {
    //     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
    //     const date = new Date(dateString); 
    //     const dayOfWeek = date.getUTCDay()
        
    //     return daysOfWeek[dayOfWeek]; 
    //   };
    const parser = new XMLParser();
    try {
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const xmlText = await response.text();
        const jsonObj = parser.parse(xmlText);
        if (jsonObj.feed && jsonObj.feed.entry.updated) {
            jsonObj.feed.entry.updated = jsonObj.feed.entry.updated.split('T')[0];  // Split by 'T' and keep only the date part
          }
        if (Array.isArray(jsonObj.feed.entry)) {
            jsonObj.feed.entry.forEach((entry) => {
              if (entry.updated) {
                entry.updated = entry.updated.split('T')[0]; // Remove the time part
              }
            });
          }
        // console.log(jsonObj)
        
          // console.log(jsonObj)
        return jsonObj;
    } catch (error) {
        console.error("Error fetching and parsing XML:", error);
    }
}