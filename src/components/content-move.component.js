import React, { Component } from "react";
import ContentDataService from "../services/content.service";

import { Card, CardHeader, CardContent, CardActions, TextField, Button, Chip, withStyles } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';
import { Autocomplete } from '@material-ui/lab';

import { styles } from "../css-common"

class MoveContent extends Component {
    constructor(props) {
        super(props);
        this.onChangeFolderId = this.onChangeFolderId.bind(this);
        this.onChangeFileId = this.onChangeFileId.bind(this);
        this.onChangeSubfolderId = this.onChangeSubfolderId.bind(this);

        this.moveFile = this.moveFile.bind(this);

        this.state = {
            id: null,
            folderId: "",
            fileId: "",
            subfolderId: "",

            submitted: false
        };
    }


    onChangeFolderId(e) {
        this.setState({
            folderId: e.target.value
        });
    }

    onChangeFileId(e) {
        this.setState({
            fileId: e.target.value
        });
    }

    onChangeSubfolderId(e) {
        this.setState({
            subfolderId: e.target.value
        });
    }

    moveFile() {
        ContentDataService.addFileToFolder(this.state.folderId, this.state.fileId)
            .then(response => {
                this.setState({
                    submitted: true
                });
                this.props.history.push("/content");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
              <Card>
              <CardHeader
                title="Move"
                />
              <CardContent>
                  <div>
                      <TextField
                          label="FolderId"
                          folderId="folderId"
                          variant="outlined"
                          margin="normal"
                          classFolderId={classes.textField}
                          value={this.state.folderId}
                          onChange={this.onChangeFolderId}
                          required
                      />
                  </div>
                  <div>
                      <TextField
                          label="FileId"
                          folderId="fileId"
                          variant="outlined"
                          margin="normal"
                          classFolderId={classes.textField}
                          value={this.state.fileId}
                          onChange={this.onChangeFileId}
                          required
                      />
                  </div>
                  <div>
                      <TextField
                          label="SubfolderId"
                          folderId="subfolderId"
                          variant="outlined"
                          margin="normal"
                          classFolderId={classes.textField}
                          value={this.state.subfolderId}
                          onChange={this.onChangeSubfolderId}
                      />
                  </div>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={this.moveFile}>
                        Submit
                    </Button>
                  </CardActions>
              </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MoveContent)
