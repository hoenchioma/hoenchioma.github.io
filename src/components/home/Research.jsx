import React from "react";
import Container from "react-bootstrap/Container";
import { Jumbotron } from './migration';
import Row from "react-bootstrap/Row";
import ResearchCard from "./ResearchCard";

const Research = ({ heading, myName, googleScholarUrl, researchList, background }) => {
  
  return (
    <Jumbotron fluid id="research" className={`bg-${background} m-0 target-section`}>
      <Container className={` p-3 mb-5 bg-${background} rounded`}>
        <h2 className="display-4 pb-4 text-center">{heading}</h2>
        {
          googleScholarUrl && (
            <div className="lead p-3" style={{ fontSize: 18 }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={googleScholarUrl}
                aria-label={`My Google Scholar`}
                style={{ textDecoration: 'none'}}
              >
                Google Scholar Profile
              </a>
            </div>
          )
        }
        <Row>
          {
          researchList.map((research, index) => (
                <ResearchCard
                  key={`research-card-${index}`}
                  id={`research-card-${index}`}
                  value={research}
                  myName={myName}
                />
              )) 
          }
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Research;