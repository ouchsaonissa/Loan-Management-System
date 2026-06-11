const customers = [
  { id: 1, name: 'Sophea Chan', email: 'sophea@example.com', phone: '012 345 678', city: 'Phnom Penh' },
  { id: 2, name: 'Dara Kim', email: 'dara@example.com', phone: '015 222 333', city: 'Siem Reap' },
  { id: 3, name: 'Rika Lyna', email: 'rina@example.com', phone: '017 444 555', city: 'Battambang' },
];

function Customers() {
  return (
    <div className="card table-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-1">Customers</h4>
            <p className="text-muted mb-0">Sample customer records for layout preview.</p>
          </div>
          <span className="badge text-bg-primary">Static</span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;
