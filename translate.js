import {translate as shortChineseTr} from "./translators/shortChinese.js";
import {translate as longChineseTr} from "./translators/longChinese.js";
import {validPatternStr} from "./pattern.js";


const tokenize = (algStr) => {
    let normAlgStr = algStr.trim().replace(/[()]/g, "");
    let regex = new RegExp(validPatternStr, "y");
    let tokens = [];
    let nextParseIndex = 0;
    let r;
    while (r = regex.exec(normAlgStr)) {
        let token = r[0];
        tokens.push(token);
        nextParseIndex = r["index"] + token.length;
    }

    let success = (nextParseIndex == normAlgStr.length) ? true : false;
    let unparsedSeg = normAlgStr.slice(nextParseIndex, nextParseIndex+3);
    return {success, tokens, nextParseIndex, unparsedSeg};
}

const translateAlgStr = (algStr, translator="shortChinese") => {
    let {success, tokens, nextParseIndex, unparsedSeg} = tokenize(algStr);
    
    let translate;
    switch (translator) {
        case "shortChinese": translate = shortChineseTr; break;
        case "longChinese": translate = longChineseTr; break;
        default:
            throw Error("Undefined translator");
    }

    let translatedMoves = tokens.map(translate);
    return {success, tokens, translatedMoves, nextParseIndex, unparsedSeg};
}

export {translateAlgStr};