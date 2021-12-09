import { Component } from "react";

import { Container, Table} from "reactstrap";


class Inicio extends Component {

    render () {
        return (
            
            <Container>
                <Table align="center">
                    <tr>
                        <td><h4 align="center">Un salon para ti</h4></td>
                        <td><h2 align="center">Luna en Tauro</h2></td>
                        <td><h4 align="center">Un lugar magico</h4></td>         
                    </tr>
                    <tr>
                        <td><img align="center" src ="./1.jpg" alt="Un salon para ti" width= "350" height ="350"/></td>
                        <td><img align="center" src ="./2.jpg" alt="Luna en Tauro"  width= "350" height ="350"/></td>
                        <td><img align="center" src ="./3.jpg" alt="Un lugar magico"  width= "350" height ="350"/></td>         
                    </tr>

                </Table>
            </Container>
        );
    }

}

export default Inicio;