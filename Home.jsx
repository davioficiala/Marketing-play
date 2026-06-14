import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [sales, setSales] = useState(0); // dinheiro entrando pra você

  const products = [
    { id: 1, name: "Cimento", price: 35 },
    { id: 2, name: "Tijolo", price: 1.2 },
    { id: 3, name: "Areia", price: 80 },
    { id: 4, name: "Ferro", price: 120 },
  ];

  function addToCart(product) {
    setCart([...cart, product]);
    setOpenCart(true); // já abre carrinho ao clicar
  }

  function totalCart() {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }

  function finishPurchase() {
    const total = totalCart();

    // simula venda entrando pra você
    setSales(sales + total);

    alert("Venda concluída! R$ " + total);

    console.log("VENDA REGISTRADA:", cart);

    setCart([]);
    setOpenCart(false);
  }

  return (
    <div>

      {/* TOP BAR */}
      <div style={styles.topbar}>
        <h3>🛒 Market App</h3>

        <div>
          💰 Saldo: R$ {sales.toFixed(2)}

          <span
            style={{ marginLeft: 20, cursor: "pointer" }}
            onClick={() => setOpenCart(true)}
          >
            🛒 ({cart.length})
          </span>
        </div>
      </div>

      {/* PRODUTOS (TELA PRINCIPAL) */}
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
            <h3>🛒 Carrinho</h3>

            {cart.length === 0 ? (
              <p>Carrinho vazio</p>
            ) : (
              <>
                {cart.map((item, i) => (
                  <p key={i}>
                    {item.name} - R$ {item.price}
                  </p>
                ))}

                <hr />

                <h4>Total: R$ {totalCart().toFixed(2)}</h4>

                <button onClick={finishPurchase}>
                  Concluir Compra
                </button>
              </>
            )}
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
