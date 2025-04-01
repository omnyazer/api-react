import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);     
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
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

  const handleUpdateProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Produit modifié",
          price: 49.99,
          description: "Description modifiée",
          image: "https://via.placeholder.com/150",
          category: "electronics",
        }),
      });

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été modifié`);
    } catch (error) {
      console.error("Erreur lors de la modification du produit :", error);
    }
  };

  const handleUpdatePrice = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: 5,
        }),
      });

      const data = await response.json();
      alert(`Le prix du produit avec l'id ${data.id} a été modifié`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du prix :", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été supprimé`);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
    }
  };

  if (loading) return <p className="text-center mt-4">Chargement...</p>;
  if (error) return <p className="text-center mt-4 text-danger">Erreur : {error}</p>;

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

                <Button
                  variant="warning"
                  className="mb-2"
                  onClick={() => handleUpdateProduct(product.id)}
                >
                  Modifier le produit complet
                </Button>

                <Button
                  variant="info"
                  className="mb-2"
                  onClick={() => handleUpdatePrice(product.id)}
                >
                  Modifier le prix du produit
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Supprimer le produit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
