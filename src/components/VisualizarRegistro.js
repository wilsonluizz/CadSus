import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Button, Grid } from '@mui/material';

const VisualizarRegistro = ({ users }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const idToFind = parseInt(userId, 10);
    const foundUser = users.find((u) => u.id === idToFind);
    setUser(foundUser);
  }, [userId, users]);

  if (!user) {
    return <Container>Nenhum usuário encontrado.</Container>;
  }

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Detalhes do Registro
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>ID:</strong> {user.id}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Nome:</strong> {user.nome}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>CPF:</strong> {user.cpf}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>CNS:</strong> {user.cns}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Data de Nascimento:</strong> {user.nascimento}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Nome da Mãe:</strong> {user.nomeMae}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>CEP:</strong> {user.cep}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Logradouro:</strong> {user.logradouro}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Número:</strong> {user.numero}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Complemento:</strong> {user.complemento}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Bairro:</strong> {user.bairro}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Cidade:</strong> {user.cidade}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                <strong>Estado:</strong> {user.estado}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button component={Link} to="/" variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Voltar
      </Button>
    </Container>
  );
};

export default VisualizarRegistro;
