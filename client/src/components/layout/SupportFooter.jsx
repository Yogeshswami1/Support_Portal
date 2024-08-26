import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function Copyright() {
  return (
    <Typography
      sx={{ color: "white" }}
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {"© "}
      {new Date().getFullYear()}
      {" Copyright: "}
      <Link color="inherit" href="https://saumiccraft.com/">
        Saumic craft
      </Link>
    </Typography>
  );
}

export default function SupportFooter() {
  const iconStyle = {};
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 3,
        pb: 2,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <IconButton href="https://www.facebook.com" color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://www.twitter.com" color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton href="https://www.google.com" color="inherit">
            <GoogleIcon />
          </IconButton>
          <IconButton href="https://www.instagram.com" color="inherit">
            <InstagramIcon />
          </IconButton>
          <IconButton href="https://www.linkedin.com" color="inherit">
            <LinkedInIcon />
          </IconButton>
          <IconButton href="https://www.github.com" color="inherit">
            <GitHubIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: "100%",
            bgcolor: "#d3d3d3",
            pt: 2,
            pb: 2,
            backgroundColor: "#5A51C1",
          }}
        >
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}
