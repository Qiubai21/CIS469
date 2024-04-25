import React, { useState, useEffect } from "react";
import { Container, Form, Card, Row, Col, Button } from 'react-bootstrap';

function WeatherApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState("");
  const API_KEY = "de325a6430ccf11b48ce73488a816cf9";
  const API_Page = "https://api.openweathermap.org";
  const API_URL = `${API_Page}/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}`;
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const newData = [...weatherData];
      if (newData.filter(d => d.id == data.id).length <= 0) {
        newData.push(data);
      }
      setWeatherData(newData);
      setError("");
    } catch (error) {
      setError("Error: fetching weather data." + error);
      console.log("Error: fetching weather data.", error);
    }
  }

  const handleSubmit = () => {
    if (searchTerm) {
      fetchData();
      setSearchTerm("");
    }
  }

  const handleRemoveWeatherData = (id) => {
    setWeatherData(weatherData.filter(d => d.id !== id));
  }

  useEffect(() =>{
    if (searchTerm) {
      fetchData();
    }
  }, [weatherData, error]);

  return (
    <Container style={{ marginTop: '1rem' }}>
      <Card>
        <Card.Body>
          <Form>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter your city"
                  value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value)}}
                />
              </Col>
              <Col>
                <Button onClick={handleSubmit} type="button" variant="dark">Search</Button>
              </Col>
            </Row>
            <Form.Group>
              <div className="text-danger">{error}</div>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div style={{ display: "flex", flexWrap: "wrap", gap: '.3rem' }} className="mt-3">
        {
          weatherData.map((data, index) => (
            <Card key={index} style={{ width: '23rem' }}>
              <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Row>
                  <Col>Temperature:</Col>
                  <Col>{data.main.temp} ℉</Col>
                </Row>
                <Row>
                  <Col>Weather Condition:</Col>
                  <Col>{data.weather[0].description}</Col>
                </Row>
                <Row>
                  <Col>Wind Speed:</Col>
                  <Col>{data.wind.speed}m/s</Col>
                </Row>
                <Row>
                  <Col>Humidity:</Col>
                  <Col>{data.main.humidity} %</Col>
                </Row>
                <Button onClick={() => { handleRemoveWeatherData(data.id) }} size="sm" variant="danger">Remove</Button>
              </Card.Body>
            </Card>
          ))
        }
      </div>
    </Container>
  );
}

export default WeatherApp;