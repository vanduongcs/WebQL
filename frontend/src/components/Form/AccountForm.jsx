import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FieldCustome from '../FieldCustome/FieldCustome.jsx';

function AccountForm({ columnsCanEdit, formStates, pageContent, handleAdd, handleUpdate, isEditing, resetForm }) {
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 4px 10px rgba(243, 243, 243, 0.31)' : 12,
        p: '10% 10%',
        minHeight: '88.75%',
        textAlign: 'center',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Quản lý {pageContent}
        </Typography>

        {/* Auto-generated fields */}
        {columnsCanEdit.map(({ key, label, type, options, multiple }) => (
          <FieldCustome
            key={key}
            label={label}
            val={formStates[key]}
            func={formStates['Set' + key]}
            type={type}
            options={options || []}
            multiple={multiple}
          />
        ))}

        <Button sx={{ mt: '20px', width: '50%' }} onClick={handleAdd} variant="contained" disabled={isEditing}>
          Thêm
        </Button>

        <Button sx={{ mt: '10px', width: '50%' }} onClick={handleUpdate} variant="contained" color="success" disabled={!isEditing}>
          Cập nhật
        </Button>

        <Button sx={{ mt: '10px', width: '50%' }} onClick={resetForm} variant="contained" color="error">
          Hủy
        </Button>
      </Box>
    </Box>
  );
}

export default AccountForm;