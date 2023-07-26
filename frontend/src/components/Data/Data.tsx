// EXTERNAL
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Typography } from '@mui/material';

// INTERNAL
import { useGetData } from '../../custom-hooks';
import { serverCalls } from '../../api';
import { UpdateForm } from '../UpdateForm';



const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "title",
        headerName: "Title",
        width: 150,
    },{
        field: "author",
        headerName: "Author",
        width: 150,
    },{
        field: "description",
        headerName: "Description",
        width: 150,
    },{
        field: "first_published",
        headerName: "First Published",
        width: 100,
    },{
        field: "status",
        headerName: "Reading Status",
        width: 150,
        editable: true
    },{
        field: "owned",
        headerName: "Ownership Status",
        width: 150,
        editable: true
    },{
        field: "user_score",
        headerName: "Personal Score",
        width: 100,
        editable: true

    },{
        field: "user_notes",
        headerName: "Personal Notes",
        width: 150,
        editable: true
    }
];


// const rows = [
//     { id: 1, user_token: "filler", cover: "filler", title: "filler", author: "filler", key: "filler", description: "filler", first_published: "filler", status: "filler" , owned: "filler", user_score : "filler", user_notes : "filler"}];

    
export const Data = () => {
    const {libraryData, getData} = useGetData();
    const [gridData, setData] = useState<GridRowSelectionModel>([])
    
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(true);
    };
    const handleClose = () =>{
        setOpen(false);
    };

    const deleteData = () =>{
        serverCalls.delete(`${gridData[0]}`)
        getData()
    };

    const myAuth = localStorage.getItem("myAuth")
    if (myAuth === "true"){
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={libraryData}
          columns={columns}
          initialState={{
            pagination:{
                paginationModel:{
                    pageSize: 5
                }
            }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) => setData(newSelectionModel)}
        />
        <Button onClick={handleOpen}>Update</Button>
                <Button variant="contained" sx={{backgroundColor: "red", "&:hover": { backgroundColor: "black",
            color: "white"
          },}} onClick={deleteData}>Delete</Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update A Work</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Work id: {gridData[0]}</DialogContentText>
                        <UpdateForm id={`${gridData[0]}`} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error">Cancel</Button>
                    </DialogActions>
                </Dialog>
      </div>
        )}else{
            return(
            <Box>
                <Typography variant="h2">
                    You are not authorized to view this page, please sign in. 
                </Typography>
            </Box>
        )
    };
}