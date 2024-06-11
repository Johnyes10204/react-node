import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, List, ListItem, ListItemText, IconButton, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const Tapes = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [tapes, setTapes] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCreateTape = async () => {
    const newTape = {
      name,
      description,
      acquisition_date: acquisitionDate,
    };

    try {
      await axios.post('http://localhost:3001/api/tapes', newTape, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSnackbarMessage('Tape created successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchTapes(); // Fetch tapes again to update the list
      setName('');
      setDescription('');
      setAcquisitionDate('');
    } catch (error) {
      setSnackbarMessage('Error creating tape');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error creating tape:', error);
    }
  };

  const handleDeleteTape = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tapes/${id}`);
      setSnackbarMessage('Tape deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchTapes(); // Fetch tapes again to update the list
    } catch (error) {
      setSnackbarMessage('Error deleting tape');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error deleting tape:', error);
    }
  };

  const fetchTapes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tapes');
      setTapes(response.data);
    } catch (error) {
      console.error('Error fetching tapes:', error);
    }
  };

  useEffect(() => {
    fetchTapes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Tape
      </Typography>
      <Box mb={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Acquisition Date"
          type="date"
          value={acquisitionDate}
          onChange={(e) => setAcquisitionDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleCreateTape}>
          Create Tape
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        List of Tapes
      </Typography>
      <List>
        {tapes.map((tape) => (
          <ListItem key={tape.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTape(tape.id)}>
            elimi
            </IconButton>
          }>
            <ListItemText
              primary={tape.name}
              secondary={`Description: ${tape.description}, Acquisition Date: ${tape.acquisition_date}`}
            />
          </ListItem>
        ))}
      </List>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Tapes;
