import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Checkbox } from "@material-ui/core";
import {Pagination} from "antd";
import { type } from "@testing-library/user-event/dist/type";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const App = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState('');
  const [page, setPage] =useState(1);
  const [postsPerPage, setPostsPerPage] = useState(25)
  
useEffect(() => {
  const loadPosts = async () =>{
    const response = await axios.get(
      "http://malih-auth.ap-southeast-2.elasticbeanstalk.com/campaign/getAllUploadedEmails/listId/480");
      console.log(response)
      setPosts(response.data);
      setTotal(response.data.length); 
  };
    loadPosts();

},[]);

  const editButton=() => {
    return (
      <div>
        <button color="green">
          Edit
        </button>
      </div>
    );
  };

  const viewButton =() => {
    return (
      <button>
        View
      </button>
    );
  };

  const indexOfLastPage = page + postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);

  const onShowSizeChange = (current, pageSize) => {
    setPostsPerPage(pageSize);
  };
  
  const itemRender =(current,type, originalElement) => {
    if(type === 'prev'){
      return <a>Prev</a>
    }

    if(type === 'next'){
      return <a>Next</a>
    }

    return originalElement;
  }

  return (
    <div className="App">
      
      <h1>DataTable</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
            <Checkbox checkboxselection='true' size='medium'/>
              <StyledTableCell> ID</StyledTableCell>
              <StyledTableCell> Email</StyledTableCell>
              <StyledTableCell> Name</StyledTableCell>
              <StyledTableCell> PhoneNumber</StyledTableCell>
              <StyledTableCell> Address</StyledTableCell>
              <StyledTableCell> JobTitle</StyledTableCell>
              <StyledTableCell> ListId</StyledTableCell>
              <StyledTableCell> Edit</StyledTableCell>
              <StyledTableCell> View</StyledTableCell>             
            </TableRow>
          </TableHead>
          <TableBody>
            
            {posts              
             .map((row) => {
                return (                  
                  <StyledTableRow key={row.id}>
                    <Checkbox checkboxselection='true' size='medium' />
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell> {row.name}</StyledTableCell>
                    <StyledTableCell> {row.phoneNumber}</StyledTableCell>
                    <StyledTableCell> {row.address}</StyledTableCell>
                    <StyledTableCell> {row.jobTitle}</StyledTableCell>
                    <StyledTableCell> {row.listId}</StyledTableCell>
                    <StyledTableCell> {editButton() }</StyledTableCell>
                    <StyledTableCell align='right'> 
                      {viewButton()}</StyledTableCell>                   
                  </StyledTableRow>
                );
              })}
          </TableBody>
            
        </Table>
      </TableContainer>
        {currentPosts.map((post) => (
          <h3 key={post.id}>{post.body}</h3>
        ))}
        <Pagination
        onChange={(value) => setPage(value)}
        pageSize={postsPerPage}
        total={posts.length}
        current={page}
        showSizeChanger
        showQuickJumper
        onShowSizeChange={onShowSizeChange}
        itemRender={itemRender}
        />
    </div>
  );
};

export default App;