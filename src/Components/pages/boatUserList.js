import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
import { useEffect } from 'react';
import { boat_detail, boat_list, boat_user_list, user_list } from '../../api/api';
import { useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function CollapsibleTable({ boatList }) {
    const navigate = useNavigate()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - boatList?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    return (
      <Collapse in={Boolean(boatList)} timeout="auto" unmountOnExit sx={{ minWidth: 500 }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>           
                <TableRow className='text-nowrap'>               
                    <TableCell sx={{fontWeight:600}} align="right">Boat ID</TableCell>             
                    <TableCell sx={{fontWeight:600}} align="right">Boat Name</TableCell>             
                    <TableCell sx={{fontWeight:600}} align="right">Boat Type</TableCell>             
                    <TableCell sx={{fontWeight:600}} align="right">Boat Year</TableCell>             
                    <TableCell sx={{fontWeight:600}} align="right">Boat Maximum Capacity</TableCell>             
                    <TableCell sx={{fontWeight:600}} align="right">Boat Length</TableCell>                     
                </TableRow>         
            </TableHead>
            <TableBody>
                {(rowsPerPage > 0
                ? boatList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : boatList
                ).map((row) => (
                    <>
                <TableRow 
                key={row?.user_id} 
                className='text-nowrap'
                onClick={()=>{navigate('/panel/boatViewDetails',{state:{boat_id:row?.boat_id}})}}
                >
                    <TableCell align="right">
                    {row?.boat_id}
                    </TableCell>
                    <TableCell align="right">
                    {row?.boat_name}
                    </TableCell>
                    <TableCell align="right">
                    {row?.boat_type}
                    </TableCell>
                    <TableCell align="right">
                    {row?.boat_year}
                    </TableCell>
                    <TableCell align="right">
                    {row?.boat_max_capacity}
                    </TableCell>
                    <TableCell align="right">
                    {row?.boat_length}
                    </TableCell>
                </TableRow>
                </>
                ))}
                {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow className='text-nowrap'>
                <TablePagination
                    sx={{
                    ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
                        margin: 0,
                    }
                    }}
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={boatList?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    inputMode={{
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
                </TableRow>
            </TableFooter>
        </Table>
      </Collapse>
    );
  }

const BoatUserList = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [boatUserList, setBoatUserList] = useState([])
  const [boatList,setBoatList] = useState([])
  const [expand, setExpand] = useState(false)
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(()=>{
    setLoading(true)
    boat_user_list()
    .then((res)=>{
      if(res?.data?.success){
        setBoatUserList(res?.data?.data)
        setLoading(false)
      }
      else{
        console.log('userlist err')
        setLoading(false)
      }
    })
    .catch((err)=>{
      console.log('user_list_api_err',err)
      setLoading(false)
    })
  },[])

  console.log('boat list',boatList)

  const handleShowBoat = (id) =>{
    setLoading(true)
    setExpandedRow(id)
    let payload = {
      user_id : id
    }
    console.log(payload,'id')
    boat_list(payload)
    .then((res)=>{
      console.log('boat list',res?.data)
      if(res?.data?.success){
        setBoatList(res?.data?.data)
        setExpand(!expand)
        setLoading(false)
      } else {
        console.log('boat list err')
        setLoading(false)
      }
    })
    .catch((err)=>{
      console.log('boat_detail_api_err',err)
      setLoading(false)
    })
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - boatUserList?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <div>
    {loading? <Loader loading={loading}/>:null}
      <span className='h3 ps-3'>Boat User List</span>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>           
          <TableRow className='text-nowrap'> 
            <TableCell sx={{fontWeight:600}} align="right"></TableCell>               
            <TableCell sx={{fontWeight:600}} align="right">User ID</TableCell>             
            <TableCell sx={{fontWeight:600}} align="right">First Name</TableCell>             
            <TableCell sx={{fontWeight:600}} align="right">Last Name</TableCell>             
            <TableCell sx={{fontWeight:600}} align="right">Email ID</TableCell>             
            <TableCell sx={{fontWeight:600}} align="right">City</TableCell>             
            <TableCell sx={{fontWeight:600}} align="right">Phone Number</TableCell>            
            <TableCell sx={{fontWeight:600}} align="right">Country Code</TableCell>             
            <TableCell sx={{fontWeight:600}} align="right">User Type</TableCell>           
          </TableRow>         
        </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? boatUserList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : boatUserList
            ).map((row) => (
                <>
              <TableRow key={row?.user_id} className='text-nowrap'>
                <TableCell align="right">
                  <IconButton
                  onClick={()=>handleShowBoat(row?.user_id)}
                  >
                      <KeyboardArrowDown 
                      style={{
                        transform: `rotate(${expand && row.user_id === expandedRow? 180:0}deg)`
                    }}
                      />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {row?.user_id}
                </TableCell>
                <TableCell align="right">
                  {row?.first_name}
                </TableCell>
                <TableCell align="right">
                  {row?.last_name}
                </TableCell>
                <TableCell align="right">
                  {row?.email}
                </TableCell>
                <TableCell align="right">
                  {row?.city}
                </TableCell>
                <TableCell align="right">
                  {row?.phone_number}
                </TableCell>
                <TableCell align="right">
                  {row?.country_code}
                </TableCell>
                <TableCell align="right">
                  {row?.user_type}
                </TableCell>
              </TableRow>
              {expandedRow === row?.user_id && expand && (
                <TableCell colSpan={6}>
                    <CollapsibleTable boatList={boatList} colSpan={10}/>
                </TableCell>
              )}
              </>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow className='text-nowrap'>
              <TablePagination
                sx={{
                  ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
                    margin: 0,
                  }
                }}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={boatUserList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                inputMode={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}

export default BoatUserList