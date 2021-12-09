import { Component } from 'react';
import axios from 'axios';
import { Redirect , Link } from "react-router-dom";

import {
    Container,
    FormGroup,
    Button, 
    Input,
    Form,
    Label,
    Col,
    Alert, Navbar, NavItem
} from 'reactstrap';

class AddPromociones extends Component {

    constructor (props) {
        super (props);

        var token = localStorage.getItem("ACCESS_TOKEN");

        this.state = {
            idPromo: '',
            nombPromo: '',
            descripPromo: '',
            fechaPromo: '',
            descuento: '',
            token: token,
            isSubmitted: '',
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    handleChange (e) {
        this.setState (
            {
                [e.target.name]: e.target.value
            }
        )
    }

    add (e) {
        axios.post ("http://localhost:5000/api/agregarpromociones", 
            {
                nombPromo: this.state.nombPromo,
                descripPromo: this.state.descripPromo,
                fechaPromo: this.state.fechaPromo,
                descuento: this.state.descuento,
            }, 
            {
                headers: {
                    'Content-type': "application/json",
                    'Authorization': `Bearer ${this.state.token}`
                }
            }
        ).then (
            (response) => {
                if (response.status === 200) {
                    this.cancel ();
                    this.setState (
                        {
                            isSubmitted: true,
                            error: false
                        }
                    );
                }
            },
            (error) => {
                this.setState (
                    {
                        isSubmitted: true,
                        error: true
                    }
                );
                console.log(error);
            }
        );
    }

    cancel (e) {
        this.setState (
            {
                idPromo: '',
                nombPromo: '',
                descripPromo: '',
                fechaPromo: '',
                descuento: '',
                isCanceled: true
            }
        );
    }

    render () {

        if (this.state.isCanceled) 
        {
            return (
                <Redirect
                    to = 
                    {
                        {
                            pathname: '/ListPromociones',
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
                            <Link to={'/AddPromociones'} style={{color:"white"}} className="nav-link">Agregar Promociones     |</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/ListPromociones'} style={{color:"white"}} className="nav-link">Ver Promociones</Link>
                        </NavItem>
                        </ul>
                    </div>
                </Navbar>
                <br/>
                <h4 className="PageHeading">Ingrese informacion de nuevo descuento</h4>
                <br/>
                <Alert
                    isOpen={this.state.isSubmitted}
                    color={!this.state.error ? "success" : "warning"}
                    toggle={() => this.setState ({isSubmitted: false})}
                >
                    {!this.state.error ? "Informacion guardada!" : "Un error ocurrio mientras se guardaba la informacion"}
                </Alert>
                <Form className="form">
                    <Col>
                        <FormGroup row>
                            <Label for="name" sm={2}>Nombre</Label>
                            <Col sm={2}>
                                <Input type="text" name="nombPromo" onChange={this.handleChange} value={this.state.nombPromo} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Descripcion</Label>
                            <Col sm={2}>
                                <Input type="text" name="descripPromo" onChange={this.handleChange} value={this.state.descripPromo} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Fecha de Promocion</Label>
                            <Col sm={2}>
                                <Input bsSize="md" type="date" name="fechaPromo" onChange={this.handleChange} value={this.state.fechaPromo} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={2}>Descuento</Label>
                            <Col sm={2}>
                                <Input type="text" name="descuento" onChange={this.handleChange} value={this.state.descuento} />
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
                                <Button color="secondary" onClick={this.cancel}>Cancelar</Button>{' '}
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

export default AddPromociones;