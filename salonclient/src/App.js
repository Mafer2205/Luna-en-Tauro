import React from 'react';
import Login from './components/login/Login';
import ListEmpleados from './components/empleados/List';
import ListClientes from './components/clientes/List';
import ListPromociones from './components/promociones/List';
import AddEmpleados from './components/empleados/Add';
import AddClientes from './components/clientes/Add';
import AddPromociones from './components/promociones/Add';
import EditEmpleados from './components/empleados/Edit';
import EditClientes from './components/clientes/Edit';
import DetailsEmpleados from './components/empleados/Details';
import DetailsClientes from './components/clientes/Details';
import DetailsPromociones from './components/promociones/Details';
import Inicio from './components/Inicio';
import UpdateServicios from './components/servicios/Update';
import DetailsServicios from './components/servicios/Details';
import ListServicios from './components/servicios/List';
import AddServicios from './components/servicios/Add';
import UpdateCitas from './components/citas/Update';
import DetailsCitas from './components/citas/Details';
import ListCitas from './components/citas/List';
import AddCitas from './components/citas/Add';
import ListCitServ from './components/extras/List_servcit';
import ListCitEmp from './components/extras/List_citemp';
import EditE from './components/citas/Estatus';
import EditEE from './components/empleados/Estatus';
import EditR from './components/clientes/Recompensas';
import Desarrollo from './components/extras/Desarrollo';

import {
	BrowserRouter as Router,
	Link,
	Switch,
	Route
} from 'react-router-dom'; 

import './App.css';
import { Container, Navbar, NavItem } from 'reactstrap';

function App (props) {
    return (
  
        <Router>
            <Container>
                <Navbar fixed = "top" expand="md" className="navheader">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto ">
                        <NavItem >
                            <Link to={'/Inicio'} className="nav-link"><img src ="./2.jpg" alt="Luna en Tauro"  width= "40" height ="40"/></Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/Inicio'} style={{color:"white"}} className="nav-link" >Inicio    |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListEmpleados'}  style={{color:"white"}} className="nav-link" >Empleados    |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCliente'} style={{color:"white"}} className="nav-link" >Clientes    |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListPromociones'} style={{color:"white"}} className="nav-link" >Promociones    |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListServicios'} style={{color:"white"}} className="nav-link" >Servicios    |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCitas'} style={{color:"white"}} className="nav-link" >Citas    |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCitasServicio'} style={{color:"white"}} className="nav-link" >Servicios + aplicados    |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCitasEmpleado'} style={{color:"white"}} className="nav-link" >Empleados + citas    |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/Desarrollo'} style={{color:"white"}}  className="nav-link" >Desarrollador   |</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                <br /><br /><br />
                <Link to={'Inicio'} className="nav-link" align="center"><img align="center" src ="./t.png" alt="Luna en tauro" width= "400" height ="180"/></Link>
            </Container>
            <br />
            <Switch>
                <Route exact path='/ListEmpleados' component={ListEmpleados} />
                <Route exact path='/ListCliente' component={ListClientes} />
                <Route exact path='/ListPromociones' component={ListPromociones} />
                <Route exact path='/Edit/:id' component={EditEmpleados} />
                <Route exact path='/EditCliente/:id' component={EditClientes} />
                <Route exact path='/Details/:id' component={DetailsEmpleados} />
                <Route exact path='/DetailsCliente/:id' component={DetailsClientes} />
                <Route exact path='/DetailsPromociones/:id' component={DetailsPromociones} />
                <Route exact path='/AddEmpleados' component={AddEmpleados} />
                <Route exact path='/AddClientes' component={AddClientes} />
                <Route exact path='/AddPromociones' component={AddPromociones} />
                <Route exact path='/Inicio' component={Inicio} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/ListServicios' component={ListServicios} />
                <Route exact path='/EditServicios/:id' component={UpdateServicios} />
                <Route exact path='/DetailsServicios/:id' component={DetailsServicios} />
                <Route exact path='/AddServicios' component={AddServicios} />
                <Route exact path='/ListCitas' component={ListCitas} />
                <Route exact path='/EditCitas/:id' component={UpdateCitas} />
                <Route exact path='/DetailsCitas/:id' component={DetailsCitas} />
                <Route exact path='/AddCitas' component={AddCitas} />
                <Route exact path='/ListCitasServicio' component={ListCitServ} />
                <Route exact path='/ListCitasEmpleado' component={ListCitEmp} />
                <Route exact path='/EditEstatus/:id' component={EditE} />
                <Route exact path='/EditEstatusEmp/:id' component={EditEE} />
                <Route exact path='/EditVisitas/:id' component={EditR} />
                <Route exact path='/Desarrollo' component={Desarrollo} />
            </Switch>
        </Router>
    );
}

export default App;