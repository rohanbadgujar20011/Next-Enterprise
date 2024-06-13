// app/components/DataTable.js
import Link from 'next/link';
import React from 'react';
import useProductStore from '@/app/store/productStore';
import axios from 'axios';

const DataTable = ({ cols = [], rows = [] }) => {
  const { deleteProduct } = useProductStore();

  const handlerDelete = async (id) => {
    if (confirm('Are you sure you want to delete')) {
      try {
        const res = await axios.delete(`/api/${id}`);
        if (res.status !== 200) {
          throw new Error('Couldn\'t delete');
        }
        deleteProduct(id);
        alert(res.data.message);
      } catch (error) {
        alert('Error deleting');
      }
    }
  };

  return (
    <table className="table">
      <thead>
        <tr className="table-primary">
          {cols.map((th, i) => (
            <th key={i}>{th}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((tr, i) => (
          <tr key={i}>
            <td>{tr?._id}</td>
            <td>{tr?.title}</td>
            <td>{tr?.description.substring(0, 40).concat('...')}</td>
            <td>{tr?.price}</td>
            <td>
              <div className="d-flex gap-1">
                <Link className="btn btn-info btn-sm" href={`../view/${tr?._id}`}>
                  View
                </Link>
                <Link className="btn btn-warning btn-sm" href={`../edit/${tr?._id}`}>
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handlerDelete(tr?._id)}>
                  Trash
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
