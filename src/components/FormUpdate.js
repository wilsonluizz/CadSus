import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const UpdateForm = ({ users, setUsers, handleShowSuccessMessage }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cns: "",
    nascimento: "",
    nomeMae: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  useEffect(() => {
    const userToUpdate = users.find((user) => user.id === Number(userId));
    if (userToUpdate) {
      // Convertendo a data de nascimento para o formato esperado pelo TextField
      const formattedDate = userToUpdate.nascimento ? new Date(userToUpdate.nascimento).toISOString().substr(0, 10) : "";
      setFormData({
        nome: userToUpdate.nome,
        cpf: userToUpdate.cpf,
        cns: userToUpdate.cns.toString(),
        nascimento: formattedDate, // Utilizando a data formatada
        nomeMae: userToUpdate.nomeMae,
        cep: userToUpdate.cep,
        logradouro: userToUpdate.logradouro,
        numero: userToUpdate.numero,
        complemento: userToUpdate.complemento,
        bairro: userToUpdate.bairro,
        cidade: userToUpdate.cidade,
        estado: userToUpdate.estado,
      });
    }
  }, [users, userId]);
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      (name === "cpf" && value.length > 14) ||
      (name === "cns" && value.length > 15) ||
      (name === "cep" && value.length > 8)
    ) {
      return;
    }

    if (
      (name === "cpf" && /^\d{0,11}$/.test(value.replace(/\D/g, ""))) ||
      (name === "cns" && /^\d{0,15}$/.test(value)) ||
      (name === "cep" && /^\d{0,8}$/.test(value))
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (name === "cep" && value.length === 8) {
        fetch(`https://viacep.com.br/ws/${value}/json/`)
          .then((response) => response.json())
          .then((data) => {
            setFormData((prevData) => ({
              ...prevData,
              logradouro: data.logradouro || "",
              complemento: data.complemento || "",
              bairro: data.bairro || "",
              cidade: data.localidade || "",
              estado: data.uf || "",
            }));
          })
          .catch((error) => {
            console.error("Erro ao buscar o endereço:", error);
          });
      }
    } else if (name !== "cpf" && name !== "cns" && name !== "cep") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const updatedUsers = users.map((user) =>
      user.id === Number(userId)
        ? {
            ...user,
            nome: formData.nome,
            cpf: formData.cpf,
            cns: Number(formData.cns),
            nascimento: formData.nascimento,
            nomeMae: formData.nomeMae,
            cep: formData.cep,
            logradouro: formData.logradouro,
            numero: formData.numero,
            complemento: formData.complemento,
            bairro: formData.bairro,
            cidade: formData.cidade,
            estado: formData.estado,
          }
        : user
    );
    setUsers(updatedUsers);
    navigate("/");
    handleShowSuccessMessage("Registro atualizado com sucesso!");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Atualização de Registro
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputMask
            mask="999.999.999-99"
            value={formData.cpf}
            onChange={(event) => handleChange(event)}
          >
            {(inputProps) => (
              <TextField fullWidth label="CPF" name="cpf" {...inputProps} />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="CNS"
            name="cns"
            value={formData.cns}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Data de Nascimento"
            type="date"
            name="dataNascimento" 
            value={formData.nascimento}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome da Mãe"
            name="nomeMae"
            value={formData.nomeMae}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="CEP"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Logradouro"
            name="logradouro"
            value={formData.logradouro}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Número"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Complemento"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGoBack}
            >
              Voltar
            </Button>
            <Button
              sx={{ marginLeft: "15px" }}
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateForm;
