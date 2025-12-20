import React from "react";
import Col from "react-bootstrap/Col";

function SkillsBar({ skill, value, isScrolled }) {
  return (
    <Col xs={6} md={3} lg={2} className="text-center mb-4">
      <div className="skill-item">
        <img
          alt={skill}
          src={value}
          className="img-fluid mb-2"
          style={{ height: "80px", width: "auto", objectFit: "contain", mixBlendMode: "multiply" }}
        />
        <p className="lead" style={{ fontSize: "1.1rem" }}>
          {skill}
        </p>
      </div>
    </Col>
  );
}

export default SkillsBar;
