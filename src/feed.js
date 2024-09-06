import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Feed({ summary, author, title, id, updated }) {
  let currentDate = new Date().toJSON().slice(0, 10);

  // console.log(currentDate);
  if (updated === currentDate) {
    updated = "Today";
  }
  const [hover, setHover] = useState(false);
  return (
    <Box
    onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="feed"
      sx={{
        display:"flex",
        flexDirection:"column",
        border: "1px solid black",
        padding: 2,
        borderRadius: 4,
        transition: "0.3s",
        zIndex:1,
        "&:hover": {
          zIndex:10,        
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
          transform: "scale(1.05)", 
        },
        
      }}
    >
      <Typography className="name" variant="h7">
        {author.name}
      </Typography>

      <Typography className="title" variant="body-1">
        {title}
      </Typography>
      <Typography className="updated" variant="h7">
        {updated}
      </Typography>
      
      {hover && (
        <Box
          sx={{
            position: "absolute",
            width:"100%",
            top:"50%",
            // left: "100%",
            bgcolor: "lightgrey",
            padding: 1,
            borderRadius: 2,
            mt: 1,
            zIndex: 10,
          }}
        >
          <Typography variant="body2">{summary}</Typography>
        </Box>
      )}
    </Box>
  );
}
