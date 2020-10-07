import React, {Component} from 'react';
import { Navbar ,NavbarBrand ,NavbarToggler,Nav,Collapse,NavItem} from 'reactstrap';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import { NavLink } from  'react-router-dom';


class Header extends Component {

    constructor(props){
        super(props);
        this.state={
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.isNavOpen
        });
    }

    render() {
        return (
            <>
                <Navbar dark expand="md">
                    {/* /*collapse the navbar*/ }
                    <div className="container">
                    <NavbarToggler onclick={this.toggleNav} />
                    <NavbarBrand className="mr-auto" href='/'>
                        <img src="assets/images/logo.png" height = "30" width= "41" alt="Trivalante" />
                    </NavbarBrand>
                    <Collapse isOPen={this.state.isOPen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg">Home</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-info fa-lg">About us</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    <span className="fa fa-list fa-lg">Menu</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-address-card fa-lg">Contact Us</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con TrivalantE</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p> 
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </>
        )
    }
}

export default Header;