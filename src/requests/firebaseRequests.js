import {firebaseStorage} from "../config/base";
import {
    exchangeURLToFileDirectory
} from "../utils";
import { v4 as uuidv5 } from 'uuid';

const storage = firebaseStorage;
var storageRef = storage.ref();

export const deleteFileFirebase = async (urlString) => {
    const directoryString = exchangeURLToFileDirectory(urlString)
    var fileRef = storageRef.child(directoryString);
    await fileRef.delete()
}

export const uploadImageFirebase = async (file) => {
    const storageRef = storage.ref();
    //const newID = `${uuidv5()}-${file.name}`;
    const newID = `${uuidv5()}`;
    const fileRef = storageRef.child(`cover-images/${newID}`)
    await fileRef.put(file)
    const returnedURL = await fileRef.getDownloadURL()
    return returnedURL;
}

export const uploadDocumentFirebase = async (file) => {
    const storageRef = storage.ref();
    //const newID = `${uuidv5()}-${file.name}`;
    const newID = `${uuidv5()}`;
    const fileRef = storageRef.child(`documents/${newID}`)
    await fileRef.put(file)
    const returnedURL = await fileRef.getDownloadURL()
    return returnedURL;
}
