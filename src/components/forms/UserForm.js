import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Alert, Card, CardContent, CardActions, Grid, Avatar } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UserTable from '../tables/UserTable';

function formatDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const UserForm = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [registration_date, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPassword(formatDate());
    try {
      const response = await axios.post('http://localhost:3001/api/users', {
        "name": name,
        "email": email,
        "registration_date": registration_date,
      });
      setMessage('User created successfully');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage('Error creating user');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <PersonAddIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h4" component="h1">
                  Create User
                </Typography>
              </Grid>
            </Grid>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <CardActions>
                <Button type="submit" variant="contained" color="primary" startIcon={<PersonAddIcon />}>
                  Crear usuario
                </Button>
              </CardActions>
            </Box>
            {message && (
              <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: 4 }}>
        <UserTable />
      </Box>
    </Container>
  );
};

export default UserForm;
