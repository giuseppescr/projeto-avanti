import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Banco de Trocas de Conhecimento 🧠</h1>

      <p style={styles.subtitle}>
        Aprenda novas habilidades ou compartilhe o que sabe com a comunidade.
        Uma plataforma acessível e organizada para conectar quem quer ensinar
        com quem quer aprender.
      </p>

      <div style={styles.card}>
        <h3>Pronto para começar?</h3>
        <p>Junte-se à nossa comunidade hoje mesmo.</p>

        <Link to="/login">
          <button style={styles.button}>Acessar a Plataforma</button>
        </Link>
        <Link to="/cadastro">
          <button
            style={{
              ...styles.button,
              backgroundColor: "#28a745",
              marginLeft: "10px",
            }}
          >
            Criar Conta
          </button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "60px 20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#666",
    maxWidth: "600px",
    margin: "0 auto 40px",
    lineHeight: "1.6",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    display: "inline-block",
  },
  button: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};
