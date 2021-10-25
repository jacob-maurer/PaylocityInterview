import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { employeeService } from '../services/employee.service';

export class Employee extends Component {
    static displayName = Employee.name;

    constructor(props) {
        super(props);
        this.state = { employees: [], loading: true };

        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount() {
        this.populateEmployees();
    }

    deleteEmployee(id) {
        this.setState((state, props) => (state.employees.map(emp => {
            if (emp.id === id) {
                emp.isDeleting = true;
            }
            return emp;
        })));
        employeeService.delete(id).then(() => {
            this.setState((state, props) => ({ employees: state.employees.filter(x => x.id !== id)}));
        });
    }

    renderEmployeesTable(employees) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Dependents</th>
                        <th>Benefit Cost</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.fullName}</td>
                            <td>{employee.dependents.length}</td>
                            <td>{employee.benefitCost}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/employee/edit/${employee.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={(e) => this.deleteEmployee(employee.id, e)} className="btn btn-sm btn-danger btn-delete-employee" disabled={employee.isDeleting}>
                                    {employee.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEmployeesTable(this.state.employees);

        return (
            <div>
                <h1 id="tabelLabel">Employees</h1>
                {contents}
            </div>
        );
    }

    async populateEmployees() {
        const data = await employeeService.getAll();
        this.setState({ employees: data, loading: false });
    }
}
