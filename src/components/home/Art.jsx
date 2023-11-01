import React from "react";
import Container from "react-bootstrap/Container";
import { Jumbotron } from "./migration";
import Row from "react-bootstrap/Row";
import { InstagramEmbed } from "react-social-media-embed";
import { Link } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const ArtShowcase = ({ heading, instagramProfileUrl, instagramUrls }) => {
  const { height, width } = useWindowDimensions();
  const cardWidth = Math.min(390, width - 10);
  const cardHeight = cardWidth + 10;
  return (
    <Jumbotron fluid id="art" className="bg-white m-0 target-section">
      <Container className="">
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <Row>
          {instagramUrls.map((instagramUrl) => (
            <div
              key={instagramUrl}
              style={{
                paddingBottom: 10,
                paddingRight: 5,
                paddingLeft: 5,
                width: cardWidth,
                overflow: false,
              }}
            >
              <InstagramEmbed
                url={instagramUrl}
                width={cardWidth - 10}
                height={cardHeight}
              />
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
