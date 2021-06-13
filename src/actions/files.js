import {
  RETRIEVE_FILES,
  UPDATE_FILE,
  DELETE_FILE
} from "./types";

import FileDataService from "../services/file.service";

export const retrieveFiles = () => async (dispatch) => {
  try {
    const res = await FileDataService.getFiles();

    dispatch({
      type: RETRIEVE_FILES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateFile = (id, data) => async (dispatch) => {
  try {
    const res = await FileDataService.update(id, data);

    dispatch({
      type: UPDATE_FILE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteFile = (id) => async (dispatch) => {
  try {
    await FileDataService.delete(id);

    dispatch({
      type: DELETE_FILE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
