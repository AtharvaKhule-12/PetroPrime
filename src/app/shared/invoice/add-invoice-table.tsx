import React, { ChangeEvent, useState } from 'react';

interface Row {
  name: string;
  age: string;
}

const AddInvoiceTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([{ name: '', age: '' }]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const values = [...rows];
    if (e.target.name === 'name') {
      values[index].name = e.target.value;
    } else {
      values[index].age = e.target.value;
    }
    setRows(values);
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', age: '' }]);
  };

  const handleSubmit = () => {
    console.log(rows);
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <div>
        {rows.map((row, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={row.name}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              type="text"
              name="age"
              value={row.age}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        ))}
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddInvoiceTable;
