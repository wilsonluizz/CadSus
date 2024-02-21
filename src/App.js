import "./App.css";
import MenuLateral from "./components/MenuLateral";
import SignIn from "./components/SignIn";
import Tabela from "./components/Tabela";
import Container from "@mui/material/Container";
import VisualizarRegistro from "./components/VisualizarRegistro";
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
  state = {
    users: [
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
    ],
  };

  render() {
    return (
      <Router>
        <Container maxWidth="xl" className="App">
          <MenuLateral />
          <Routes>
          <Route
            path="/user/:userId"
            render={(props) => {
              const user = this.state.users.find(
                (user) => user.id === props.match.params.userId
              ); console.log(user);
              return <VisualizarRegistro user={user} />;
            }}
          /> 
          </Routes>
          <Tabela users={this.state.users} />
        </Container>
      </Router>
    );
  }
}

export default App;
