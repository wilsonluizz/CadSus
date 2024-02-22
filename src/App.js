import "./App.css";
import MenuLateral from "./components/MenuLateral";
import SignIn from "./components/SignIn";
import Tabela from "./components/Tabela";
import Container from "@mui/material/Container";
import VisualizarRegistro from "./components/VisualizarRegistro";
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {useState} from 'react'

export default function App () {
    const [users, setUsers] = useState([
      {
        id: 1,
        nome: "Yuri Alberto",
        cpf: 47593739273,
        nascimento: "01/09/1910",
        cns: 1234567890,
        nomeMae: "Maria",
        endereco: "Rua 1",
      },
      {
        id: 2,
        nome: "Renato Augusto",
        cpf: 48596740373,
        nascimento: "01/09/1910",
        cns: 1234567890,
        nomeMae: "Maria",
        endereco: "Rua 1",
      },
      {
        id: 3,
        nome: "Roger Guedes",
        cpf: 7463956873,
        nascimento: "01/09/1910",
        cns: 1234567890,
        nomeMae: "Maria",
        endereco: "Rua 1",
      },
      {
        id: 4,
        nome: "Matias Rojas",
        cpf: 48596783743,
        nascimento: "01/09/1910",
        cns: 1234567890,
        nomeMae: "Maria",
        endereco: "Rua 1",
      },
      {
        id: 5,
        nome: "Cássio Ramos",
        cpf: 48596749876,
        nascimento: "01/09/1910",
        cns: 1234567890,
        nomeMae: "Maria",
        endereco: "Rua 1",
      },
    ])

    return (
      <Router>
        <Container maxWidth="xl" className="App">
          <MenuLateral />
          <Routes>
            <Route 
              path="/" 
              element={<Tabela users={users}/>}
                />
            <Route
              path="/user/:userId"
              element={<VisualizarRegistro users={users} />}
            />
          </Routes>
        </Container>
      </Router>
    );
}
