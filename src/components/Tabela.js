import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Tabela(users) {
  return (
    <container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Dt. Nascimento</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{user.id}</TableCell>
                <TableCell align="right">{user.nome}</TableCell>
                <TableCell align="right">{user.cpf}</TableCell>
                <TableCell align="right">{user.nascimento}</TableCell>
                <TableCell align="right">
                  {user.id && (
                    <Link to={`/user/${user.id}`}>
                      <Button variant="contained">Ver</Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </container>
  );
}
