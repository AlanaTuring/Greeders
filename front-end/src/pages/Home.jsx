import React from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/background-video.mp4";

const categories = [
  {
    name: "Clubs",
    color: "#FFFFFF",
    link: "/clubs",
    logo: "/pics/clubslogo.png",
    description:
      "Explore a variety of clubs, from academic groups to fun activities and more! Get involved and make new friends!",
  },
  {
    name: "Societies",
    color: "#FFFFFF",
    link: "/societies",
    logo: "/pics/societieslogo.png",
    description:
      "Join a society and expand your knowledge. Attend events and discover new passions with like-minded individuals!",
  },
  {
    name: "Faculties",
    color: "#FFFFFF",
    link: "/faculties",
    logo: "/pics/facultieslogo.png",
    description:
      "Learn about the various faculties at your university. Find out how to get involved and meet fellow students in your field!",
  },
];

const Home = () => {
  return (
    <div className="w-100">
      {/* Hero Section */}
      <div className="position-relative w-100 vh-100 overflow-hidden">
        <video autoPlay loop muted className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover z-n1">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center px-3" style={{ backgroundColor: "rgba(105,105,105, 0.6)" }}>
          <h1 className="display-2 text-white fw-bold" style={{ fontFamily: "verdana, fantasy" }}>Eventure</h1>
          <p className="text-white fs-4" style={{ maxWidth: "800px", lineHeight: "1.8", fontFamily: "'Poppins', sans-serif" }}>
            The ultimate hub for all your university events! No more sifting through endless emails or posters. Stay updated, get involved, and make the most of your experience—all in one place!
          </p>
        </div>
      </div>

      {/* Floating Categories (OVERLAPPING Section) */}
      <div className="container position-relative" style={{ marginTop: "-150px", zIndex: 10 }}>
        <div className="row justify-content-center g-5">
          {categories.map((category, idx) => {
            const offsetY = idx === 1 ? "-30px" : "30px"; // Middle card floats slightly higher
            return (
              <div key={idx} className="col-md-4 d-flex justify-content-center">
                <Link to={category.link} className="text-decoration-none">
                  <div
                    className="card shadow-lg text-center p-4"
                    style={{
                      width: "100%",
                      maxWidth: "360px",
                      backgroundColor: category.color,
                      borderRadius: "1rem",
                      transform: `translateY(${offsetY})`,
                    }}
                  >
                    <img src={category.logo} alt={`${category.name} logo`} className="mx-auto mb-3" style={{ width: "60px", height: "auto" }} />
                    <h2 className="text-dark fw-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px" }}>{category.name}</h2>
                    <p className="text-secondary" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px" }}>{category.description}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Gray Section */}
      <div className="bg-light mt-5 py-5 px-3">
        <div className="container text-center">
          <h4 className="mb-3">More Coming Soon!</h4>
          <p className="text-muted">Stay tuned for upcoming features and sections to enhance your campus experience.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
