import React from 'react';

interface SchemaField {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
  since?: string;
}

interface SchemaFieldTableProps {
  title?: string;
  fields: SchemaField[];
}

export default function SchemaFieldTable({ title, fields }: SchemaFieldTableProps): JSX.Element {
  return (
    <div style={{ overflowX: 'auto' }}>
      {title && <h4>{title}</h4>}
      <table className="schema-field-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.name}>
              <td>
                <code>{field.name}</code>
              </td>
              <td>
                <code>{field.type}</code>
              </td>
              <td>
                {field.required ? (
                  <span style={{ color: '#dc2626', fontWeight: 600 }}>MUST</span>
                ) : (
                  <span style={{ color: '#6b7280' }}>MAY</span>
                )}
              </td>
              <td>{field.description}</td>
              <td>
                {field.example ? <code>{field.example}</code> : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
