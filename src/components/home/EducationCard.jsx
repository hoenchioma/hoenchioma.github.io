import React from "react";
import Col from "react-bootstrap/Col";

const EducationCard = ({ value }) => {
  const {
    university,
    degree,
    date,
    location,
    department,
    result,
    logo
  } = value;
  
  return (
      <>
        <Col md="9">
        < div className="p-3 mb-0">
            <h5 className="mb-0">{university} - <span className="text-muted text-secondary">{location}</span></h5>
            <div>{department}</div>
            <div><span className="text-secondary">{date}</span></div> 

            <div className="card-text" style={{marginTop: 15}}>
                <div className="lead" style={{fontSize: 17}}>
                  {degree}
                </div>
                <div className="lead" style={{fontSize: 17}}>
                  {result}
                </div>
          </div>
          <hr />
        </div>
        </Col>
        <Col md="3">
          <div className="d-flex mb-5 justify-content-center">
            <img
              src={logo}
              alt={`${university} logo`}
              className="img-fluid"
              style={{ maxHeight: "150px" }}
            />
          </div>
        </Col>
      </>
  );
};

export default EducationCard;