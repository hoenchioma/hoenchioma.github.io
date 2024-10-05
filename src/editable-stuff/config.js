// NAVIGATION BAR SECTION
const navBar = {
  show: true,
};

// MAIN BODY SECTION
// https://fontawesome.com/v4/icons/
const mainBody = {
  gradientColors: "#1ad7c0, #4484ce, #9b59b6",
  firstName: "Raheeb",
  middleName: "",
  lastName: "Hassan",
  message: "ML Engineer at Therap Services LLC",
  icons: [
    {
      type: "email",
      url: "mailto:contact@raheeb.xyz",
    },
    {
      type: "googleScholar",
      url: "https://scholar.google.com/citations?user=73zHDeoAAAAJ&hl=en",
    },
    {
      type: "github",
      url: "https://github.com/hoenchioma",
    },
    {
      type: "linkedin",
      url: "https://www.linkedin.com/in/raheebhassan",
    },
    {
      type: "instagram",
      url: "https://www.instagram.com/raheebomega",
    },
    {
      type: "twitter",
      url: "https://x.com/raheebomega",
    }
  ],
};

// ABOUT SECTION
// If you want the About Section to show a profile picture you can fill the profilePictureLink either with:
//a) your Instagram username
//      i.e:profilePictureLink:"johnDoe123",
//b) a link to an hosted image
//      i.e:profilePictureLink:"www.picturesonline.com/johnDoeFancyAvatar.jpg",
//c) image in "editable-stuff" directory and use require("") to import here,
//      i.e: profilePictureLink: require("../editable-stuff/hashirshoaeb.png"),
//d) If you do not want any picture to be displayed, just leave it empty :)
//      i.e: profilePictureLink: "",
// For Resume either provide link to your resume or import from "editable-stuff" directory
//     i.e resume: require("../editable-stuff/resume.pdf"),
//         resume: "https://docs.google.com/document/d/13_PWdhThMr6roxb-UFiJj4YAFOj8e_bv3Vx9UHQdyBQ/edit?usp=sharing",
const about = {
  show: true,
  heading: "About Me",
  imageLink: require("../editable-stuff/headshot.jpg"),
  imageSize: 375,
  message:
    "Hello! I'm Raheeb Hassan, a CSE graduate from the University of Dhaka. Currently, I work as an ML Engineer at Therap Services LLC. My research interests lie in Computer Vision, Reinforcement Learning and Multi-agent systems. I enjoy tinkering and problem-solving with a passion. I also like creating digital art in my spare time.",
  resume: require("../editable-stuff/resume.pdf"),
};

// EDUCATION SECTION
const education = {
  show: true,
  heading: "Education",
  data: [
    {
      university: "University of Dhaka",
      department: "Department of Computer Science and Engineering",
      location: "Dhaka, Bangladesh",
      date: "2018 - 2023",
      degree: "BSc. in Computer Science and Engineering",
      result: "CGPA: 3.75/4.00 (2nd highest in my class)",
      logo: require("../assets/img/logo_du.png"),
    },
  ],
};

// EXPERIENCE SECTION
const experience = {
  show: true,
  heading: "Experience",
  data: [
    {
      company: "Therap Services LLC",
      location: "Dhaka, Bangladesh",
      role: ["ML Engineer", "Associate ML Engineer"],
      date: ["Apr 2024 - Present", "Feb 2023 – Mar 2024"],
      logo: require("../assets/img/logo_therap.jpg"),
      description: [
        <ul>
          <li>
            Worked with computer vision, face recognition, multi-object
            tracking, activity recognition
          </li>
          <li>
            Designed a system integrating real-time monitoring data from cameras and sensors to generate long-term statistical models of individual behavior
          </li>
          <li>
            Optimized ML pipelines to work on resource constrained environments using NVIDIA Deepstream
          </li>
          <li>
            Worked on scaling distributed ML video processing systems in the cloud (AWS, Oracle Cloud)
          </li>
        </ul>,
      ],
    },
    {
      company:
        "Cognitive Agents and Interaction Lab (CAIL), University of Dhaka",
      location: "Dhaka, Bangladesh",
      role: "Research Assistant",
      date: "2021 – Present",
      logo: require("../assets/img/logo_du.png"),
      description: [
        <>
          <ul>
            <li>
              Studied and benchmarked several reinforcement learning algorithms
            </li>
            <li>
              Researched safety in reinforcement learning and multi-agent systems
            </li>
            <li>
              Developed a novel decentralized safe multi-agent reinforcement learning algorithm
            </li>
            <li>
              Worked with applying graph neural networks and reinforcement learning for solving combinatorial optimization problems
            </li>
          </ul>
          <br />
        </>,
      ],
    },
    {
      company: "CranTech LLC (Formerly Quixx Projects)",
      location: "Dhaka, Bangladesh",
      role: "Full Stack Developer (Part-Time)",
      date: "2020 – 2021",
      logo: require("../assets/img/logo_crantech.jpg"),
      description: [
        <ul>
          <li>
            Worked on several web development projects like Shoshikkha, Amplfiy, etc.
          </li>
          <li>
            Worked with ReactJS (frontend), ExpressJS (backend) and React Native
            (Mobile)
          </li>
        </ul>,
      ],
    },
  ],
};

