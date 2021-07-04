import React, { Component } from "react";
import FileDataService from "../services/file.service";

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

        this.saveFile = this.saveFile.bind(this);

        this.state = {
            id: null,
            name: "",
            source: "",
            topics: null,
            language: "",

            sampleTopics: [
              "Image Classfication", "Cancer", "Wine", "GPU", "pandas", "Classfication", "Education", "Data Visualization", "numpy", "bussiness", "JSON", "CSV", "Image", "CT Scan", "X-ray", "DCOM"
            ],

            files: [],
            submitted: false
        };
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

    saveFile() {
        var data = {
            source: this.state.source,
            topics: this.state.topics,
            language: this.state.language
        };

        FileDataService.create(data)
            .then(response => {
                this.setState({
                    source: response.data.source,
                    topics: response.data.topics,
                    language: response.data.language,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { classes } = this.props
        const { sampleTopics, files } = this.state;
        console.log(files);
        return (
            <React.Fragment>
                <Card>
                <CardHeader
                  title="Create File"
                  />
                <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6} lg={6}>
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
                          onClick={this.saveFile}>
                          Submit
                      </Button>
                    </CardActions>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddFile)
