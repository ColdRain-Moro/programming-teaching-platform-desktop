export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 解码垃圾接口返回的乱七八糟的数据
 * 从刷题网站cv来的
 * 
 * @param srcString 
 * @returns 
 */
function htmlEncode(srcString: string) {
    return srcString.replace(/ /g, ' ')
        .replace(/\t/g, '    ')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/&/g, '&amp;')
        .replace(/\r\n/g, '&lt;br&gt;')
        .replace(/\r/g, '&lt;br&gt;')
        .replace(/\n/g, '&lt;br&gt;')
        .replace(/\\/g, '\\\\')
        .replace(/'/g, '\'\'');
}

/**
 * 解码垃圾接口返回的乱七八糟的数据
 * 从刷题网站cv来的
 * 
 * @param srcString 
 * @returns 
 */
function htmlDecode(srcString: string) {
    return srcString.replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/\\/g, '\\')
        .replace(/''/g, '\'');

}

/**
 * 格式化接口返回的人不人鬼不鬼的json串
 * 从刷题网站cv来的
 * 
 * @param str 
 * @returns 
 */
function trim(str: string) {
    return str.replace(/^\ +|\ +$/ig, "");
}