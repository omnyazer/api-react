import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data); 
    }
    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card style={{ height: "100%" }}>
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: "250px", objectFit: "contain" }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <strong>Prix :</strong> {product.price} €
                </Card.Text>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
