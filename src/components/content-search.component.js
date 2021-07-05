import React, { Component } from 'react';
import ContentDataService from '../services/content.service';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer, GridColDef } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { styles } from '../css-common'
import { TextField, Button, Chip, IconButton, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

class ContentSearch extends Component {
  constructor(props) {
    super(props);
    this.onChangeTopics = this.onChangeTopics.bind(this);

    this.state = {
      topics: null,
      contents: [],
      sampleTopics: [
        "Image Classfication", "Cancer", "Wine", "GPU", "pandas", "Classfication", "Education", "Data Visualization", "numpy", "bussiness", "JSON", "CSV", "Image", "CT Scan", "X-ray", "DCOM"
      ]
    };
  }

  componentDidMount() {
    this.onChangeTopics();
  }

  onChangeTopics(event, value) {
    this.setState({
      topics: value
    });
    ContentDataService.findByTopics(this.state.topics)
      .then(response => {
        this.setState({
          contents: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


  render() {
    const { classes } = this.props
    const { contents, sampleTopics } = this.state;
    const checkKeysUnderObject = (obj, result) => {
      for (let key in obj) {
        if (key) {
          result.push(obj[key].username);
        }
      }
    };
    const columns = [
      { field: 'id', headerName: 'ID', width: 100},
      { field: 'description', headerName: 'Name', width: 150},
      { field: 'source', headerName: 'Source', width: 200},
      { field: 'language', headerName: 'Language', width: 170},
      { field: 'type', headerName: 'Type', width: 200},
      { field: 'topics', headerName: 'Topics', width: 200}
    ];
    return (
      <div>
      <Autocomplete
        multiple
        id="topics-filled"
        options={sampleTopics.map((option) => option)}
        freeSolo
        onChange={this.onChangeTopics}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params}
            margin="normal"
            variant="outlined"
            label="Search Topics"
            placeholder="Search Topics"
            fullWidth
            required
          />
        )}
      />
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
            columns={columns}
            rows={contents}
            pageSize={10}
            components={{
              Toolbar: this.CustomToolbar,
            }}
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(ContentSearch)
