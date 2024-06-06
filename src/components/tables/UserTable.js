// Importa las dependencias necesarias de React, MUI y Axios
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // useEffect para obtener los datos de los usuarios cuando el componente se monta
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        setUsers(response.data);
        setMessage('Users fetched successfully');
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
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Fecha de Registro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.registration_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Exporta el componente UserTable
export default UserTable;
