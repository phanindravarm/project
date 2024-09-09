import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, Divider, Link } from "@mui/material";
import Autocomplete from "@mui/material";
export default function Feed({ summary, author, title, id, updated }) {
  let currentDate = new Date().toJSON().slice(0, 10);

  summary = (summary || "").slice(0, 500);
  if (summary.length !== 0) {
    summary = summary + "..........";
  }
  if (updated === currentDate) {
    updated = "Today";
  }

  return (
    <>
      <Link href={id} color="inherit" underline="none">
        <Card
          variant="outlined"
          className="feed"
          sx={{
            display: "flex",
            flexDirection: "column",
            // border: "1px solid black",
            padding: 2,
            margin: "10px",
            borderRadius: 4,
            transition: "0.3s",
            zIndex: 1,
          }}
        >
          <Box
            className="info_head"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Typography className="title" variant="h5">
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginY: "5px",
                color: "grey",
              }}
            >
              <Typography className="name" variant="h7">
                {author.name}
              </Typography>
              <Divider orientation="vertical" sx={{ marginX: "10px" }} />
              <Typography className="updated" variant="h7">
                {updated}
              </Typography>
            </Box>
          </Box>
          <Typography>{summary}</Typography>
        </Card>
      </Link>
    </>
  );
}
