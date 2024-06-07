// Importa las dependencias necesarias de React, MUI y Axios
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ConsumptionTable = () => {
  const [users, setUsers] = useState([]);
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
      }
    };

    fetchUsers();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell>Maquina</TableCell>
              <TableCell>Tintas</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.machine}</TableCell>
                <TableCell>{user.tape}</TableCell>
                <TableCell>{user.quantity_consumed}</TableCell>
                <TableCell>{user.consumption_date}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Exporta el componente UserTable
export default ConsumptionTable;
