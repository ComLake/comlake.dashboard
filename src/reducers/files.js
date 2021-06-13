import {
  RETRIEVE_FILES,
  UPDATE_FILE,
  DELETE_FILE
} from "../actions/types";

const initialState = [];

function fileReducer(files = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_FILES:
      return payload;

    case UPDATE_FILE:
      return files.map((file) => {
        if (file.id === payload.id) {
          return {
            ...file,
            ...payload,
          };
        } else {
          return file;
        }
      });

    case DELETE_FILE:
      return files.filter(({ id }) => id !== payload.id);

    default:
      return files;
  }
};

export default fileReducer;
