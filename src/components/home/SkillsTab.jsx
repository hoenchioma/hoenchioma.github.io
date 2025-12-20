import React from "react";
import SkillsBar from "./SkillsBar";
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
    <div className="card-content p-3">
      <Row className="justify-content-center">
        <SkillsSection skills={skills} isScrolled={isScrolled} />
      </Row>
    </div>
  );
}

export default SkillsTab;