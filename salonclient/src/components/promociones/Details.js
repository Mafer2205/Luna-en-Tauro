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

class DetailsPromocion extends Component {

    constructor (props) {
        super (props);

        const token = localStorage.getItem ("ACCESS_TOKEN");

        this.state = {    
            idPromo: 0,   
            nombPromo: '',
            descripPromo: '',
            fechaPromo: '',
            descuento: '',
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

        axios.get (`http://localhost:5000/api/promociones/${id}`,
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
                            idPromo: data.idPromo,
                            nombPromo: data.nombPromo,
                            descripPromo: data.descripPromo,
                            fechaPromo: data.fechaPromo.substr (0, 10),
                            descuento: data.descuento
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
                            <Label for="name" sm={2}>Fecha de promocion</Label>
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

export default DetailsPromocion;