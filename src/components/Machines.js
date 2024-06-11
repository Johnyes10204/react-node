import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Typography, Box, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import axios from 'axios';

const Machines = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchMachines = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/machines');
      setMachines(response.data);
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };

  const handleCreateMachine = async () => {
    const newMachine = {
      name: name,
      description: description,
      purchase_date: purchaseDate
    };

    try {
      await axios.post('http://localhost:3001/api/machines', newMachine, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSnackbarMessage('Machine created successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      // Clear input fields after successful creation
      setName('');
      setDescription('');
      setPurchaseDate('');
      // Refresh machines list
      fetchMachines();
    } catch (error) {
      setSnackbarMessage('Error creating machine');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error creating machine:', error);
    }
  };

  const handleSelectMachine = (machine) => {
    setSelectedMachine(machine);
    setName(machine.name);
    setDescription(machine.description);
    setPurchaseDate(machine.purchase_date);
  };

  const handleUpdateMachine = async () => {
    if (!selectedMachine) {
      return;
    }

    const updatedMachine = {
      name: name,
      description: description,
      purchase_date: purchaseDate
    };

    try {
      await axios.put(`http://localhost:3001/api/machines/${selectedMachine.id}`, updatedMachine, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSnackbarMessage('Machine updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      // Refresh machines list
      fetchMachines();
    } catch (error) {
      setSnackbarMessage('Error updating machine');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error updating machine:', error);
    }
  };

  const handleDeleteMachine = async () => {
    if (!selectedMachine) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/machines/${selectedMachine.id}`);
      setSnackbarMessage('Machine deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      // Clear input fields after deletion
      setName('');
      setDescription('');
      setPurchaseDate('');
      setSelectedMachine(null);
      // Refresh machines list
      fetchMachines();
    } catch (error) {
      setSnackbarMessage('Error deleting machine');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error deleting machine:', error);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create / Update / Delete Machines
      </Typography>
      <Box mb={2}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Machine</InputLabel>
          <Select
            value={selectedMachine ? selectedMachine.id : ''}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selected = machines.find(machine => machine.id === selectedId);
              handleSelectMachine(selected);
            }}
          >
            {machines.map(machine => (
              <MenuItem key={machine.id} value={machine.id}>{machine.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
          label="Purchase Date"
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleCreateMachine}>
          Create Machine
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpdateMachine}>
          Update Machine
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDeleteMachine}>
          Delete Machine
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Machines;
