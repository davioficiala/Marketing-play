import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  const products = [
    { id: 1, name: "Cimento", price: 35 },
    { id: 2, name: "Tijolo", price: 1.2 },
    { id: 3, name: "Areia", price: 80 },
    { id: 4, name: "Ferro", price: 120 },
  ];

  function addToCart(item) {
    setCart([...cart, item]);
  }

  function finishOrder() {
    alert("Pedido enviado para você!");
    console.log("VENDA:", cart);
    setCart([]);
    setOpenCart(false);
  }

  return (
    <div>

      {/* TOP BAR */}
      <div style={styles.topbar}>
        <h3>🛒 Market App</h3>

        <div>
          🔎

          <span
            style={{ marginLeft: 20, cursor: "pointer" }}
            onClick={() => setOpenCart(true)}
          >
            🛒 ({cart.length})
          </span>
        </div>
      </div>

      {/* PRODUTOS */}
      <div style={styles.container}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <h4>{p.name}</h4>
            <p>R$ {p.price}</p>

            <button onClick={() => addToCart(p)}>
              Comprar
            </button>
          </div>
        ))}
      </div>

      {/* CARRINHO (DIREITA) */}
      {openCart && (
        <div style={styles.overlay} onClick={() => setOpenCart(false)}>

          <div style={styles.cart} onClick={(e) => e.stopPropagation()}>
            <h3>Seu Carrinho</h3>

            {cart.length === 0 ? (
              <p>Vazio</p>
            ) : (
              cart.map((item, i) => (
                <p key={i}>
                  {item.name} - R$ {item.price}
                </p>
              ))
            )}

            <button onClick={finishOrder}>
              Finalizar Compra
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

const styles = {
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    background: "#fff",
    borderBottom: "1px solid #ddd",
  },

  container: {
    padding: 15,
  },

  card: {
    background: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
  },

  cart: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "80%",
    height: "100%",
    background: "#fff",
    padding: 20,
  },
};
