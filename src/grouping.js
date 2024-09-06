import React from "react";
import { useState, useEffect } from "react";
import { parseXMLFile } from "./parser";
import Feed from "./feed";


export default function Grouping() {
  const [feeds, setFeeds] = useState({});
  async function Main() {
    const jsonObj = await parseXMLFile(
      "https://raw.githubusercontent.com/ksubbu199/ksubbu199.github.io/gh-pages/feed.atom"
    );
    console.log(jsonObj);
    // setFeeds(jsonObj.feed.entry);
    const info = jsonObj?.feed.entry;
    const result = Object.groupBy(info, ({ updated }) => updated);
    setFeeds(result);

    console.log(feeds);
  }
  useEffect(() => {
    Main();
  });

  console.log(feeds);

  return (
    <div>
      {Object.values(feeds)?.map((info) => {
        // debugger;

        return (
          <div className="info">
            {info?.map((hey) => {
              //   debugger;
              return (
                <div>
                  <Feed {...hey} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
