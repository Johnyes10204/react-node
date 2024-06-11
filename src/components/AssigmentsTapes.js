import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Typography, Box, List, ListItem, ListItemText, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const AsigTapes = () => {
  // States for machine_tapes
  const [tapeId, setTapeId] = useState('');
  const [machineId, setMachineId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [machineTapes, setMachineTapes] = useState([]);

  // States for tapes list
  const [tapes, setTapes] = useState([]);

  // States for machines list
  const [machines, setMachines] = useState([]);

  // States for assignments
  const [assignments, setAssignments] = useState([]);
  const [userId, setUserId] = useState('');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleCreateMachineTape = async () => {
    const newMachineTape = {
      tape_id: tapeId,
      machine_id: machineId,
      quantity,
    };

    try {
      await axios.post('http://localhost:3001/api/machine_tapes', newMachineTape, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSnackbarMessage('Machine Tape created successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchMachineTapes();
      setTapeId('');
      setMachineId('');
      setQuantity('');
    } catch (error) {
      setSnackbarMessage('Error creating Machine Tape');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error creating Machine Tape:', error);
    }
  };

  const fetchMachineTapes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/machine_tapes');
      setMachineTapes(response.data);
    } catch (error) {
      console.error('Error fetching Machine Tapes:', error);
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

  const fetchMachines = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/machines');
      setMachines(response.data);
    } catch (error) {
      console.error('Error fetching Machines:', error);
    }
  };

  const handleDeleteAssignment = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/assignments/${id}`);
      setSnackbarMessage('Assignment deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchAssignments();
    } catch (error) {
      setSnackbarMessage('Error deleting Assignment');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error deleting Assignment:', error);
    }
  };

  const handleUpdateAssignment = async () => {
    const updatedAssignment = {
      user_id: userId,
      machine_id: machineId,
      assignment_date: assignmentDate,
    };

    try {
      await axios.put(`http://localhost:3001/api/assignments/${currentAssignmentId}`, updatedAssignment, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSnackbarMessage('Assignment updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchAssignments();
      setEditDialogOpen(false);
    } catch (error) {
      setSnackbarMessage('Error updating Assignment');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error updating Assignment:', error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/assignments');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching Assignments:', error);
    }
  };

  useEffect(() => {
    fetchMachineTapes();
    fetchAssignments();
    fetchTapes(); // Fetch the tapes for the select dropdown
    fetchMachines(); // Fetch the machines for the select dropdown
  }, []);

  const handleEditAssignment = (assignment) => {
    setUserId(assignment.user_id);
    setMachineId(assignment.machine_id);
    setAssignmentDate(assignment.assignment_date);
    setCurrentAssignmentId(assignment.id);
    setEditDialogOpen(true);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Machine Tape
      </Typography>
      <Box mb={2}>
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
        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateMachineTape}>
          Create Machine Tape
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        List of Machine Tapes
      </Typography>
      <List>
        {machineTapes.map((machineTape) => (
          <ListItem key={machineTape.id}>
            <ListItemText
              primary={`Tape ID: ${machineTape.tape_id}, Machine ID: ${machineTape.machine_id}, Quantity: ${machineTape.quantity}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h4" gutterBottom>
        List of Assignments
      </Typography>
      <List>
        {assignments.map((assignment) => (
          <ListItem key={assignment.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditAssignment(assignment)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAssignment(assignment.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText
              primary={`User ID: ${assignment.user_id}, Machine ID: ${assignment.machine_id}`}
              secondary={`Assignment Date: ${assignment.assignment_date}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Assignment</DialogTitle>
        <DialogContent>
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            margin="normal"
          />
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
          <TextField
            label="Assignment Date"
            type="date"
            value={assignmentDate}
            onChange={(e) => setAssignmentDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateAssignment} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AsigTapes;
