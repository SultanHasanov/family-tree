import React from "react";
import '../App.css'
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>ХАКМАДОЙ</h1>
      <img
        src="https://bogatyr.club/uploads/posts/2024-03/thumbs/1709913607_bogatyr-club-b6gn-p-chechenskii-ornament-3.png"
        width="800px"
        alt=""
      />
      <div className="container">
      <Row justify="center" className="circle-row">
            <Col>
              <Link to="/circle1">
                <div className="circle">1</div>
              </Link>
            </Col>
            <Col>
              <Link to="/circle2">
                <div className="circle">2</div>
              </Link>
            </Col>
            <Col>
              <Link to="/circle3">
                <div className="circle">3</div>
              </Link>
            </Col>
            <Col>
              <Link to="/circle4">
                <div className="circle">4</div>
              </Link>
            </Col>
            <Col>
              <Link to="/circle5">
                <div className="circle">5</div>
              </Link>
            </Col>
          </Row>
      </div>
    </div>
  );
};

export default Home;
