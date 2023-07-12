import React from "react";
import { Link } from "react-router-dom";
import HomePageComponent from "../components/HomePageComponent";

function HomePage() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home page</Link>
            </li>
          </ul>
        </nav>
      </header>
      <HomePageComponent />
    </>
  );
}

export default HomePage;