// PROJECTS SECTION
// Setting up project lenght will automatically fetch your that number of recently updated projects, or you can set this field 0 to show none.
//      i.e: reposLength: 0,
// If you want to display specfic projects, add the repository names,
//      i.e ["repository-1", "repo-2"]
const repos = {
  show: true,
  heading: "Projects",
  gitHubUsername: "hoenchioma",
  reposLength: 0,
  specificRepos: [
    "hotkey",
    "vlawyer",
    "cp-library",
    "kamlabot",
    "Depths-of-CSEDU",
    "transperfecta",
    "backtrack2class",
  ],
};

// AWARDS SECTION
const awards = {
  show: true,
  heading: "Awards and Achievements",
  message: (
    <div>
      <p style={{ fontSize: 20, marginBottom: 0 }}>
        <b>Awards</b>
      </p>
      <ul style={{ fontSize: 18 }}>
        <li>
          Best Undergraduate Final Project Award 2021 (Held on Jan 2023)
          <br />
          <span style={{ fontSize: 16, color: "gray" }}>
            Department of Computer Science and Engineering, University of Dhaka
          </span>
        </li>
        <li>
          Scholarship Recipient for Academic Excellence in Undergraduate
          Examinations 2021
          <br />
          <span style={{ fontSize: 16, color: "gray" }}>
            University of Dhaka
          </span>
        </li>
      </ul>

      <p style={{ fontSize: 20, marginBottom: 0 }}>
        <b>Hackathons</b>
      </p>
      <ul style={{ fontSize: 18 }}>
        <li>Code Samurai: Inter-University Hackathon 2022 (Champion)</li>
      </ul>

      <p style={{ fontSize: 20, marginBottom: 0 }}>
        <b>Programming Competitions</b>
      </p>
      <ul style={{ fontSize: 18 }}>
        <li>
          International Collegiate Programming Contest Asia Dhaka Regional 2021
          (16th place)
        </li>
        <li>MIST Inter University Programming Contest 2019 (20th place)</li>
        <li>SUB Inter University Programming Contest 2019 (28th place)</li>
      </ul>

      <p style={{ fontSize: 20, marginBottom: 0 }}>
        <b>Cybersecurity Competitions</b>
      </p>
      <ul style={{ fontSize: 18 }}>
        <li>SUST Technovent 2023 Capture the Flag (11th place)</li>
      </ul>
    </div>
  ),
  images: [
    {
      img: require("../assets/img/best_poster_award_du.jpg"),
      label: "Best Undergraduate Final Project Award",
      paragraph: "",
    },
    {
      img: require("../assets/img/logo_code_samurai.jpg"),
      label: "",
      paragraph: "",
    },
    {
      img: require("../assets/img/code_samurai_winners.jpg"),
      label: "Code Samurai: Inter-University Hackathon 2022",
      paragraph: "",
    },
    {
      img: require("../assets/img/logo_icpc.png"),
      label: "",
      paragraph: "",
    },
    {
      img: require("../assets/img/mist_iupc_team.jpg"),
      label: "MIST Inter University Programming Contest 2019",
      paragraph: "",
    },
  ],
  imageSize: {
    width: "400", //orig: 615
    height: "400", //orig: 450
  },
};

