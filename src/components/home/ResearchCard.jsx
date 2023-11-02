import React from "react";
import Col from "react-bootstrap/Col";

const ResearchCard = ({ myName, value }) => {
  const {
    title,
    authors: _authors,
    conferenceOrJournal,
    status,
    description,
    link,
    preprintLink,
  } = value;

  const authors =
    _authors instanceof Array
      ? _authors
      : _authors.split(",").map((author) => author.trim());

  return (
    <>
      <Col md="12">
        <div className="p-3 mb-0">
          <p className="lead" style={{ fontSize: 20, marginBottom: 0 }}>
            <b>{title}</b>
          </p>
          <div className="card-text">
            <div className="lead" style={{ fontSize: 18 }}>
              Authors:{" "}
              {authors.map((author, index) => (
                <>
                  {author === myName ? <b>{author}</b> : author}
                  {index < authors.length - 1 ? ", " : ""}
                </>
              ))}
            </div>
            <div className="lead" style={{ fontSize: 18 }}>
              Journal/Conference: {conferenceOrJournal}{" "}
              <span className="text-muted text-secondary">
                {"("}
                {status}
                {")"}
              </span>
            </div>
            {link ? (
              <div className="lead" style={{ fontSize: 17 }}>
                <a href={link} style={{ textDecoration: 'none'}}>Link to Paper</a>
              </div>
            ) : (
              preprintLink && (
                <div className="lead" style={{ fontSize: 17 }}>
                  <a href={preprintLink} style={{ textDecoration: 'none'}}>Link to Preprint</a>
                </div>
              )
            )}
            <div className="my-2">
              {" "}
              {description.map((description, index) => (
                <p
                  className="lead"
                  key={`research-description-${index}`}
                  style={{ fontSize: 18 }}
                >
                  {description}
                </p>
              ))}
            </div>
          </div>
          <hr />
        </div>
      </Col>
    </>
  );
};

export default ResearchCard;
