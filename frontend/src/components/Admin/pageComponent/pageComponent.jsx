import Box from '@mui/material/Box';
import TableCustome from '../../Table/TableCustome.jsx';

function PageComponent({ columns, rows, columnsCanEdit, formStates, pageContent, handleAdd, handleDelete, handleEdit, isEditing, handleUpdate, resetForm, FormName }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        minHeight: '85vh',
        width: '100%',
        bgcolor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Table */}
      <Box sx={{ m: '1%', width: '70%' }}>
        <TableCustome
          columns={columns}
          rows={rows}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </Box>

      {/* Form */}
      <Box sx={{ m: '1%', width: '20%' }}>
        <FormName
          formStates={formStates}
          columnsCanEdit={columnsCanEdit}
          pageContent={pageContent}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          isEditing={isEditing}
          resetForm={resetForm}
        />
      </Box>
    </Box>
  );
}

export default PageComponent;