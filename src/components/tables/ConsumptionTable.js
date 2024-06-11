import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Button,
  Avatar,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ConsumptionTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // useEffect para obtener los datos de los usuarios cuando el componente se monta
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tape_consumption');
        setUsers(response.data);
        setMessage('Consumos obtenidos correctamente');
      } catch (error) {
        setMessage('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tape Consumption
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {message && (
            <Alert severity={message.includes('Error') ? 'error' : 'success'} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Maquina</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tintas</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ marginRight: 2 }} src={`/images/${user.name}.jpg`} />
                        {user.name}
                      </Box>
                    </TableCell>
                    <TableCell>{user.machine}</TableCell>
                    <TableCell>{user.tape}</TableCell>
                    <TableCell>{user.quantity_consumed}</TableCell>
                    <TableCell>{user.consumption_date}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton color="secondary">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            startIcon={<EditIcon />}
          >
            Agregar Nuevo Consumo
          </Button>
        </>
      )}
    </Box>
  );
};

// Exporta el componente ConsumptionTable
export default ConsumptionTable;
