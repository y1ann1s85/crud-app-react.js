import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './style.css';
import Logo from '../assets/logo.png';

function uniqueId () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}

class Employees extends React.Component {
    constructor() {
        super();
        this.state = {
            addEmployeeModal: false,
            deleteEmployeeModal: false,
            unableToDeleteModal: false,
            updateEmployeeModal: false,
            employeesData: [
                {
                    id: uniqueId(),
                    firstName: "Giannis",
                    lastName: "Alexiou",
                    email: "galexiou@employees.com",
                    phone: "6937984388",
                    department: "IT",
                    level: "Junior"
                },
                {
                    id: uniqueId(),
                    firstName: "Giorgos",
                    lastName: "Georgiadis",
                    email: "ggeorgiadis@employees.com",
                    phone: "6937945388",
                    department: "Analytics",
                    level: "Senior"
                },
                {
                    id: uniqueId(),
                    firstName: "Kostas",
                    lastName: "Konstantinidis",
                    email: "kkonstantinidis@employees.com",
                    phone: "6967946388",
                    department: "Business",
                    level: "Middle"
                }
            ],
            employeeData: {},
            id: null,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            department: "",
            level: "",
            emailInvalid: false,
            phoneInvalid: false,
            selectedId: '',
            selectedFirstName: '',
            selectedLastName: '',
            btnDisabled: false
        }
    }

    openModal = () => {
        this.setState({
            addEmployeeModal: true,
            fillAllWarning: false,
        });
    }

    closeModal = () => {
        this.setState({
            addEmployeeModal: false,
            fillAllWarning: false,
        });
    }

    getInfo = (e) => {
        console.log(e.target.id, e.target.value);

        this.setState({
            [e.target.id]: e.target.value,
            fillAllWarning: false
        });    
    }

    deleteEmployee = (id) => {
        if(this.state.employeesData.length > 1) {
            const employeesData = this.state.employeesData.filter( employeeData => employeeData.id != id );
            this.setState({
                employeesData: employeesData, 
                deleteEmployeeModal: false
            });    
        } else {
            this.setState({
                unableToDeleteModal: true,
                deleteEmployeeModal: false
            })
        }
    }

    addEmployee = (e) => {

        e.preventDefault();

        const employeeData = {
            id: uniqueId(),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            department: this.state.department,
            level: this.state.level
        };

        let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (this.state.firstName.length > 0 && this.state.lastName.length > 0 &&
            this.state.email.length > 0 && this.state.phone.length > 0 &&
            this.state.department.length != '' && this.state.level.length != '') {

            this.setState({
                fillAllWarning: false
            })

            if (validEmail.test(this.state.email) && validPhone.test(this.state.phone)) {
                this.setState({
                    employeesData: [...this.state.employeesData, employeeData],
                    addEmployeeModal: false,
                    updateEmployeeModal: false,
                    id: this.state.id + 1
                }, () => console.log(employeeData, this.state.employeesData));
            } else {
                this.setState({
                    fillAllWarning: true
                })
            }
                
        } else {
            this.setState({
                fillAllWarning: true
            })
        }
        
    }

    editEmployee = (employeeData) => {

        this.setState({
            updateEmployeeModal: true,
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            phone: employeeData.phone,
            department: employeeData.department,
            level: employeeData.level,
            employeeData: employeeData
        });
    }

    updateEmployee = (e) => {

        e.preventDefault();

        const updatedEmployeeData = Object.assign(
            {}, this.state.employeeData, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
                department: this.state.department,
                level: this.state.level
            }
        );

