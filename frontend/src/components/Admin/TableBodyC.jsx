import { TableRow, TableBody, TableCell } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

const changeTimeType = (timeStr) => {
  return new Date(timeStr).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

function TableBodyC({ input, editFunc, fetchFunc, columns, routeAddress, funcTable, pageContent }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2025/api/${ routeAddress }/${ funcTable }/${id}`);
      fetchFunc();
    } catch (error) {
      console.error(`Lỗi khi xóa ${ pageContent }:`, error.response?.data || error.message);
    }
  };

  const iconStyle = {
    color: (theme) => theme.palette.text.primary,
    cursor: 'pointer'
  };

  const renderCell = (row, col) => {
    if (col.isAction === 'edit') {
      return <EditIcon sx={iconStyle} onClick={() => editFunc(row)} />;
    }

    if (col.isAction === 'delete') {
      return <DeleteIcon sx={iconStyle} onClick={() => handleDelete(row._id)} />;
    }

    const value = row[col.key];

    if (col.isDate) {
      return changeTimeType(value);
    }

    return value;
  };

  return (
    <TableBody>
      {input.map((row) => (
        <TableRow key={row._id}>
          {columns.map((col) => (
            <TableCell key={col.label}>
              {renderCell(row, col)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}


export default TableBodyC
