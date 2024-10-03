import React from "react";
import Container from "react-bootstrap/Container";
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
  ({ gradient, title, message, icons }, ref) => {
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
        <Container className="text-center">
          <h1 ref={ref} className="display-1">
            {title}
          </h1>
          <Typist>
            <div className="lead typist">{message}</div>
          </Typist>
          <div className="p-5">
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
        </Container>
      </Jumbotron>
    );
  }
);

export default MainBody;
