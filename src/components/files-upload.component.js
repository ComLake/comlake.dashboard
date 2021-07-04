import React, { Component } from "react";
import FileDataService from "../services/file.service";
import FolderDataService from "../services/folder.service";
import ContentDataService from "../services/content.service";

import { Grid, Card, CardHeader, CardContent, CardActions, TextField, Button, Chip, withStyles } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';
import { Autocomplete } from '@material-ui/lab';
import { DropzoneArea } from 'material-ui-dropzone';

import { styles } from "../css-common"

class AddFile extends Component {
    constructor(props) {
        super(props);
        this.onChangeSource = this.onChangeSource.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.onChangeTopics = this.onChangeTopics.bind(this);
        this.onChangeFiles = this.onChangeFiles.bind(this);
        this.onChangeFolder = this.onChangeFolder.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.retrieveFolders = this.retrieveFolders.bind(this);
        this.addFileToFolder = this.addFileToFolder.bind(this);

        this.state = {
            id: null,
            name: "",
            source: "",
            topics: null,
            language: "",
            folders: [],
            files: [],
            folderId: null,
            fileId: "",
            message:"",
            isError: false,
            sampleTopics: [
              "Image Classfication", "Cancer", "Wine", "GPU", "pandas", "Classfication", "Education", "Data Visualization", "numpy", "bussiness", "JSON", "CSV", "Image", "CT Scan", "X-ray", "DCOM"
            ],
            submitted: false
        };
    }

    componentDidMount() {
        this.retrieveFolders();
    }

    onChangeFiles(files){
      this.setState({
        files: files
      });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSource(e) {
        this.setState({
            source: e.target.value
        });
    }

    onChangeLanguage(e) {
        this.setState({
            language: e.target.value
        });
    }

    onChangeTopics(event, value) {
      this.setState({
        topics: value
      });
    }


    onChangeFolder(event, value) {
      if (value != null){
        this.setState({
          folderId: value.id
        })
      };
    }

    retrieveFolders() {
      FolderDataService.getAll()
        .then(response => {
          this.setState({
            folders: response.data
          });
        })
        .catch(e => {
          console.log(e);
        });
    }

    addFileToFolder(folderId, fileId){
      ContentDataService.addFileToFolder(folderId, fileId)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }

    uploadFiles() {
        const files = this.state.files;
        const folderId = this.state.folderId;
        let fileId = this.state.fileId;

        files.forEach((file) => {
          console.log(file);
          FileDataService.upload(file, this.state.source, this.state.topics, this.state.language)
            .then((response) => {
              this.setState({
                fileId: response.data.id,
                message: response.data.message,
                isError: false,
                submitted: true
              });
              console.log(response.data);
              console.log("fileId " + this.state.fileId);
              if (folderId != null && this.state.fileId != null){
                ContentDataService.addFileToFolder(folderId, this.state.fileId)
                .then(response => {
                  console.log(response.data);
                })
                .catch(e => {
                  console.log(e);
                });
              }
              // this.props.history.push("/content");
            })
            .catch(() => {
              this.setState({
                message: "Could not upload the file!",
                isError: true
              });
          });
      });
    }

    render() {
        const { classes } = this.props
        const { sampleTopics, files, folders } = this.state;
        return (
            <React.Fragment>
                <Card>
                <CardHeader
                  title="Create File"
                  />
                <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6} lg={6}>
                        <Autocomplete
                          options={folders}
                          getOptionLabel={(folders) => folders.name}
                          onChange={this.onChangeFolder}
                          renderInput={(params) =>
                            <TextField {...params} margin="normal" label="Upload To Folder?" variant="outlined"/>
                          }
                        />
                        <TextField
                            label="Source"
                            name="source"
                            variant="outlined"
                            margin="normal"
                            value={this.state.source}
                            onChange={this.onChangeSource}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Language"
                            name="language"
                            variant="outlined"
                            margin="normal"
                            value={this.state.language}
                            onChange={this.onChangeLanguage}
                            fullWidth
                        />
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
                            label="Topics"
                            placeholder="Topics"
                            required
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <DropzoneArea
                        onChange={this.onChangeFiles}
                        showPreviews={true}
                        showPreviewsInDropzone={false}
                        useChipsForPreview
                        previewGridProps={{container: { spacing: 1, direction: 'row' }}}
                        previewChipProps={{classes: { root: classes.previewChip } }}
                        maxFileSize={1073741824}
                        previewText="Selected file(s)"
                      />
                    </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                      <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={this.uploadFiles}>
                          Submit
                      </Button>
                    </CardActions>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddFile)
