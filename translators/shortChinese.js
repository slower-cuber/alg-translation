import {wholeCubePattern, facePattern, outerBlockPattern, 
        widePattern, midPattern} from "../pattern.js";


const getDegreeStr = (n) => {
    switch(n) {
        case "": return "90";
        case "2": return "180";
        case "3": return "270";
    }
}

const faceMap = {"F": "前", "B": "背", "R": "右", "L": "左", "U": "頂", "D": "底"};

const translateWholeCube = (token) => {
    let r = wholeCubePattern.exec(token);
    let degreeStr = getDegreeStr(r[2]);
    let isClockwise = (r[3] == "'") ? false : true;
    switch(r[1]) {
        case "x":
            if (isClockwise) return "方塊前滾" + degreeStr;
            else return "方塊後滾" + degreeStr;
        case "y":
            if (isClockwise) return "方塊順時針轉" + degreeStr;
            else return "方塊逆時針轉" + degreeStr;
        case "z":
            if (isClockwise) return "方塊右滾" + degreeStr;
            else return "方塊左滾" + degreeStr;
    }
}

const translateFace = (token) => {
    let r = facePattern.exec(token);

    let faceStr = faceMap[r[1]] + "面";
    let degreeStr = getDegreeStr(r[2]);
    let directionStr = (r[3] == "'") ? "逆" : "順";
    return faceStr + directionStr + degreeStr;
}

const translateOuterBlock = (token) => {
    let r = outerBlockPattern.exec(token);

    let layerNum = (r[1] == "") ? "2" : r[1];
    let faceStr = faceMap[r[2]] + "面";
    let degreeStr = getDegreeStr(r[3]);
    let directionStr = (r[4] == "'") ? "逆" : "順";
    return layerNum + "層" + faceStr + directionStr + degreeStr;
}

const translateWide = (token) => {
    let r = widePattern.exec(token);

    let faceStr = faceMap[r[1].toUpperCase()] + "面";
    let degreeStr = getDegreeStr(r[2]);
    let directionStr = (r[3] == "'") ? "逆" : "順";
    return "兩層" + faceStr + directionStr + degreeStr;
}

const translateMid = (token) => {
    let r = midPattern.exec(token);

    let layerStr;
    switch (r[1]) {
        case "M": layerStr = "中間層"; break;
        case "E": layerStr = "赤道層"; break;
        case "S": layerStr = "站立層"; break;
    }
    let degreeStr = getDegreeStr(r[2]);
    let directionStr = (r[3] == "'") ? "逆" : "順";
    return layerStr + directionStr + degreeStr;
}

const translate = (token) => {
    let trimmedToken = token.trim();
    // order matters
    if (wholeCubePattern.test(trimmedToken)) {
        return translateWholeCube(trimmedToken);
    } 
    else if (outerBlockPattern.test(trimmedToken)) {
        return translateOuterBlock(trimmedToken);
    } 
    else if (facePattern.test(trimmedToken)) {
        return translateFace(trimmedToken);
    } 
    else if (widePattern.test(trimmedToken)) {
        return translateWide(trimmedToken);
    } 
    else if (midPattern.test(trimmedToken)) {
        return translateMid(trimmedToken);
    } 
    else {
        throw Error("translation error in token "+token);
    }
}

export {translate};