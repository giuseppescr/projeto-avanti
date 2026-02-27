import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      await axios.post("http://localhost:3000/pessoas", {
        nome,
        email,
        telefone,
        descricao,
        senha,
      });

      alert("Cadastro realizado com sucesso! Agora você pode fazer login. 🎉");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErro(error.response?.data?.error || "Erro ao realizar cadastro.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Criar uma Conta</h2>

        <form onSubmit={handleCadastro} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Descrição (Opcional)</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              style={{ ...styles.input, minHeight: "80px" }}
              placeholder="Conte um pouco sobre você e o que gosta de aprender/ensinar..."
            />
          </div>

          {erro && <p style={styles.error}>{erro}</p>}

          <button type="submit" style={styles.button}>
            Cadastrar
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Já tem uma conta? <Link to="/login">Faça Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  title: { textAlign: "center", marginBottom: "20px", color: "#333" },
  form: { display: "flex", flexDirection: "column" },
  inputGroup: { marginBottom: "15px" },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
};
