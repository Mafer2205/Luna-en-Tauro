import { Component } from "react";
import { Redirect , Link } from "react-router-dom";
import axios from "axios";

import {
    Container,
    FormGroup,
    Button,
    Label,
    Input,
    Form,
    Col, Navbar, NavItem
} from 'reactstrap';

class DetailsCliente extends Component {

    constructor (props) {
        super (props);

        const token = localStorage.getItem ("ACCESS_TOKEN");

        this.state = {    
            idCliente: 0,   
            nombCliente: '',
            appCliente: '',
            telCliente: '',
            correoCliente: '',
            noVisitas: '',
            noRecomp: '',
            token: token,
            error: false,
            isSubmitted: false,
            isCanceled: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount () {
        const id = this.props.match.params.id 

        axios.get (`http://localhost:5000/api/clientes/${id}`,
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
                            idCliente: data.idCliente,
                            nombCliente: data.nombCliente,
                            appCliente: data.appCliente,
                            telCliente: data.telCliente,
                            correoCliente: data.correoCliente,
                            noVisitas: data.noVisitas,
                            noRecomp: data.noRecomp
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
                            pathname: '/ListCliente',
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
                            <Link to={'/AddClientes'}  style={{color:"white"}} className="nav-link">Agregar Cliente     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListCliente'} style={{color:"white"}} className="nav-link">Ver Clientes</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                <br/>
                <Form className="form">
                    <Col>
                    <FormGroup row>
                            <Label for="name" sm={2}>Nombre</Label>
                            <Col sm={2}>
                                <Input type="text" name="nombCliente" onChange={this.handleChange} value={this.state.nombCliente} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Apellidos</Label>
                            <Col sm={2}>
                                <Input type="text" name="appCliente" onChange={this.handleChange} value={this.state.appCliente} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Telefono</Label>
                            <Col sm={2}>
                                <Input type="text" name="telCliente" onChange={this.handleChange} value={this.state.telCliente} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Correo</Label>
                            <Col sm={2}>
                                <Input  type="text" name="correoCliente" value={this.state.correoCliente} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>No. visitas</Label>
                            <Col sm={2}>
                                <Input  type="text" name="noVisitas" value={this.state.noVisitas} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>No. recompensas</Label>
                            <Col sm={2}>
                                <Input type="text" name="noRecomp" onChange={this.handleChange} value={this.state.noRecomp} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Col sm={5}>
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

export default DetailsCliente;