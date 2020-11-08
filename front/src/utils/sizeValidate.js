/**
 *
 * @param {Buffer} fileBuffer
 * @param {number} limitMB
 * @return {boolean}
 */
function validateSize(fileBuffer, limitMB= 5) {
    const fsize = fileBuffer.size;
    const MB = 1024 * 1024;
    const file = Math.round((fsize / MB));
    return file < limitMB;
}

export default  validateSize;