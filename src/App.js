import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  navBar,
  mainBody,
  about,
  education,
  experience,
  repos,
  awards,
  skills,
  getInTouch,
  art,
  research,
} from "./editable-stuff/config.js";
import MainBody from "./components/home/MainBody";
import AboutMe from "./components/home/AboutMe";
import Project from "./components/home/Project";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Skills from "./components/home/Skills";
// import { Blog } from "./components/blog/Blog";
// import BlogPost from "./components/blog/BlogPost";
import GetInTouch from "./components/home/GetInTouch.jsx";
import Awards from "./components/home/Awards.jsx";
import Experience from "./components/home/Experience";
// import Leadership from "./components/home/Leadership";
import Education from "./components/home/Education.jsx";
import ArtShowcase from "./components/home/Art.jsx";
import Research from "./components/home/Research.jsx";

import HashLinkObserver from "react-hash-link";

const Home = React.forwardRef((props, ref) => {
  return (
    <>
      <HashLinkObserver />
      <MainBody
        gradient={mainBody.gradientColors}
        title={`${mainBody.firstName} ${mainBody.middleName} ${mainBody.lastName}`}
        message={mainBody.message}
        icons={mainBody.icons}
        updates={mainBody.updates}
        ref={ref}
      />
      {about.show && (
        <AboutMe
        heading={about.heading}
        message={about.message}
        link={about.imageLink}
        imgSize={about.imageSize}
        resume={about.resume}
        education={about.education}
        />
      )}
      {research.show && (
        <Research
          background="light"
          heading={research.heading}
          myName={research.myName}
          googleScholarUrl={research.googleScholarUrl}
          researchList={research.data}
        />
      )}
      {awards.show && (
        <Awards
          background="white"
          heading={awards.heading}
          message={awards.message}
          img={awards.images}
          imageSize={awards.imageSize}
        />
      )}
      {experience.show && (
        <Experience
          background="light"
          heading={experience.heading}
          experienceList={experience.data}
        />
      )}
      {education.show && (
        <Education
          background="white"
          heading={education.heading}
          educationList={education.data}
        />
      )}
      {skills.show && (
        <Skills
          background="light"
          heading={skills.heading}
          languages={skills.languages}
          librariesFrameworks={skills.librariesFrameworks}
          otherSkills={skills.otherSkills}
        />
      )}
      {repos.show && (
        <Project
          background="white"
          heading={repos.heading}
          username={repos.gitHubUsername}
          length={repos.reposLength}
          specfic={repos.specificRepos}
        />
      )}
      {art.show && (
        <ArtShowcase
          background="light"
          heading={art.heading}
          instagramProfileUrl={art.instagramProfileUrl}
          instagramUrls={art.instagramUrls}
        />
      )}
    </>
  );
});

const App = () => {
  const titleRef = React.useRef();

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL + "/"}>
      {navBar.show && <Navbar ref={titleRef} />}
      <Routes>
        <Route path="/" exact element={<Home ref={titleRef} />} />
      </Routes>
      {/* {false && <Route path="/blog" exact component={Blog} />}
      {false && <Route path="/blog/:id" component={BlogPost} />} */}
      <Footer>
        {getInTouch.show && (
          <GetInTouch
            heading={getInTouch.heading}
            message={getInTouch.message}
            email={getInTouch.email}
          />
        )}
      </Footer>
    </BrowserRouter>
  );
};

export default App;
