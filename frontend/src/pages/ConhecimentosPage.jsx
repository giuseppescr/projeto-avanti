import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConhecimentosPage() {
  const [conhecimentos, setConhecimentos] = useState([]);
  const [erro, setErro] = useState("");

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("Iniciante");

  const navigate = useNavigate();

  useEffect(() => {
    carregarConhecimentos();
  }, []);

  const carregarConhecimentos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const resposta = await axios.get("http://localhost:3000/conhecimentos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConhecimentos(resposta.data);
    } catch (error) {
      console.error(error);
      setErro("Erro ao carregar a lista.");
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleCriarConhecimento = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/conhecimentos",
        { titulo, descricao, categoria, nivel },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setTitulo("");
      setDescricao("");
      setCategoria("");
      setNivel("Iniciante");
      carregarConhecimentos();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar o conhecimento.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Ofertas de Conhecimento 🧠</h2>
        <button onClick={handleLogout} style={styles.btnSair}>
          Sair
        </button>
      </header>

      {/* NOVO: Formulário para cadastrar uma oferta */}
      <div style={styles.formContainer}>
        <h3>Compartilhe um conhecimento</h3>
        <form onSubmit={handleCriarConhecimento} style={styles.form}>
          <input
            type="text"
            placeholder="Título (ex: Aulas de React)"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Categoria (ex: Programação, Idiomas)"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={styles.input}
            required
          />
          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            style={styles.input}
            required
          >
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <textarea
            placeholder="Descrição rápida sobre o que você quer ensinar..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{ ...styles.input, minHeight: "60px" }}
            required
          />
          <button type="submit" style={styles.btnCriar}>
            Publicar Oferta
          </button>
        </form>
      </div>

      {erro && <p style={styles.erro}>{erro}</p>}

      <div style={styles.lista}>
        {conhecimentos.length === 0 && !erro ? (
          <p style={{ textAlign: "center", marginTop: "50px", width: "100%" }}>
            Nenhum conhecimento cadastrado ainda. Seja o primeiro a criar um!
          </p>
        ) : (
          conhecimentos.map((item) => (
            <div key={item.id} style={styles.card}>
              <h3 style={styles.titulo}>{item.titulo}</h3>
              <p style={styles.badges}>
                <strong>Categoria:</strong> {item.categoria} |{" "}
                <strong>Nível:</strong> {item.nivel}
              </p>
              <p style={styles.descricao}>{item.descricao}</p>
              <p style={styles.autor}>
                Ofertado por:{" "}
                <strong>{item.pessoa?.nome || "Você / Outro Usuário"}</strong>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  btnSair: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  form: { display: "flex", gap: "10px", flexWrap: "wrap" },
  input: {
    flex: "1 1 200px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  btnCriar: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  erro: { color: "red", textAlign: "center" },
  lista: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    borderLeft: "5px solid #007BFF",
  },
  titulo: { margin: "0 0 10px 0", color: "#333" },
  badges: { fontSize: "14px", color: "#666", marginBottom: "10px" },
  descricao: {
    fontSize: "15px",
    color: "#444",
    lineHeight: "1.5",
    marginBottom: "15px",
  },
  autor: {
    fontSize: "13px",
    color: "#888",
    borderTop: "1px solid #eee",
    paddingTop: "10px",
  },
};
