import React from "react";
import { useState, useEffect } from "react";
import { parseXMLFile } from "./parser";
import Feed from "./feed";
import Shimmer from "./Shimmer";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export default function Grouping() {
  const [feeds, setFeeds] = useState({});
  const [data, setData] = useState([]);
  const [authors, setAuthors] = useState({});
  const [filteredFeeds, setFilteredFeeds] = useState({});
  async function Main() {
    const jsonObj = await parseXMLFile(
      "https://raw.githubusercontent.com/ksubbu199/ksubbu199.github.io/gh-pages/feed.atom"
    );

    const info = jsonObj?.feed.entry;
    setData(info);
    // console.log("info", info);
    const result = Object.groupBy(info, ({ updated }) => updated);
    const resultArray = info.map((item) => item.author.name);
    let extractedAuthors = [...new Set(resultArray)];
    setAuthors(extractedAuthors.sort());
    setFeeds(result);
    setFilteredFeeds(result);
  }
  let x;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const fliterData = (search, info) => {
    console.log("search", search);
    // search.map((sea) => {
    //    info.filter((inf) => inf.author.name.includes(sea));
    // });
    // x = info;
    // console.log("x", x);
    return info.filter((inf) => inf.author.name.includes(search));
  };
  useEffect(() => {
    Main();
  }, []);
  let length = Object.entries(feeds).length;
  // console.log("result", data);
  return length == 0 ? (
    <Shimmer />
  ) : (
    <div>
      <Autocomplete
        multiple
        options={authors}
        value={selectedOptions}
        onChange={(event, newValue) => {
          setSelectedOptions(newValue);
          console.log("hey");
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select Options" variant="outlined" />
        )}
        getOptionLabel={(option) => option}
      />
      <Button
        onClick={() => {
          const f = fliterData(selectedOptions, data);
          setSelectedOptions([]);
          console.log("f", f);
          setFilteredFeeds(Object.groupBy(f, ({ updated }) => updated));
        }}
        variant="outlined"
        endIcon={<SearchIcon />}
      >
        Search
      </Button>
      {Object.values(filteredFeeds)?.map((info) => {
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
