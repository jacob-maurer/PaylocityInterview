import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { employeeService } from '../services/employee.service';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function AddEditEmployeeForm({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Name is required'),
        dependents: Yup.array().of(
            Yup.object().shape({
                fullName: Yup.string()
                    .required('Name is required')
            })
        )
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState, getValues } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createEmployee(data)
            : updateEmployee(id, data);
    }

    function createEmployee(data) {
        return employeeService.create(data)
            .then(() => {
                // TODO: Add Alert to user interface to let user know
            });
        // TODO: catch error and do something with it
    }

    function updateEmployee(id, data) {
        return employeeService.update(id, data)
            .then(() => {
                // TODO: Add Alert to user interface to let user know
            });
        // TODO: catch error and do something with it
    }

    const initialEmployeeValues = { fullName: "", benefitCost: 0, dependents: [] };
    const [employee, setEmployee] = useState(initialEmployeeValues);

    useEffect(() => {
        if (!isAddMode) {
            // get employee and set form fields
            employeeService.getById(id).then(emp => {
                const fields = ['fullName', 'dependents'];
                fields.forEach(field => setValue(field, emp[field]));
                setEmployee(emp);
            });
        } else {
            setEmployee(initialEmployeeValues);
        }
    }, []);

    function addDependent() {
        setEmployee({ ...employee, dependents: [...employee.dependents, { fullName: "" }] });
    };

    function calculateBenefitCost() {
        employeeService.getBenefitCost(getValues()).then(x => setEmployee({ ...employee, benefitCost: x }));
    };

    return (
        <div className="main-form">
            <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                <div className="card m-3">
                    <h5 className="card-header">{isAddMode ? 'Add Employee' : 'Edit Employee'}</h5>
                    <div className="card-body border-bottom">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" {...register('fullName')} className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.fullName?.message}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body border-bottom">
                        {employee.dependents.map((dependent, i) => (
                            <div key={i} className="list-group list-group-flush">
                                <div className="list-group-item">
                                    <h5 className="card-title">Dependent {i + 1}</h5>
                                    <div className="form-row">
                                        <div className="form-group col-6">
                                            <label>Name</label>
                                            <input type="text" {...register('dependents[' + i + '].fullName')} className={`form-control ${errors.dependents?.[i]?.fullName ? 'is-invalid' : ''}`} />
                                            <div className="invalid-feedback">{errors.dependents?.[i]?.fullName?.message}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary" onClick={addDependent}>
                            Add Dependent
                        </button>
                    </div>
                    <div className="card-body border-bottom">
                        <div className="form-row">
                            <div className="form-group">
                                {employee.benefitCost ? (
                                    <div>
                                        <div>
                                            Gross Pay Per Period: $<span>{employee.payCheckAmount}</span>
                                        </div>
                                        <div>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Type</th>
                                                        <th>Yearly Benefit Cost</th>
                                                        <th>Discount?</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Employee</td>
                                                        <td>$<span>{employee.benefitCost.employeeBenefitCostDetail.benefitCost}</span></td>
                                                        <td>{employee.benefitCost.employeeBenefitCostDetail.isDiscountReceived ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                                            </svg> :
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                            </svg>}
                                                        </td>
                                                    </tr>
                                                    {employee.benefitCost.dependentBenefitCostDetails.map((depBenCost, index) => (
                                                        <tr>
                                                            <td>Dependent {index + 1}</td>
                                                            <td>$<span>{depBenCost.benefitCost}</span></td>
                                                            <td>{depBenCost.isDiscountReceived ?
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                                                </svg> :
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                                </svg>}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div>
                                            <div>Estimated Yearly Benefit Cost: $<span>{employee.benefitCost.totalBenefitCost}</span></div>
                                            <div>Estimated Pay Period Benefit Cost: $<span>{(Math.round(employee.benefitCost.payPeriodBenefitCost * 100) / 100).toFixed(2)}</span></div>
                                        </div>
                                    </div>)
                                    : <div></div>
                                }
                                <div>
                                    <button type="button" className="btn btn-secondary" onClick={calculateBenefitCost}>
                                        Preview Benefit Cost
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center border-top-0">
                        <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <Link to="/employees" className="btn btn-link">Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export { AddEditEmployeeForm };