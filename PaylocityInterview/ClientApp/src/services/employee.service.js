// TODO: Create wrapper around fetch so don't need to pass requestOptions
// TODO: Add error handling in fetch result

const baseUrl = `/employee`;

export const employeeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getBenefitCost
};

function getAll() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${baseUrl}`, requestOptions).then(res => res.json());
}

function getById(id) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${baseUrl}/${id}`, requestOptions).then(res => res.json());
}

function create(params) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };

    return fetch(baseUrl, requestOptions).then(res => res.json());
}

function update(id, params) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    return fetch(`${baseUrl}/${id}`, requestOptions).then(res => res.json());
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(`${baseUrl}/${id}`, requestOptions).then(res => res.json());
}

function getBenefitCost(params) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    return fetch(`${baseUrl}/GetBenefitCost/`, requestOptions).then(res => res.json());
}