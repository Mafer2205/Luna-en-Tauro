import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import {
    Container,
    FormGroup,
    Button,
    Label,
    Input,
    Form,
    Col,
    Alert, Navbar, NavItem 
} from 'reactstrap';

class EditE extends Component {

    constructor (props) {
        super (props);

        const token = localStorage.getItem ("ACCESS_TOKEN");

        this.state = {    
            idCita: 0,
            fechaCita: '',
            asistio: '',
            rCliente: '',
            rServ: '',
            rPromo: '',
            rEmp: '',
            totalCita: '',
            token: token,
            error: false,
            isSubmitted: false,
            isCanceled: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount () {
        const id = this.props.match.params.id 

        axios.get (`http://localhost:5000/api/citas/${id}`,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then (
            (response) => {
                if (response.status === 200) {
                    const data= response.data;
                    
                    this.setState (
                        { 
                            idCita: data.idCita,
                            fechaCita: data.fechaCita.substr (0, 10),
                            asistio: data.asistio,
                            rCliente: data.rCliente,
                            rServ: data.rServ,
                            rPromo: data.rPromo,
                            rEmp: data.rEmp,
                            totalCita: data.totalCita
                        }
                    )
                }
            },
            (error) => {
                if (error.response.status === 401) {
                    localStorage.removeItem("ACCESS_TOKEN");
                    this.setState (
                        {
                            token: ''
                        }
                    )
                }
            }
        );
    }

    add () {
        const id = this.props.match.params.id

        axios.put (`http://localhost:5000/api/actualizarestatus/${id}`,
        {
            idCita: id,
            fechaCita:  this.state.fechaCita,
            asistio:  this.state.asistio,
            rCliente:  this.state.rCliente,
            rServ:  this.state.rServ,
            rPromo:  this.state.rPromo,
            rEmp:  this.state.rEmp,
            totalCita:  this.state.totalCita
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then (
            (response) => {
                if (response.status === 200) {
                    this.setState (
                        {
                            isSubmitted: true,
                            error: false
                        }
                    )
                }
                console.log(response);
            },
            (error) => {
                this.setState (
                    {
                        isSubmitted: true,
                        error: true
                    }
                )
                console.log (error);
            }
        )
    }

    cancel (e) {
        this.setState (
            {
                isCanceled: true
            }
        );
    }
 
    handleChange (e) {
        this.setState (
            {
                [e.target.name]: e.target.value
            }
        )
    }

    render () {

        if (!this.state.token) {
            return (
                <Redirect
                    to = 
                    {
                        {
                            pathname: '/login',
                            state: {
                                from: this.props.location
                            }
                        }
                    } 
                />
            );
        }

        if (this.state.isCanceled) 
        {
            return (
                <Redirect
                    to = 
                    {
                        {
                            pathname: '/ListCitas',
                            state: {
                                from: this.props.location
                            }
                        }
                    }
                />
            );
        }

        return (
            <Container className="App">
                <Navbar expand="lg" className="navheader">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto">
                        <NavItem>
                            <Link to={'/AddCitas'} style={{color:"white"}} className="nav-link">Agregar Cita     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCitas'} style={{color:"white"}} className="nav-link">Ver Citas</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                <br/>
                <h4 className="PageHeading">Actualiza la informacion del estatus de la cita</h4>
                <br/>
                <Alert 
                    isOpen={this.state.isSubmitted} 
                    color={!this.state.error ? "success" : "warning"}
                    toggle={() => this.setState ({ isSubmitted: false })}
                >
                    {!this.state.error ? "Informacion guardada!" : "Un error ocurrio mientras se guardaba la informacion"}
                </Alert>
                <Form className="form">
                <Col>
                        <FormGroup row>
                            <Label for="name" sm={2}>Asistio</Label>
                            <Col sm={2}>
                                <Input type="text" name="asistio" onChange={this.handleChange} value={this.state.asistio} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Col sm={5}>
                            </Col>
                            <Col sm={1}>
                                <Button color="primary" onClick={this.add}>Aceptar</Button>
                            </Col>
                            <Col sm={1}>
                                <Button color="secondary" onClick={this.cancel} >Cancelar</Button>
                            </Col>
                            <Col sm={5}>
                            </Col>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        );
    }

}

export default EditE;