        console.log(this.state)
        let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        
        if (this.state.firstName.length > 0 && this.state.lastName.length > 0 &&
            this.state.email.length > 0 && this.state.phone.length > 0 &&
            this.state.department.length != '' && this.state.level.length != '') {

            this.setState({
                fillAllWarning: false
            })

            if (validEmail.test(this.state.email) && validPhone.test(this.state.phone)) {
                const employeesData = this.state.employeesData.map((employeeData) => (employeeData.id === this.state.employeeData.id ? updatedEmployeeData : employeeData));
                this.setState({ 
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    department: "",
                    level: "",            
                    employeesData: employeesData,
                    updateEmployeeModal: false,
                });        
            } else {
                this.setState({
                    fillAllWarning: true
                })
            }
        
        } else {
            this.setState({
                fillAllWarning: true
            })
        }
    }

    render() {
        return(
            <>
                <Navbar className="bg-light justify-content-between" bg="light">
                    <Navbar.Brand style={{color: '#343A40'}} href="#home">
                    <img
                        alt="main logo"
                        src={Logo}
                        width="50px"
                        className="d-inline-block align-top"
                        style={{marginTop: '10px', color: '#343A40'}}
                    />{' '}
                        Employees DB
                    </Navbar.Brand>
                    <Button onClick={this.openModal} variant="dark"><i style={{marginTop: '-17px'}} className="material-icons left">add_circle</i>Add an Employee</Button>
                </Navbar>

                <div className="myContainer">
                    <Table responsive variant="dark">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th><i className="material-icons left">person</i>Name</th>
                            <th><i className="material-icons left">email</i>E-Mail</th>
                            <th><i className="material-icons left">phone_android</i>Phone</th>
                            <th><i className="material-icons left">device_hub</i>Department</th>
                            <th><i className="material-icons left">remove_red_eye</i>Level</th>
                            <th style={{textAlign:'center'}}>Actions</th>
                            </tr>
                        </thead>
                        {this.state.employeesData.map((employeeData, index) => {
                            return(
                                <>
                                    <tbody>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{employeeData.firstName} {employeeData.lastName}</td>
                                            <td>{employeeData.email}</td>
                                            <td>{employeeData.phone}</td>
                                            <td>{employeeData.department}</td>
                                            <td>{employeeData.level}</td>
                                            <td style={{textAlign:'center'}}>
                                                <Button style={{marginRight: '2.5px'}} size='sm' variant="warning" onClick={() => this.editEmployee(employeeData)}><i className="material-icons">edit</i></Button>
                                                <Button style={{marginLeft: '2.5px'}} size='sm' variant="danger" 
                                                onClick={() => {                                                this.setState({
                                                    selectedId: employeeData.id,
                                                    selectedFirstName: employeeData.firstName,
                                                    selectedLastName: employeeData.lastName,
                                                    deleteEmployeeModal: true
                                                })}                                                }>
                                                <i className="material-icons">clear</i></Button>
                                            </td>
                                        </tr>
                                    </tbody>

                                    <Modal
                                        show={this.state.deleteEmployeeModal}
                                        onHide={() => this.setState({deleteEmployeeModal: false})}
                                        size='lg'
                                        scrollable='false'
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Delete {this.state.selectedFirstName} {this.state.selectedLastName} Employee Entry</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => this.setState({deleteEmployeeModal: false})}>Cancel</Button>
                                            <Button style={{marginLeft: '10px'}} variant="danger" onClick={() => this.deleteEmployee(this.state.selectedId)}>Delete Employee</Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <Modal
                                        show={this.state.unableToDeleteModal}
                                        onHide={() => this.setState({unableToDeleteModal: false})}
                                        size='lg'
                                        scrollable='false'
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Entry could not be Deleted. The Database must contain at least 1 Entry</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                            <Button variant="dark" onClick={() => this.setState({unableToDeleteModal: false})}>OK</Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <Modal
                                        show={this.state.updateEmployeeModal}
                                        onHide={() => this.setState({updateEmployeeModal: false})}
                                        size="xl"
                                        scrollable='false'
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Employee {this.state.fillAllWarning && <span style={{color: 'red'}}>*Please fill in the required fields properly</span>}</Modal.Title>
                                        </Modal.Header>
                                        <div style={{overflow: 'auto', marginTop: '10px'}}>
                                            <Container>
                                                <Form>
                                                    <Row>
                                                        <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                                            <Form.Group>
                                                                <Form.Label>First Name</Form.Label>
                                                                <Form.Control 
                                                                value={this.state.firstName}
                                                                size='sm' id="firstName" type="text" onChange={this.getInfo} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                                            <Form.Group>
                                                                <Form.Label>Last Name</Form.Label>
                                                                <Form.Control 
                                                                value={this.state.lastName} 
                                                                size='sm' id="lastName" type="text" onChange={this.getInfo} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                                            <Form.Group>
                                                                <Form.Label>E-Mail {this.state.emailInvalid && <span style={{ color: 'red' }}>*Please enter a vaild e-mail</span>}</Form.Label>
                                                                <Form.Control 
                                                                value={this.state.email} 
                                                                size='sm' id="email" type="text" onChange={this.getInfo} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                                            <Form.Group>
                                                                <Form.Label>Phone {this.state.phoneInvalid && <span style={{ color: 'red' }}>*Please enter a vaild Phone Number</span>}</Form.Label>
                                                                <Form.Control 
                                                                value={this.state.phone} 
                                                                size='sm' id="phone" type="text" onChange={this.getInfo} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                                            <Form.Group>
                                                                <Form.Label>Department</Form.Label>
                                                                <Form.Control 
                                                                value={this.state.department} 
                                                                size='sm' id="department" as="select" onChange={this.getInfo}>
                                                                    <option value="">Please Select a Department</option>
                                                                    <option>Analytics</option>
                                                                    <option>Business</option>
                                                                    <option>IT</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                                            <Form.Group>
                                                                <Form.Label>Level</Form.Label>
                                                                <Form.Control 
                                                                value={this.state.level} 
                                                                size='sm'id="level" as="select" onChange={this.getInfo}>
                                                                    <option value="">Please Select an Employee Level</option>
                                                                    <option>Junior</option>
                                                                    <option>Middle</option>
                                                                    <option>Senior</option>
                                                                    <option>Architect</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Container>
                                        </div>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => this.setState({updateEmployeeModal: false})}>Cancel</Button>
                                            <Button style={{marginLeft: '10px'}} variant="dark" onClick={this.updateEmployee}>Save Changes</Button>
                                        </Modal.Footer>
                                    </Modal>

                                </>
                            )
                        })}
                    </Table>
                </div>
                <Modal
                    show={this.state.addEmployeeModal}
                    onHide={this.closeModal}
                    size="xl"
                    scrollable='false'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new Employee {this.state.fillAllWarning && <span style={{color: 'red'}}>*Please fill in the required fields properly</span>}</Modal.Title>
                    </Modal.Header>
                    <div style={{overflow: 'auto', marginTop: '10px'}}>
                        <Container>
                            <Form>
                                <Row>
                                    <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                        <Form.Group>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control 
                                            size='sm' id="firstName" type="text" onChange={this.getInfo} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                        <Form.Group>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control 
                                            size='sm' id="lastName" type="text" onChange={this.getInfo} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                        <Form.Group>
                                            <Form.Label>E-Mail {this.state.emailInvalid ? <span style={{ color: 'red' }}>*Please enter a vaild e-mail</span> : null}</Form.Label>
                                            <Form.Control
                                            size='sm' id="email" type="text" onChange={this.getInfo} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                        <Form.Group>
                                            <Form.Label>Phone {this.state.phoneInvalid && <span style={{ color: 'red' }}>*Please enter a vaild Phone Number</span>}</Form.Label>
                                            <Form.Control 
                                            size='sm' id="phone" type="text" onChange={this.getInfo} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                        <Form.Group>
                                            <Form.Label>Department</Form.Label>
                                            <Form.Control 
                                            size='sm' id="department" as="select" onChange={this.getInfo}>
                                                <option value="">Please Select a Department</option>
                                                <option>Analytics</option>
                                                <option>Business</option>
                                                <option>IT</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} s={12} md={4} lg={4} xl={4}>
                                        <Form.Group>
                                            <Form.Label>Level</Form.Label>
                                            <Form.Control 
                                            size='sm'id="level" as="select" onChange={this.getInfo}>
                                                <option value="">Please Select an Employee Level</option>
                                                <option>Junior</option>
                                                <option>Middle</option>
                                                <option>Senior</option>
                                                <option>Architect</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Cancel</Button>
                        <Button style={{marginLeft: '10px'}} variant="dark" onClick={this.addEmployee}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default Employees;