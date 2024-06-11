import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Typography, Box, List, ListItem, ListItemText, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import axios from 'axios';

const ConsumptionT = () => {
  // States for tape_consumption
  const [machineId, setMachineId] = useState('');
  const [tapeId, setTapeId] = useState('');
  const [consumptionDate, setConsumptionDate] = useState('');
  const [quantityConsumed, setQuantityConsumed] = useState('');
  const [tapeConsumptions, setTapeConsumptions] = useState([]);

  // States for machines and tapes
  const [machines, setMachines] = useState([]);
  const [tapes, setTapes] = useState([]);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCreateTapeConsumption = async () => {
    const newTapeConsumption = {
      machine_id: machineId,
      tape_id: tapeId,
      consumption_date: consumptionDate,
      quantity_consumed: quantityConsumed,
    };

    try {
      await axios.post('http://localhost:3001/api/tape_consumption', newTapeConsumption, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSnackbarMessage('Tape Consumption created successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchTapeConsumptions();
      setMachineId('');
      setTapeId('');
      setConsumptionDate('');
      setQuantityConsumed('');
    } catch (error) {
      setSnackbarMessage('Error creating Tape Consumption');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error creating Tape Consumption:', error);
    }
  };

  const fetchTapeConsumptions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tape_consumption');
      setTapeConsumptions(response.data);
    } catch (error) {
      console.error('Error fetching Tape Consumptions:', error);
    }
  };

  const fetchMachines = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/machines');
      setMachines(response.data);
    } catch (error) {
      console.error('Error fetching Machines:', error);
    }
  };

  const fetchTapes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tapes');
      setTapes(response.data);
    } catch (error) {
      console.error('Error fetching Tapes:', error);
    }
  };

  useEffect(() => {
    fetchTapeConsumptions();
    fetchMachines();
    fetchTapes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Tape Consumption
      </Typography>
      <Box mb={2}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Machine ID</InputLabel>
          <Select
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            label="Machine ID"
          >
            {machines.map((machine) => (
              <MenuItem key={machine.id} value={machine.id}>
                {machine.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Tape ID</InputLabel>
          <Select
            value={tapeId}
            onChange={(e) => setTapeId(e.target.value)}
            label="Tape ID"
          >
            {tapes.map((tape) => (
              <MenuItem key={tape.id} value={tape.id}>
                {tape.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Consumption Date"
          type="date"
          value={consumptionDate}
          onChange={(e) => setConsumptionDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Quantity Consumed"
          value={quantityConsumed}
          onChange={(e) => setQuantityConsumed(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateTapeConsumption}>
          Create Tape Consumption
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        List of Tape Consumptions
      </Typography>
      <List>
        {tapeConsumptions.map((tapeConsumption) => (
          <ListItem key={tapeConsumption.id}>
            <ListItemText
              primary={`Machine ID: ${tapeConsumption.machine_id}, Tape ID: ${tapeConsumption.tape_id}, Quantity Consumed: ${tapeConsumption.quantity_consumed}`}
              secondary={`Consumption Date: ${tapeConsumption.consumption_date}`}
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

export default ConsumptionT;