// SKILLS SECTION
const skills = {
  show: true,
  heading: "Skills",
  languages: [
    { name: "Python", value: require("../assets/img/logo_python.png") },
    { name: "C/C++", value: require("../assets/img/logo_c.png") },
    { name: "JavaScript", value: require("../assets/img/logo_javascript.png") },
    { name: "HTML/CSS", value: require("../assets/img/logo_html.png") },
    { name: "Java", value: require("../assets/img/logo_java.jpg") },
  ],
  librariesFrameworks: [
    { name: "PyTorch", value: require("../assets/img/logo_pytorch.png") },
    { name: "TensorFlow", value: require("../assets/img/logo_tensorflow.png") },
    { name: "NumPy", value: require("../assets/img/logo_numpy.png") },
    { name: "pandas", value: require("../assets/img/logo_pandas.png") },
    { name: "OpenCV", value: require("../assets/img/logo_opencv.webp") },
    {
      name: "scikit-learn",
      value: require("../assets/img/logo_scikitlearn.png"),
    },
    { name: "Matplotlib", value: require("../assets/img/logo_matplotlib.png") },
    { name: "Optuna", value: require("../assets/img/logo_optuna.png") },
    {
      name: "NVIDIA Deepstream",
      value: require("../assets/img/logo_nvidia.png"),
    },
    { name: "React", value: require("../assets/img/logo_react.png") },
    { name: "Unity", value: require("../assets/img/logo_unity.png") },
  ],
  otherSkills: [
    { name: "Git", value: require("../assets/img/logo_git.png") },
    { name: "Docker", value: require("../assets/img/logo_docker.png") },
    { name: "Linux", value: require("../assets/img/logo_linux.jpg") },
    { name: "AWS Cloud", value: require("../assets/img/logo_aws.png") },
    { name: "Oracle Cloud", value: require("../assets/img/logo_oracle_cloud.png") },
  ],
};

// ART SECTION
const art = {
  show: true,
  heading: "Art",
  instagramProfileUrl: "https://www.instagram.com/raheebomega",
  instagramUrls: [
    "https://www.instagram.com/p/CdKsMcrJXeV/",
    "https://www.instagram.com/p/CkozB5wyMFL/",
    "https://www.instagram.com/p/Clqj-VZSvYg/",
    "https://www.instagram.com/p/Cd1RattPE-1/",
    "https://www.instagram.com/p/CbWQGXiJOwp/",
    "https://www.instagram.com/p/CaHroEypwXc/",
    "https://www.instagram.com/p/CVwyJpJvOpb/",
    "https://www.instagram.com/p/CBz1RDTj9Vj/",
    // 'https://www.instagram.com/p/CBsilHdj36C/',
    "https://www.instagram.com/p/CBp12vAjPyf/",
    // 'https://www.instagram.com/p/Bzn7_RShs6t/',
    // 'https://www.instagram.com/p/Bzkj6_3Bgw1/',
  ],
};

// RESEARCH SECTION
const research = {
  show: true,
  heading: "Research",
  myName: "Raheeb Hassan",
  googleScholarUrl:
    "https://scholar.google.com/citations?user=73zHDeoAAAAJ&hl=en",
  data: [
    {
      title:
        "DePAint: A Decentralized Safe Multi-Agent Reinforcement Learning Algorithm considering Peak and Average Constraints",
      authors:
        "Raheeb Hassan, K.M. Shadman Wadith, Md. Mamun or Rashid, Md. Mosaddek Khan",
      conferenceOrJournal: "Applied Intelligence Journal (APIN)",
      status: "Published",
      link: "https://doi.org/10.1007/s10489-024-05433-x",
      preprintLink: "https://arxiv.org/abs/2310.14348",
      description: [
        <ul>
          <li>
            Proposed a novel decentralized safe multi-agent reinforcement
            learning algorithm
          </li>
          <li>Considered both peak and average constraints</li>
          <li>Theoretically analysed the convergence of the algorithm</li>
          <li>
            Compared with existing centralized MARL algorithms that deal with
            peak and average constraints
          </li>
        </ul>,
      ],
    },
    {
      title:
        "A Graph Neural Network-Based QUBO-Formulated Hamiltonian-Inspired Loss Function for Combinatorial Optimization using Reinforcement Learning",
      authors: "Redwan Ahmed Rizvee, Raheeb Hassan, Md. Mosaddek Khan",
      conferenceOrJournal: "arXiv",
      status: "Preprint",
      preprintLink: "https://arxiv.org/abs/2311.16277",
      description: [
        <ul>
          <li>
            Investigated and suggested alternatives to the early stopping
            strategy of PI-GNN
          </li>
          <li>
            Proposed a modified generic RL framework using QUBO for
            combinatorial optimization
          </li>
          <li>
            Proposed a MCTS based approach using GNNs and QUBO for combinatorial
            optimization
          </li>
          <li>
            Achieved upto 44% improvement over PI-GNN in the Max Cut problem
          </li>
        </ul>,
      ],
    },
  ],
};

// GET IN TOUCH SECTION
const getInTouch = {
  show: true,
  heading: "Get In Touch",
  message: "Always open to opportunities! Please reach out to me at",
  email: "contact@raheeb.xyz",
};

// BLOG SECTION
// const blog = {
//   show: false,
// };

export {
  navBar,
  mainBody,
  about,
  education,
  experience,
  repos,
  awards,
  skills,
  art,
  research,
  getInTouch,
};
