import React from "react";
import Container from "react-bootstrap/Container";
import { Jumbotron } from "./migration";
import Row from "react-bootstrap/Row";
import { InstagramEmbed } from "react-social-media-embed";
import { Link } from "@mui/material";

const ArtShowcase = ({ heading, instagramProfileUrl, instagramUrls }) => {
  return (
    <Jumbotron fluid id="art" className="bg-white m-0 target-section">
      <Container className="">
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <Row>
          {instagramUrls.map((instagramUrl) => (
            <div
              style={{
                paddingBottom: 10,
                marginRight: 10,
                marginLeft: 10,
                width: 400,
                overflow: false,
              }}
            >
              <InstagramEmbed url={instagramUrl} width={400} height={400} s />
            </div>
          ))}
        </Row>
        <Link
          href={instagramProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "black",
            textDecoration: "none",
            textAlign: "center",
            display: "block",
            paddingTop: 20,
          }}
        >
          <h5>See more on Instagram</h5>
        </Link>
      </Container>
    </Jumbotron>
  );
};

export default ArtShowcase;
