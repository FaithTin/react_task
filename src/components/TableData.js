import React from "react";
import {  Button, Table, TableBody,
          TableCell, TableContainer,TableHead,
          TableRow, Paper, TablePagination,
          Checkbox, TableFooter,
         } from "@mui/material";
import { makeStyles } from "@mui/styles";        


const useStyles = makeStyles({
  table: {
    widows: "100%",
  },
  viewButtonColor: {
    background: "green",
    borderRadius: 1,
    color: "white",
  },
});

function TableData(props) {
  const rows = props.arrayData;

  const classes = useStyles();

  const editButton = () => {
    return (
      <Button variant="outlined">
        Edit
      </Button>
    );
  };
  const viewButton = () => {
    return (
      <Button variant="contained">
        View
      </Button>
    );
  };
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const emptyRows =
    page > 0 ? Math.max.apply(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table}aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell><Checkbox size="small"/></TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Full name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone number</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Job title</TableCell>
                        <TableCell>ListId</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                        ? rows.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
                        : rows
                        ).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell><Checkbox size="small"/></TableCell>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.phoneNumber}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>{row.jobTitle}</TableCell>
                            <TableCell>{row.listId}</TableCell>
                            <TableCell>{editButton()}</TableCell>
                            <TableCell>{viewButton()}</TableCell>
                        </TableRow>
                        ))}
                        {emptyRows > 0 && (
                        <TableRow style={{ height:49*emptyRows}}>
                          <TableCell col={10}/> : null
                        </TableRow>
                        )}
                    </TableBody> 
                <TableFooter>
                  <TableRow>
                  <TablePagination
                    count={rows.length}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}                  
                  /> 

                  </TableRow>
                </TableFooter>					
                </Table>

                
            </TableContainer>
        </React.Fragment>   
    
  );
}

export default TableData;
