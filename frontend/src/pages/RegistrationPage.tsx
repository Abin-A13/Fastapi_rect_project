import { Container } from "react-bootstrap";
import RegistrationForm from "../components/RegistrationForm";


const RegisterPage = () => {
  return (
    <Container className="mt-4 text-center">
      <h2 className="mt-2">Register</h2>
      <RegistrationForm />
    </Container>
  );
};

export default RegisterPage;

