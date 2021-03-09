import {Link} from "react-router-dom";
import {
    adminLinks,
    guestLinks,
    managerLinks,
    studentLinks,
    coordinatorLinks,
    Role
} from "../_helpers";
import {
    authenticationService
} from "../_services";
import {notification} from "antd";
import queryString from "query-string";

export * from "./dateParser";
export * from "./chartUtils";
export * from "./zipFiles";

export const calculateDaysDiff = (term, dayDiff) => {
    const existedTerm = term;

    const currentTime = new Date().getTime();
    const closureTime = new Date(existedTerm.closureDate).getTime();

    // To calculate the time difference of two dates 
    const Difference_In_Time = currentTime - closureTime; 
        
    // To calculate the no. of days between two dates 
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

    if (Difference_In_Days >= dayDiff) {
        return true;
    }

    return false;
}

export const extractQueryString = (props) => {
    const parsed = queryString.parse(props.location.search);
    console.log(parsed);
    return parsed;
}

export const createNotification = (type, config) => {
    return notification[type]({
        ...config,
        placement: "bottomRight",
        className: 'custom-notification-class',
        duration: 10,
    });
}

export function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
            }
        }
    }
    rawFile.send(null);
}

export const checkFileEmpty = (file) => {
    console.log(file.size);
    /*
    fs.readFile(file, (err, file) => {
        if(file.length == 0){
            console.log("file is empty")
            return true;
        }else{
            console.log("file is not empty")
            return false;
        }
    })
    */
}

export function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return {
        bgColor: 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.4 + ')',
        borderColor: 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')'
    }
}

export function calculateKB(index) {
    return index * 1000;
}

export function calculateMB(index) {
    return index * 1000 * 1000;
}

export const returnLinksList = (role) => {
    let ans = [];

    switch (role) {
        case Role.Admin:
            ans = adminLinks;
            break;
        case Role.Guest:
            ans = guestLinks;
            break;
        case Role.Manager:
            ans = managerLinks;
            break;
        case Role.Student:
            ans = studentLinks;
            break;
        case Role.Coordinator:
            ans = coordinatorLinks;
            break;
        default:
            break;
    }

    return ans;
}

export function get_url_extension( url ) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

export const populateActionButtons = (routeName, record, canView = false) => {
    const recordID = record._id;
    const currentUser = authenticationService.currentUserValue;
    const currentRole = currentUser.role.role;

    if (currentRole === Role.Admin) {
        return (
            <>
                {canView ? (
                    <Link to={`${routeName}/details/${recordID}`} className="btn btn-primary">
                        <span className="material-icons">
                            visibility
                        </span>
                    </Link>
                ): (<></>)}
                {routeName === "contributions" || routeName === "faculty-assignments" ? (
                    <></>
                ) : (
                    <Link to={`${routeName}/edit/${recordID}`} className="btn btn-warning">
                        <span className="material-icons">
                            mode_edit
                        </span>
                    </Link>
                )}
            </>
        )
    }

    return (
        <>
            {canView ? (
                <Link to={`${routeName}/details/${recordID}`} className="btn btn-primary">
                    <span className="material-icons">
                        visibility
                    </span>
                </Link>
            ): (<></>)}
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
    if (ext === "docx" || ext === "pdf") {
        return true;
    }
    return false;
}