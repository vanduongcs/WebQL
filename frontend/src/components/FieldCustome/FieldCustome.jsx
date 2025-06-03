import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

function FieldCustome({ label, val, func, type, options, multiple, onChange }) {
  // Log warning if options is invalid for select
  if (type === 'select' && (!options || !Array.isArray(options))) {
    console.warn(`FieldCustome: Invalid or missing options for ${label}. Expected an array, got:`, options);
    return (
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>{label}</InputLabel>
        <Select disabled label={label}>
          <MenuItem value="">No options available</MenuItem>
        </Select>
      </FormControl>
    );
  }

  const handleChange = (event) => {
    func(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  // Handle select fields (single or multiple)
  if (type === 'select') {
    const safeValue = multiple
      ? (Array.isArray(val) ? val : [])
      : (options.some(opt => opt.value === val) ? val : '');

    return (
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple={multiple}
          value={safeValue}
          onChange={handleChange}
          label={label}
          renderValue={(selected) =>
            multiple
              ? selected
                  .map((id) => options.find((option) => option.value === id)?.label || 'Unknown')
                  .join(', ')
              : options.find((option) => option.value === val)?.label || ''
          }
        >
          {options.map((option, index) => (
            <MenuItem key={option.value || `fallback-${index}`} value={option.value}>
              {multiple && <Checkbox checked={safeValue.includes(option.value)} />}
              <ListItemText primary={option.label || 'Unknown'} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  // Handle date fields
  if (type === 'date') {
    const formattedValue = val instanceof Date
      ? val.toISOString().slice(0, 10)
      : (typeof val === 'string' && val.match(/^\d{4}-\d{2}-\d{2}$/)
        ? val
        : '');

    return (
      <TextField
        fullWidth
        label={label}
        value={formattedValue}
        onChange={(e) => func(e.target.value)}
        sx={{ mt: 2 }}
        type="date"
        InputLabelProps={{ shrink: true }}
      />
    );
  }

  // Handle other fields (text, number, array)
  return (
    <TextField
      fullWidth
      label={label}
      value={val || ''}
      onChange={(e) => func(e.target.value)}
      sx={{ mt: 2 }}
      type={type === 'number' ? 'number' : type === 'array' ? 'text' : type}
    />
  );
}

export default FieldCustome;