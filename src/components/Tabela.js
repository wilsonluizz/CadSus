import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
  Typography,
  TablePagination,
  Modal,
  Box,
  TextField
} from "@mui/material";
import { Link } from "react-router-dom";

// Função para remover acentos e tornar a string minúscula
const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export default function Tabela({ users, handleDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openModal, setOpenModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (userId) => {
    setOpenModal(true);
    setUserIdToDelete(userId);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUserIdToDelete(null);
  };

  const handleConfirmDelete = () => {
    handleDelete(userIdToDelete);
    handleCloseModal();
  };

  // Ordena os usuários em ordem decrescente com base no ID
  const sortedUsers = users.slice().sort((a, b) => b.id - a.id);

  // Filtra os usuários com base no termo de pesquisa
  const filteredUsers = sortedUsers.filter((user) =>
    normalizeString(user.nome).includes(normalizeString(searchTerm))
  );

  return (
    <Container>
      <TextField
        fullWidth
        label="Pesquisar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '16px' }} 
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Dt. Nascimento</TableCell>
              {/* Adicione outras colunas conforme necessário */}
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredUsers
            ).map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{user.id}</TableCell>
                <TableCell align="right">{user.nome}</TableCell>
                <TableCell align="right">{user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</TableCell>

                <TableCell align="right">{user.nascimento}</TableCell>
                <TableCell align="right">
                  {user.id && (
                    <span style={{ marginRight: "8px" }}>
                      <Link to={`/user/${user.id}`}>
                        <Button variant="contained">Visualizar</Button>
                      </Link>
                    </span>
                  )}
                  <Button
                    style={{ marginRight: "8px" }}
                    component={Link}
                    to={`/atualizar/${user.id}`}
                    variant="contained"
                    color="warning"
                  >
                    Atualizar
                  </Button>
                  <Button
                    onClick={() => handleOpenModal(user.id)}
                    variant="contained"
                    color="error"
                  >
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[7, 10, 25, 50, { label: "All", value: -1 }]}
        component="div"
        count={filteredUsers.length} // Usar o comprimento dos usuários filtrados
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Confirmar exclusão
          </Typography>
          <Typography id="modal-description" variant="body1" gutterBottom>
            Tem certeza que deseja excluir este usuário?
          </Typography>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" style={{ marginRight: '8px' }}>
            Confirmar
          </Button>
          <Button onClick={handleCloseModal} variant="contained">
            Voltar
          </Button>
        </Box>
      </Modal>

    </Container>
  );
}
