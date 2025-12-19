import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Typist from "react-typist-component";
import { Jumbotron } from "./migration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope as emailIcon } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub as githubIcon,
  faLinkedin as linkedinIcon,
  faDiscord as discordIcon,
  faFacebook as facebookIcon,
  faInstagram as instagramIcon,
  faGoogleScholar as googleScholarIcon,
  faTwitter as twitterIcon,
} from "@fortawesome/free-brands-svg-icons";

const iconImages = {
  email: emailIcon,
  github: githubIcon,
  linkedin: linkedinIcon,
  discord: discordIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
  googleScholar: googleScholarIcon,
  twitter: twitterIcon,
};

const MainBody = React.forwardRef(
  ({ gradient, title, message, icons, updates }, ref) => {
    return (
      <Jumbotron
        fluid
        id="home"
        style={{
          background: `linear-gradient(136deg,${gradient})`,
          backgroundSize: "1200% 1200%",
        }}
        className="title bg-transparent bgstyle text-light min-vh-100 d-flex align-content-center align-items-center flex-wrap m-0"
      >
        <div id="stars"></div>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-start">
              <h1 ref={ref} className="display-1">
                {title}
              </h1>
              <Typist>
                <div className="lead typist">{message}</div>
              </Typist>
              <div className="p-5 ps-0 pe-0">
                {icons.map((icon, index) => (
                  <a
                    key={`social-icon-${index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={icon.url}
                    aria-label={`My ${icon.type}`}
                  >
                    <FontAwesomeIcon
                      icon={iconImages[icon.type]}
                      className="socialicons"
                      size="3x"
                    />
                  </a>
                ))}
              </div>
              <a
                className="btn btn-outline-light btn-lg "
                href="#aboutme"
                role="button"
                aria-label="Learn more about me"
              >
                More about me
              </a>
            </Col>
            <Col lg={5} className="mt-5 mt-lg-0 offset-lg-1">
              {updates && (
                <div
                  className="p-4 rounded"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    maxHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    className="h4 mb-4 border-bottom pb-2"
                    style={{ borderColor: "rgba(255,255,255,0.2)", flexShrink: 0 }}
                  >
                    Latest Updates
                  </h3>
                  <div
                    className="updates-list text-start updates-container"
                    style={{ overflowY: "auto" }}
                  >
                    {updates.map((update, index) => (
                      <div key={index} className="mb-3 position-relative">
                        <div
                          className="small text-white font-weight-bold"
                          style={{ opacity: 0.8 }}
                        >
                          {update.date}
                        </div>
                        {update.link ? (
                          <a
                            href={update.link}
                            className="text-reset text-decoration-none stretched-link"
                          >
                            {update.text}
                          </a>
                        ) : (
                          <div>{update.text}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
);

export default MainBody;
