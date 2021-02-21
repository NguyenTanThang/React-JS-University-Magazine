import JSZip from "jszip";
import { saveAs } from 'file-saver';
import axios from 'axios';
import {parseDateMoment} from "./";

export function get_url_extension( url ) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

export const exchangeURLToFileDirectory = (url) => {
    var uri = url;
    var enc = encodeURI(uri);
    var dec = decodeURI(enc);
    var tempUrl = dec.replace(/%20/g, " ");
    tempUrl = tempUrl.replace(/%2F/g, "/");
    tempUrl = tempUrl.replace(/%23/g, "#");
    tempUrl = tempUrl.split("?")[0].split("/o/")[1];
    return tempUrl;
}

export const zipTheFiles = async (contributions) => {
    var zip = new JSZip();
    const currentDateString = parseDateMoment(Date.now());
    var zipFilename = `UoG_Magazine_${currentDateString}.zip`;

    for (let i = 0; i < contributions.length; i++) {
        const contribution = contributions[i];
        const urls = [
            contribution.docFileURL,
            contribution.imageFileURL,
        ];
        
        for (let j = 0; j < urls.length; j++) {
            const url = urls[j];
            const extension = get_url_extension(url);
            const {contributor, created_date} = contribution;
            const {email, username} = contributor;
            //var folderName = zip.folder(``);
            var filename = `${email}_${username}_${parseDateMoment(created_date)}/${email}_${username}_${parseDateMoment(created_date)}.${extension}`;
            // loading a file and add it in a zip file
    
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
                headers: {
                    //"Access-Control-Allow-Origin": "*"
                }
            })
    
            console.log(response.data);
            
            const base64URL = Buffer.from(response.data, 'binary').toString('base64');

            console.log(base64URL);
    
            zip.file(filename, base64URL, {
                base64: true
            });
        }
    }

    var zipFile = await zip.generateAsync({
        type: "blob"
    });
    saveAs(zipFile, zipFilename);
}