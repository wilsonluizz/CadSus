import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const Formulario = ({ users, setUsers, handleShowSuccessMessage }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cns: "",
    dataNascimento: "",
    nomeMae: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      (name === "cpf" && value.length > 14) || // CPF com máscara terá 14 caracteres
      (name === "cns" && value.length > 15) ||
      (name === "cep" && value.length > 8)
    ) {
      return;
    }

    if (
      (name === "cpf" && /^\d{0,11}$/.test(value)) ||
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
    } else if (name !== "cns" && name !== "cep") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    if (
      formData.nome &&
      formData.cpf &&
      formData.cns &&
      formData.dataNascimento &&
      formData.nomeMae &&
      formData.cep &&
      formData.logradouro &&
      formData.numero &&
      formData.bairro &&
      formData.cidade &&
      formData.estado
    ) {
      const userDateParts = formData.dataNascimento.split("-");
      const formattedDate = `${userDateParts[2]}/${userDateParts[1]}/${userDateParts[0]}`;

      const newUser = {
        id: users.length + 1,
        nome: formData.nome,
        cpf: formData.cpf,
        nascimento: formattedDate,
        cns: formData.cns,
        cep: formData.cep,
        logradouro: formData.logradouro,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
      };

      setUsers([...users, newUser]);
      setFormData({
        nome: "",
        cpf: "",
        cns: "",
        dataNascimento: "",
        nomeMae: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
      });

      navigate("/"); //redirecionamento para home após criação de registro

      handleShowSuccessMessage("Registro criado com sucesso!"); //mensagem de confirmação
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Formulário de Registro
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
              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                {...inputProps}
              />
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
            value={formData.dataNascimento}
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
    
    export default Formulario;
    