import React from "react";
import { useState, useEffect } from "react";
import { parseXMLFile } from "./parser";
import Feed from "./feed";

import Shimmer from "./Shimmer";

import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
export default function Grouping() {
  const [feeds, setFeeds] = useState({});

  async function Main() {
    const jsonObj = await parseXMLFile(
      "https://raw.githubusercontent.com/ksubbu199/ksubbu199.github.io/gh-pages/feed.atom"
    );
    // console.log(jsonObj);
    // setFeeds(jsonObj.feed.entry);

    const info = jsonObj?.feed.entry;
    const result = Object.groupBy(info, ({ updated }) => updated);
    setFeeds(result);
  }
  useEffect(() => {
    Main();
  }, []);
  let length = Object.entries(feeds).length;

  return length == 0 ? (
    <Shimmer />
  ) : (
    <div>
      {Object.values(feeds)?.map((info) => {
        return (
          <>
            <div className="info_box" style={{ width: "90%", margin: "auto" }}>
              <div className="info">
                <Typography
                  sx={{ color: "grey", marginTop: "50px", fontSize: "1.2rem" }}
                >
                  {info[0].updated}
                </Typography>
                {info?.map((hey) => {
                  return (
                    <div>
                      <Feed {...hey} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
