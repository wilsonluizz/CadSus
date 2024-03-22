import React, { useState } from "react";
import MenuLateral from "./components/MenuLateral";
import SignIn from "./components/SignIn";
import Tabela from "./components/Tabela";
import Container from "@mui/material/Container";
import VisualizarRegistro from "./components/VisualizarRegistro";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormCreate from "./components/FormCreate";
import UpdateForm from "./components/FormUpdate";
import { Snackbar } from "@mui/material";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [users, setUsers] = useState([
    {
      id: 1,
      nome: "Cássio Ramos",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 2,
      nome: "Fagner Conserva Lemos",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 3,
      nome: "Felix Torres",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 4,
      nome: "Gustavo Henrique",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 5,
      nome: "Ranielli Teixeira",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 6,
      nome: "Rodrigo Palacios",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 7,
      nome: "Maycon de Andrade ",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 8,
      nome: "Renato Augusto",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 9,
      nome: "Yuri Alberto",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 10,
      nome: "Rodrigo Garro",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 11,
      nome: "Angel Romero",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: 12,
      nome: "Antonio Oliveira",
      cpf: "47593739273",
      nascimento: "01/09/1910",
      cns: 1234567890,
      nomeMae: "Maria",
      cep: "02056070",
      logradouro: "Rua São Quirino",
      numero: "55",
      complemento: "",
      bairro: "Vila Guilherme",
      cidade: "São Paulo",
      estado: "SP",
    },
  ]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleShowSuccessMessage = (message) => {
    setSuccessMessage(message);
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };

  if (isLoggedIn) {
    return (
      <Router>
        <Container maxWidth="xl" className="App">
          <MenuLateral />
          <Routes>
            <Route
              path="/"
              element={
                <Tabela
                  users={users}
                  handleDelete={handleDelete}
                  handleShowSuccessMessage={handleShowSuccessMessage}
                />
              }
            />
            <Route
              path="/user/:userId"
              element={<VisualizarRegistro users={users} />}
            />
            <Route
              path="/novo-registro"
              element={
                <FormCreate
                  users={users}
                  setUsers={setUsers}
                  handleShowSuccessMessage={handleShowSuccessMessage}
                />
              }
            />
            <Route
              path="/atualizar/:userId"
              element={
                <UpdateForm
                  users={users}
                  setUsers={setUsers}
                  handleShowSuccessMessage={handleShowSuccessMessage}
                />
              }
            />
          </Routes>
          <Snackbar
            open={!!successMessage}
            message={successMessage}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          />
        </Container>
      </Router>
    );
  } else {
    return <SignIn />;
  }
}
