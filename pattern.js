const wholeCubePatternStr = "([xyz])(2?)('?)\\s*";
const facePatternStr = "([FBRLUD])([23]?)('?)\\s*";
const outerBlockPatternStr = "(\\d*)([FBRLUD])w([23]?)('?)\\s*";
const widePatternStr = "([fbrlud])([23]?)('?)\\s*";
const midPatternStr = "([MES])([23]?)('?)\\s*";

const wholeCubePattern = new RegExp(wholeCubePatternStr);
const facePattern = new RegExp(facePatternStr);
const outerBlockPattern = new RegExp(outerBlockPatternStr);
const widePattern = new RegExp(widePatternStr);
const midPattern = new RegExp(midPatternStr);

// order matters
const validPatternStr = [wholeCubePatternStr, outerBlockPatternStr,
                         facePatternStr, widePatternStr, midPatternStr].join("|");

export {
    wholeCubePattern, facePattern, outerBlockPattern, widePattern, midPattern,
    validPatternStr
};