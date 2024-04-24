import React from "react";
import Col from "react-bootstrap/Col";

const ExperienceCard = ({ value }) => {
  const {
    company,
    location,
    role,
    date,
    description,
    logo
  } = value;
  return (
      <>
        <Col md="9">
        < div className="p-3 mb-0">
            <h5>{company} - <span className="text-muted text-secondary">{location}</span>  </h5>

            <div className="card-text">
                {
                  // check if role and date is an array and then map through it
                  Array.isArray(role) ? role.map((role, index) => (
                      <div key={`experience-role-${index}`}>{role} - <span className="text-secondary">{date[index]}</span></div>
                  )) : (
                    <div>{role} - <span className="text-secondary">{date}</span></div>          
                  )
                }
                <div className="my-2"> {
                  description.map((description, index) => (
                      <p className="lead"
                      key={`experience-description-${index}`} style={{fontSize: '18px'}}
                      >{description}</p>
                  )) 
                }</div>
          </div>
          <hr />
        </div>
        </Col>
        <Col md="3">
          <div className="d-flex mb-5 justify-content-center">
            <img
              src={logo}
              alt={`${company} logo`}
              className="img-fluid"
              style={{ maxHeight: "150px" }}
            />
          </div>
        </Col>
      </>
  );
};


export default ExperienceCard;