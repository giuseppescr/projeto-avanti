# 🚀 Banco de Trocas de Conhecimento

### 📌 Projeto – Avanti Bootcamp | Desenvolvimento Full Stack

---

## 📖 Sobre o Projeto

O **Banco de Trocas de Conhecimento** é uma aplicação backend desenvolvida como parte do **Avanti Bootcamp – Desenvolvimento Full Stack**.

A proposta do sistema é permitir que pessoas cadastrem conhecimentos que desejam compartilhar, facilitando a conexão entre quem quer ensinar e quem quer aprender.

---

## 🎯 Objetivo

Desenvolver uma API RESTful capaz de:

* Cadastrar pessoas
* Cadastrar conhecimentos
* Relacionar conhecimentos a uma pessoa
* Editar e remover registros
* Filtrar ofertas por categoria e nível
* Realizar busca textual

---

## 🛠 Tecnologias Utilizadas

* **Node.js**
* **Express**
* **Prisma ORM**
* **PostgreSQL**
* **Nodemon**

---

## 🗄 Modelagem do Banco de Dados

### 👤 Pessoa

| Campo     | Tipo            |
| --------- | --------------- |
| id        | String          |
| nome      | String          |
| email     | String (único)  |
| telefone  | String          |
| descricao | Text (opcional) |

---

### 📘 Conhecimento

| Campo     | Tipo      |
| --------- | --------- |
| id        | String    |
| titulo    | String    |
| descricao | Text      |
| categoria | String    |
| nivel     | String    |
| pessoaId  | UUID (FK) |

---

### 🔗 Relacionamento

* Uma pessoa pode possuir vários conhecimentos.
* Um conhecimento pertence a uma única pessoa.
* Exclusão em cascata configurada no banco.

---

# ⚙️ Instalação e Execução

## 📌 Pré-requisitos

Antes de começar, você precisa ter instalado:

* Node.js (v18+ recomendado)
* PostgreSQL
* Git

---

## 1️⃣ Clonar o Repositório

```bash
git clone <LINK_DO_REPOSITORIO>
cd projeto-avanti
```

---

## 2️⃣ Instalar Dependências

```bash
npm install
```

---

## 3️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL=postgresql://postgres:SUA_SENHA@localhost:5432/projetoavanti
PORT=3000
NODE_ENV=development
```

### 🔎 Importante:

* Substituir `SUA_SENHA` pela senha do PostgreSQL.
* Criar um banco chamado `projetoavanti` no PostgreSQL.

---

## 4️⃣ Criar o Banco de Dados

No PostgreSQL, criar um banco chamado:

```
projetoavanti
```

---

## 5️⃣ Sincronizar o Banco com Prisma

```bash
npx prisma generate
npx prisma db push
```

---

## 6️⃣ Iniciar o Servidor

```bash
npm start
```

O servidor estará disponível em:

```
http://localhost:3000
```

---

# 📡 Endpoints da API

## 👤 Pessoas

| Método | Rota           | Descrição              |
| ------ | -------------- | ---------------------- |
| GET    | `/pessoas`     | Lista todas as pessoas |
| POST   | `/pessoas`     | Cria uma nova pessoa   |
| PUT    | `/pessoas/:id` | Atualiza uma pessoa    |
| DELETE | `/pessoas/:id` | Remove uma pessoa      |

---

## 📘 Conhecimentos

| Método | Rota                 | Descrição                         |
| ------ | -------------------- | --------------------------------- |
| GET    | `/conhecimentos`     | Lista conhecimentos (com filtros) |
| POST   | `/conhecimentos`     | Cria um novo conhecimento         |
| PUT    | `/conhecimentos/:id` | Atualiza conhecimento             |
| DELETE | `/conhecimentos/:id` | Remove conhecimento               |

---

# ✅ Funcionalidades Implementadas

* ✔ CRUD completo de Pessoas
* ✔ CRUD completo de Conhecimentos
* ✔ Relacionamento entre entidades
* ✔ Filtros por categoria
* ✔ Filtros por nível
* ✔ Combinação de filtros
* ✔ Busca textual
* ✔ Banco relacional com Prisma

---

# 📁 Estrutura do Projeto

```
projeto-avanti/
├── prisma/                 # Configurações do Banco de Dados (Prisma)
│   ├── migrations/         # Histórico de migrações do banco
│   └── schema.prisma       # Definição dos modelos (Pessoa, Conhecimento)
├── src/                    # Código fonte da aplicação
│   ├── controllers/        # Lógica de negócio e manipulação de requisições
│   │   ├── auth.controller.js          # Login e geração de tokens
│   │   ├── pessoa.controller.js        # CRUD de usuários
│   │   └── conhecimento.controller.js  # CRUD e filtros de conhecimentos
│   ├── database/           # Instância e configuração do cliente do banco
│   │   └── PrismaClient.js
│   ├── middlewares/        # Funções que interceptam requisições (Segurança)
│   │   └── authenticate.js # Validação do token JWT
│   ├── routes/             # Definição dos endpoints da API
│   │   ├── index.js        # Agregador central de rotas
│   │   ├── auth.routes.js  # Rotas de autenticação
│   │   ├── pessoa.routes.js # Rotas de usuários
│   │   └── conhecimento.routes.js # Rotas de conhecimentos
│   ├── app.js              # Configuração do Express e middlewares globais
│   └── server.js           # Ponto de entrada (inicialização do servidor)
├── .env                    # Variáveis de ambiente (SECRET_KEY, DATABASE_URL)
├── package.json            # Dependências e scripts do projeto
└── README.md               # Documentação principal
```

---

# 👩‍💻 Avanti Bootcamp

Projeto desenvolvido no **Avanti Bootcamp – Desenvolvimento Full Stack**, com foco na construção de APIs REST, modelagem relacional e integração com banco de dados.

---

# 📅 Status do Projeto

* Backend ✅ Concluído
* Frontend 🚧 Em desenvolvimento
