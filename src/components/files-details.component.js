import React, { Component } from "react";
import FileDataService from "../services/file.service";
import AclDataService from "../services/acl.service";

import { Link } from 'react-router-dom';
import { styles } from "../css-common"
import { Divider, Card, CardHeader, CardContent, Button, CardActions, Chip, Paper, Typography, withStyles } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
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
        this.getFilePerms = this.getFilePerms.bind(this);

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

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
            },
            perms: [],
            page: 0,
            rowsPerPage: 10
        };
    }

    componentDidMount() {
        this.getFile(this.props.match.params.id);
        this.getFilePerms(this.props.match.params.id);
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

    getFilePerms(id) {
        AclDataService.getByFileId(id)
            .then(response => {
                this.setState({
                    perms: response.data
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

    handleChangePage(event, newPage) {
      this.setState({
        page: newPage
      })
    };

    handleChangeRowsPerPage(event) {
      this.setState({
        rowsPerPage: +event.target.value,
        page: 0
      })
    };


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
        const { currentFile, rowsPerPage, page, perms } = this.state;
        const { classes } = this.props
        const columns = [
          { id: 'targetType', label: 'Type', minWidth: 170 },
          { id: 'targetId', label: 'For', minWidth: 170 },
          { id: 'perm', label: 'Permission', minWidth: 170 },
        ];

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
                          <FolderOpenIcon />
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
                    <Paper className={classes.permContainer}>
                      <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {perms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((perm) => {
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={perm.code}>
                                  {columns.map((column) => {
                                    const value = perm[column.id];
                                    return (
                                      <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={perms.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      />
                  </Paper>

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
