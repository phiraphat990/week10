/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
 
function App() {
  const [InputImage, setInputImage] = useState(null);
  const [OutputImage, setOutputImage] = useState(null);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Number, setNumber] = useState([]);

  const handleChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = (event) => {
      setInputImage(event.target.result);
    };
  };

  const submit = async () => {
    let numbers = Number.split(" ");
    console.log(window.location.hostname);

    try {
      const res = await axios.post(
        "http://" + window.location.hostname + ":8088/process-image",
        {
          image: InputImage,
          first_name: FirstName,
          last_name: LastName,
          numbers: numbers,
        }
      );
      setOutputImage(res.data.processed_image);
    } catch (err) {
      console.log(err);
      alert("Plese try again.");
    }
  };

  return (
    <Container>
      <Form style={{ margin: 100 }}>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name : </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter FirstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name : </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter LastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label> Number : </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Number"
            onChange={(e) => setNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImages">
          <Form.Label>Upload Images : </Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload Images"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={() => submit()}>
          Submit
        </Button>
      </Form>

      <Row style={{ margin: 100 }}>
        <Col>
          <h3 className="text-center mb-2">Input</h3>
          {InputImage && <img src={InputImage} width="50%" height="50%" />}
        </Col>
        <Col>
          <h3 className="text-center mb-2">Output</h3>
          {OutputImage && <img src={OutputImage} width="50%" height="50%" />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
