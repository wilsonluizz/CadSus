import   {React, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";

export default function VisualizarRegistro({users}) {
  
  const { userId } = useParams();
  const [user, setUser] = useState([])

  useEffect(() => {
    const idToFind = parseInt(userId, 10);

    const foundUser = users.find((u) => u.id === idToFind);
    
    setUser(foundUser);
  }, [])


  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">CNS</TableCell>
              <TableCell align="right">Dt, Nascimento</TableCell>
              <TableCell align="right">Nome da Mãe</TableCell>
              <TableCell align="right">Endereço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="user">
                  {user.id}
                </TableCell>
                <TableCell align="right">{user.nome}</TableCell>
                <TableCell align="right">{user.fat}</TableCell>
                <TableCell align="right">{user.cpf}</TableCell>
                <TableCell align="right">{user.cns}</TableCell>
                <TableCell align="right">{user.nascimento}</TableCell>
                <TableCell align="right">{user.nomeMae}</TableCell>
                <TableCell align="right">{user.endereco}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
