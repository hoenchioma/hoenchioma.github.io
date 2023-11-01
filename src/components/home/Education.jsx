import React from "react";
import Container from "react-bootstrap/Container";
import { Jumbotron } from './migration';
import Row from "react-bootstrap/Row";
import EducationCard from "./EducationCard";

const Education = ({ heading, educationList }) => {
  
  return (
    <Jumbotron fluid id="education" className="bg-light m-0 target-section">
      <Container className=" p-3 mb-5 bg-light rounded">
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <Row>
          {
          educationList.map((education, index) => (
                <EducationCard
                  key={`education-card-${index}`}
                  id={`education-card-${index}`}
                  value={education}
                />
              )) 
          }
        </Row>
      </Container>
    </Jumbotron>

  );
};

export default Education;