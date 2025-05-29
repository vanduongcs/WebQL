// MUI
import Box from '@mui/material/Box' 
import Table from '@mui/material/Table' 
import TableContainer from '@mui/material/TableContainer' 

// Custome
import FormC from '../FormC.jsx'
import TableBodyC from '../TableBodyC.jsx'
import TableHeaderC from '../TableHeaderC.jsx'

function PageComponent({ columns, clearEditing, handleEdit, items, editingItem, fetchItems, routeAddress, funcTable, funcAdd, funcEdit, pageContent }) {
  return (
    <Box 
      sx={{
        width: '100%',
        minHeight: '100vh',
        overflow: 'auto'
      }}
    >
      <Box sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: (theme) => theme.palette.background.default,
        p: '2%'
      }}>
        {/* Left table */}
        <Box sx={{
          flex: { md: 3 },
          width: { xs: '100%', md: 'auto' }, 
          height: 'auto',
          m: '20px 20px 0 0'
        }}>
          <TableContainer sx={{ boxShadow: 4, borderRadius: '4px', maxHeight: '100%' }}>
            <Table sx={{ width: '100%', bgcolor: (theme) => theme.palette.background.paper }}>
              <TableHeaderC header={ columns }/>
              <TableBodyC
                input={items}
                editFunc={handleEdit}
                fetchFunc={fetchItems}
                columns={columns}
                routeAddress={ routeAddress }
                funcTable={ funcTable }
                pageContent = { pageContent }
              />
            </Table>
          </TableContainer>
        </Box>

        {/* Right Form */}
        <Box
          sx={{
            flex: { md: 0.5 },
            width: { xs: '100%', md: 'auto' }, 
            minWidth: { md: '300px' },
            height: 'auto',
            mt: '20px',
            boxShadow: 4,
            borderRadius: '4px',
            backgroundColor: (theme) => theme.palette.background.paper,
            p: '18px'
          }}>
          <FormC 
            routeAddress={ routeAddress }
            editingItem={ editingItem }
            clearEditing={ clearEditing }
            fetchFunc={ fetchItems }
            pageContent = { pageContent }
            funcAdd = { funcAdd }
            funcEdit = { funcEdit }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default PageComponent
