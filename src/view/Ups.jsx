import React, { Component } from 'react';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import { Fab, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BusinessIcon from '@material-ui/icons/Business';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import {
    Button,
    List,
    ListItem,
    ListSubheader,
    ListItemText,
    ListItemIcon
  } from "@material-ui/core";



  var  UpsArray = []



 


class Ups extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            ups: UpsArray,
            //NumSerie: UpsArrayNumSerie,
            newState: false,
            edit:false,
            idUps:0,

        };

    }
    state = {};

    
    //cons data = {};
    titulo = "LISTA DE UPS";


  frmModelUps = React.createRef();
  frmNumSerie = React.createRef();
  frmStatus = React.createRef();
  frmBaterias = React.createRef();
  
  

  addUps = event => {
    event.preventDefault();
    
    var newUps = this.state;
    //var newNumSerie = this.state

    

    const data = {
        Modelo: this.frmModelUps.value,
        NumSerie: this.frmNumSerie.value,
        Status: this.frmStatus.value,
        Baterias: this.frmBaterias.value
    };

    if(!this.state.edit) {
        newUps.ups.push(data);
        newUps.ups.sort();
        
        this.frmModelUps.value = "";
        this.frmModelUps.focus();
    
        this.frmNumSerie.value = "";
        this.frmStatus.value = "";
        this.frmBaterias.value = "";
    }
    else {
        newUps.ups[this.state.id] = data;
        newUps.edit = false;
        newUps.id = 0;
        
    }
   

    this.setState({newUps}); 
  }

  viewUps = (id) => event => {
    event.preventDefault();

    this.frmModelUps.value = "";
    this.frmModelUps.focus();
    this.frmModelUps.value = this.state.ups[id];

    this.frmNumSerie.value= this.state.ups[id];
    this.frmNumSerie.focus();

    this.frmStatus.value= this.state.ups[id];
    this.frmBaterias.focus();


  }

  editUps = (id, row ) => (event) => {
    event.preventDefault();
    console.log("Editar Area");
    console.log(id);

    var newState = this.state;
    newState.edit = true;
    newState.id = id;

    this.setState(newState);

    this.frmModelUps.focus();
    this.frmModelUps.value = this.state.ups[row].Modelo;
    this.frmNumSerie.value = this.state.ups[row].NumSerie;
    this.frmStatus.value = this.state.ups[row].Status;
    this.frmBaterias.value = this.state.ups[row].Baterias;
  }



  deleteUps = (id) => event => {
    event.preventDefault();
    console.log("Borrar ups");
    console.log(id);

    this.frmModelUps.value = "";
    this.frmModelUps.focus();

    this.frmNumSerie.value = "";
    this.frmStatus.value = "";
    this.frmBaterias.value = "";

    
    delete this.state.ups[id];

    var newUps = this.state.ups;
    this.setState({ area: newUps});
  }
/*
  deleteUps = (id) => event => {
    event.preventDefault();

    const url ='http://localhost:5001/api/alumnos/'+id;

  
    
    this.loadAlumno();
    
    console.log(url);
}  

loadUps () {

    axios.get('http://localhost:5001/api/upss')
    .then(res => {
      //const emps = res.data;
      this.setState({ Ups2: res.data });
      console.log(res.data);
    })
*/

    render() { 
        return ( 
            <div className="App-header2">
                <Link to="/">
                    <Button
                        variant="contained"
                        color="default"
                        size="small"
                        startIcon={<HomeIcon />}
                    >
                    Regresar
                    </Button>
                </Link>
                <form autoComplete="off" onSubmit={this.addUps}>    
                    <TextField
                        label="Modelo"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        inputRef={e => (this.frmModelUps = e)}
                    />
                    &nbsp;&nbsp;&nbsp;
                     <TextField
                        label="Status UPS"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        inputRef={e => (this.frmNumSerie  = e)}
                    />
                     &nbsp;&nbsp;&nbsp;
                     <TextField
                        label="% Bateria"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        inputRef={e => (this.frmStatus  = e)}
                    />
                     &nbsp;&nbsp;&nbsp;
                     <TextField
                        label="Num. Serie"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        inputRef={e => (this.frmBaterias  = e)}
                    />
                


                    <Fab
                    color="primary"
                    size="medium"
                    //className="dish-form-icon"
                    onClick={this.addUps}
                    >
                    <AddIcon />
                    </Fab>
                    
            
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">{ this.titulo }</ListSubheader>}
                    >
                    {this.state.ups.map((ups, index) => (
                        <ListItem button key={index}>
                            <ListItemIcon onClick={this.viewUps(index)}>
                                <BusinessIcon />
                            </ListItemIcon>
                            <ListItemText inset primary={ups.Modelo} />
                            <ListItemText inset primary={ups.NumSerie} />
                            <ListItemText inset primary={ups.Status} />
                            <ListItemText inset primary={ups.Baterias} />
                            
                            <ListItemIcon 
                            onClick={this.editUps(index, index)}>
                                <EditIcon />
                                
                            </ListItemIcon>
                            <ListItemIcon onClick={this.deleteUps(index)}>
                                <DeleteIcon />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
             </form>
            </div>
         );
    }
}
 
export default Ups;