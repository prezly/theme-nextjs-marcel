const UNITS = ['bytes', 'Kb', 'Mb', 'Gb'];

// Convert byte amounts to meaningful text
function formatBytes(bytes: number | string) {
    let l = 0;
    let n = typeof bytes === 'number' ? bytes : parseInt(bytes, 10) || 0;

    while (n >= 1024) {
        n /= 1024;
        l += 1;
    }

    return `${n.toFixed(n >= 10 || l < 1 ? 0 : 1)} ${UNITS[l]}`;
}

export default formatBytes;
