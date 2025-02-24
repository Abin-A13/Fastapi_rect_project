import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useUserContext } from "../UserContext";

const ResultPage: React.FC = () => {
  const { users } = useUserContext();
  const [inputStr, setInputStr] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStr(e.target.value);
  };

  // Function to reverse the string except special characters.
  const reverseStringExceptSpecials = (str: string): string => {
    const isAlphaNumeric = (char: string): boolean => /^[a-zA-Z0-9]$/.test(char);
    const arr = str.split("");
    let left = 0,
      right = arr.length - 1;
    while (left < right) {
      if (!isAlphaNumeric(arr[left])) {
        left++;
      } else if (!isAlphaNumeric(arr[right])) {
        right--;
      } else {
        // Swap alphanumeric characters.
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
    }
    return arr.join("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(reverseStringExceptSpecials(inputStr));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Registered Users</Card.Title>
              {users.length > 0 ? (
                <Card.Text>Last Registered: {users[users.length - 1].first_name}</Card.Text>
              ) : (
                <Card.Text>No users registered yet.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">
                Reverse String (Preserving Special Characters)
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="inputString">
                  <Form.Label>Input String</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter string"
                    value={inputStr}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Reverse
                </Button>
              </Form>
              {result && (
                <Card.Text className="mt-3">
                  <strong>Result:</strong> {result}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResultPage;
