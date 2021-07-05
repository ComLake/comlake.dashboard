import React, { Component } from "react";
import FileDataService from "../services/file.service";

import { Link } from 'react-router-dom';
import { styles } from "../css-common"
import { Divider, Card, CardHeader, CardContent, Button, CardActions, Chip, Paper, Typography, withStyles } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';
import TitleIcon from '@material-ui/icons/Title';
import LinkIcon from '@material-ui/icons/Link';
import LanguageIcon from '@material-ui/icons/Language';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileDownload from "js-file-download";
import PersonIcon from '@material-ui/icons/Person';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from "@material-ui/icons/Edit";

class File extends Component {
    constructor(props) {
        super(props);

        this.getFile = this.getFile.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);

        this.state = {
            currentFile: {
                id: null,
                name: "",
                source: "",
                language: "",
                owner: "",
                createdBy: "",
                createdDate: null,
                lastModifiedBy: "",
                lastModifiedDate: null,
                topics: []
            }
        };
    }

    componentDidMount() {
        this.getFile(this.props.match.params.id);
    }

    getFile(id) {
        FileDataService.get(id)
            .then(response => {
                this.setState({
                    currentFile: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    async downloadFile(id) {
      FileDataService.download(id)
          .then(response => {
            FileDownload(response.data, this.state.currentFile.name);
          })
          .catch(e => {
              console.log(e);
          });
    }

    deleteFile() {
        FileDataService.delete(this.state.currentFile.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/content')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentFile } = this.state;
        const { classes } = this.props

        return (
          <div>
            {currentFile && (
                <Card>
                <CardHeader
                  title={"Details of File #" + currentFile.id}
                  />
                <CardContent>
                    <List aria-labelledby="Details">
                      <ListItem>
                       <ListItemAvatar>
                        <Avatar>
                          <TitleIcon />
                        </Avatar>
                      </ListItemAvatar>
                       <ListItemText primary="Name" secondary={currentFile.name} />
                      </ListItem>

                      <ListItem>
                       <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                       <ListItemText primary="Created By" secondary={currentFile.createdBy} />
                      </ListItem>

                      <ListItem>
                       <ListItemAvatar>
                        <Avatar>
                          <LinkIcon />
                        </Avatar>
                      </ListItemAvatar>
                       <ListItemText primary="Source" secondary={currentFile.source} />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                         <Avatar>
                          <LanguageIcon />
                         </Avatar>
                       </ListItemAvatar>
                       <ListItemText primary="Language" secondary={currentFile.language} />
                      </ListItem>
                    </List>
                    <Paper variant="outlined" component="ul" className={classes.chipContainer}>
                      {currentFile.topics.map((data, index) => (
                          <li key={index}>
                            <Chip
                              icon={<LabelIcon />}
                              label={data}
                              className={classes.chip}
                            />
                          </li>
                      ))}
                    </Paper>
                    <Typography variant="h5" component="h5">
                      Permissions on this file
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                     color="primary"
                     type="submit"
                     className={classes.button}
                     startIcon={<GetAppIcon />}
                     onClick={() => this.downloadFile(currentFile.id)}
                   >
                     Download
                   </Button>
                   <Button
                     color="primary"
                     aria-label="Edit File"
                     className={classes.button}
                     component={Link} to={"/files/" + currentFile.id + "/edit"}
                     startIcon={<EditIcon />}
                   >
                    Edit
                   </Button>
                    <Button
                     color="secondary"
                     className={classes.button}
                     startIcon={<DeleteIcon />}
                     onClick={this.deleteFile}
                   >
                     Delete
                   </Button>
                </CardActions>
                </Card>
            )}
          </div>
        );
    }
}

export default withStyles(styles)(File)
