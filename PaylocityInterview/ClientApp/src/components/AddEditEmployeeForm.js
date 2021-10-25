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
                                <div>
                                    <label>Estimated Yearly Benefit Cost $<span>{employee.benefitCost}</span></label>
                                </div>
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