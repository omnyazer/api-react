import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
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

  const handleAddProduct = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Nouveau produit",
          price: 29.99,
          description: "Un super produit ajouté via API",
          image: "https://via.placeholder.com/150",
          category: "electronics",
        }),
      });

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été créé`);
    } catch (error) {
      console.error("Erreur lors de la création du produit :", error);
    }
  };

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <Button variant="success" onClick={handleAddProduct}>
          Ajouter un produit
        </Button>
      </div>

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
