import { Space } from 'antd';
import {Link} from "react-router-dom";

export * from "./dateParser";

export const populateActionButtons = (routeName, record, canView = false) => {
    const recordID = record._id;
    return (
        <>
            {canView ? (
                <Link to={`${routeName}/details/${recordID}`} className="btn btn-primary">
                    <i className="fas fa-eye" aria-hidden="true"></i>
                </Link>
            ): (<></>)}
            <Link to={`${routeName}/edit/${recordID}`} className="btn btn-warning">
                <i className="fas fa-pen"></i>
            </Link>
        </>
    )
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

export const checkIfIn = (key, arr) => {
    key = String(key);
    console.log(key);
    return arr.includes(key);
}

export const capitalizeText = (text) => {
    return text.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

export const convertKeyToText = (key) => {
    return capitalizeText(key.replace(/_/g, ' '));
}

export const filterEpisodes = (episodes, totalEpisode) => {
    return episodes = episodes.filter(episode => {
        const {episodeNum} = episode;
        if (episodeNum > totalEpisode) {
            return false;
        }
        return true
    })
}

export const paginate = (
    totalItems,
    currentPage = 1,
    pageSize = 8,
    maxPages = 5
) => {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage, endPage;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

export const isEpisodeNumOccurred = (episodes, episodeNum) => {
    let ans = false;
    episodes.forEach(episode => {
        if (
            episode.episodeNum == episodeNum
        ) {
            ans = true;
        }
    })
    return ans;
}

export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const getImageDemo = function(file) {
    let ans = "";
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      ans = dataURL;
    };
    reader.readAsDataURL(file);
    return ans;
  };

export const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export const acceptImageExt = (ext) => {
    if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        return true;
    }
    return false;
}

export const acceptDocExt = (ext) => {
    if (ext === "doc" || ext === "docx" || ext === "pdf") {
        return true;
    }
    return false;
}