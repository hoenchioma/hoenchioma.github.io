import React from "react";
import Col from "react-bootstrap/Col";

const Company = ({ company, location }) => (
  <h5>
    {company} - <span className="text-muted text-secondary">{location}</span>
  </h5>
);

const SecondaryCompany = ({ company, location }) => (
  <h6 style={{
    marginTop: "-0.25rem",
  }}>
    ({company} - <span className="text-muted text-secondary">{location}</span>)
  </h6>
);

const Role = ({ role, time }) => (
  <div>
    {role} - <span className="text-secondary">{time}</span>
  </div>
);

const ExperienceCard = ({ value }) => {
  const {
    company,
    location,
    secondaryCompany,
    secondaryLocation,
    role,
    date,
    description,
    logo,
  } = value;
  return (
    <>
      <Col md="9">
        <div className="p-3 mb-0">
          <Company company={company} location={location} />
          {secondaryCompany && secondaryLocation && (
            <SecondaryCompany
              company={secondaryCompany}
              location={secondaryLocation}
            />
          )}

          <div className="card-text">
            {
              // check if role and date is an array and then map through it
              Array.isArray(role) ? (
                role.map((roleAtIndex, index) => (
                  <Role
                    key={`experience-role-${index}`}
                    role={roleAtIndex}
                    time={date[index]}
                  />
                ))
              ) : (
                <Role role={role} time={date} />
              )
            }
            <div className="my-2">
              {" "}
              {description.map((description, index) => (
                <p
                  className="lead"
                  key={`experience-description-${index}`}
                  style={{ fontSize: "18px" }}
                >
                  {description}
                </p>
              ))}
            </div>
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
