import React from 'react';

import logo from '../../pharmacieLogo.png'

import {
    Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {Link} from "react-router-dom";



const Header = () => (
    <header>

        <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>

            <Container>
                <Row noGutters className="position-relative w-100 align-items-center">

                    <Col className="d-none d-lg-flex justify-content-start">
                        <Nav className="mrx-auto" navbar>

                            <NavItem className="d-flex align-items-center">
                                <NavLink className="font-weight-bold" href="/">
                                    <img src={logo} alt="phlogo" className="img-fluid rounded-circle" style={{ width: 36 }} />
                                </NavLink>
                            </NavItem>

                            <NavItem className="d-flex align-items-center">
                                <NavLink className="font-weight-bold" href="/ville">Mes pharmacies</NavLink>

                            </NavItem>

                            <NavItem className="d-flex align-items-center">
                                <NavLink className="font-weight-bold" href="/">Carte</NavLink>
                            </NavItem>

                            <UncontrolledDropdown className="d-flex align-items-center" nav inNavbar>
                                <DropdownToggle className="font-weight-bold" nav caret>details</DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem className="font-weight-bold text-secondary text-uppercase" header disabled>details</DropdownItem>
                                    <DropdownItem  >
                                        <NavLink className="font-weight-bold" href="/ville">villes</NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink className="font-weight-bold" href="/zone">zones</NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink className="font-weight-bold" href="/user">users</NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Nav>
                    </Col>

                    <Col className="d-flex justify-content-xs-start justify-content-lg-center">
                        <Form inline>
                            <Input type="search" className="mr-3" placeholder="Search React Courses" />
                        </Form>
                    </Col>

                    <Col className="d-none d-lg-flex justify-content-end">
                        <Form inline>

                            <Button type="submit" color="info" outline>Search</Button>
                        </Form>
                    </Col>

                </Row>
            </Container>

        </Navbar>
    </header>
);

export default Header;