import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/material/styles'; // Corregido el import aquí
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SettingsIcon from '@mui/icons-material/Settings';
import Home from './components/Home';
import Consumption from './components/Consumption';
import Tapes from './components/Tapes';
import AsigTapes from './components/AssigmentsTapes';
import ConsumptionT from './components/ConsumtionT';
import Machines from './components/Machines';



function App() {
 

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            My App
          </Typography>
          <Button component={Link} to="/" color="inherit" startIcon={<HomeIcon />}>
            Inicio
          </Button>
          <Button component={Link} to="/consumtion" color="inherit" startIcon={<ShoppingCartIcon />}>
            Consumos
          </Button>
          <Button component={Link} to="/tapes" color="inherit" startIcon={<AssignmentIcon />}>
            Asignaciones
          </Button>
          <Button component={Link} to="/consumption" color="inherit" startIcon={<SportsEsportsIcon />}>
            Marcar Usos
          </Button>
          <Button component={Link} to="/machines" color="inherit" startIcon={<SettingsIcon />}>
            Maquinas
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consumtion" element={<Consumption />} />
        <Route path="/tapes" element={<Tapes />} />
        <Route path="/asign" element={<AsigTapes />} />
        <Route path="/consumption" element={<ConsumptionT />} />
        <Route path="/machines" element={<Machines />} />
      </Routes>
    </div>
  );
}

export default App;
