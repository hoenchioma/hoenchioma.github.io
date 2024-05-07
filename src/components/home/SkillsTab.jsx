import React from "react";
import SkillsBar from "./SkillsBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function SkillsSection({ skills, isScrolled }) {
  return (
    <>
      {skills.map((skill, index) => (
        <SkillsBar
          key={`${skill}-${index}`}
          skill={skill.name}
          value={skill.value}
          isScrolled={isScrolled}
        />
      ))}
    </>
  );
}

function SkillsTab({ skills, isScrolled }) {
  return (
    <div class="card-content text-center p-3">
      <Container center>
        <Row xs={12} md={6}>
          <SkillsSection
            skills={skills}
            isScrolled={isScrolled}
          />
        </Row>
      </Container>
      {/* <div class="row text-center">
      <SkillsSection
           skills={skills} />
      </div> */}
      </div>
  );
}

export default SkillsTab;