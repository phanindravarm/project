import React from "react";
import { useState, useEffect } from "react";
import { parseXMLFile } from "./parser";
import Feed from "./feed";
export default function Grouping() {
  const [feeds, setFeeds] = useState([]);
  async function Main() {
    const jsonObj = await parseXMLFile(
      "https://raw.githubusercontent.com/ksubbu199/ksubbu199.github.io/gh-pages/feed.atom"
    );
    // setFeeds(jsonObj.feed.entry);
    const info=jsonObj.feed.entry
    const result = Object.groupBy(info, ({ updated }) => updated);
    setFeeds(result)
    // console.log("length ",feeds["2024-09-03"].length)
    // console.log(feeds)
  }
  useEffect(() => {
    Main();
  }, []);


  console.log(feeds["2024-09-03"].length)
  

  return (
    <>
    {/* <h1>heyyyy</h1>
      {feeds["2024-09-03"].map((feed) => {
        return <Feed {...feed} />;
      })} */}
    
    </>
  );
}
