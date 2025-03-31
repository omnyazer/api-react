import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./App.css"; 

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
          <Col key={product.id} md={3} className="mb-4">
            <Card className="full-height">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                className="product-img"
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <strong>Prix :</strong> {product.price} €
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
