import React from "react";
import { useState, useEffect } from "react";
import { parseXMLFile } from "./parser";
import Feed from "./feed";
import Shimmer from "./Shimmer";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button, Typography } from "@mui/material";
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
    const result = Object.groupBy(info, ({ updated }) => updated);
    const resultArray = info.map((item) => item.author.name);
    let extractedAuthors = [...new Set(resultArray)];
    setAuthors(extractedAuthors.sort());
    setFeeds(result);
    setFilteredFeeds(result);
  }

  const [selectedOptions, setSelectedOptions] = useState([]);
  const fliterData = (search, info) => {
    if (search.length == 0) {
      return info;
    }
    const x = [];
    console.log("search", search);
    search.map((s) => {
      console.log("s", s);
      x.push(info.filter((inf) => inf.author.name.includes(s)));
    });
    return x;
  };

  useEffect(() => {
    Main();
  }, []);

  useEffect(()=>{
    const f = fliterData(selectedOptions, data);
    let hey = [].concat.apply([], f);

    // setSelectedOptions([]);
    // console.log("f", f);
    setFilteredFeeds(Object.groupBy(hey, ({ updated }) => updated));
  },[selectedOptions])
  let length = Object.entries(feeds).length;
  return length == 0 ? (
    <Shimmer />
  ) : (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Autocomplete
          sx={{
            width: "100%",
            marginRight: "1%",
          }}
          multiple
          options={authors}
          value={selectedOptions}
          onChange={(_event, newValue) => {
            setSelectedOptions(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select Author" variant="outlined" />
          )}
          getOptionLabel={(option) => option}
        />
       
      </Box>
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
