import React from "react";
import Col from "react-bootstrap/Col";

const EducationCard = ({ value }) => {
  const {
    university,
    degree,
    department,
    result,
    logo
  } = value;
  
  return (
      <>
        <Col md="9">
        < div className="p-3 mb-0">
            <h5>{university}</h5>
            <span className="text-muted text-secondary">{department}</span> 

            <div className="card-text" style={{marginTop: 15}}>
                <div className="lead" style={{fontSize: 17}}>
                  {degree}
                </div>
                <div className="lead" style={{fontSize: 17}}>
                  {result}
                </div>
          </div>
          <br />
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