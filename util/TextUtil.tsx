const getSizeText = (size: number): string => {
    type sizeUnit = 'Byte' | 'KB' | 'MB' | 'GB' | 'TB';
    type selectionSize = {
        size: number,
        unit: sizeUnit,
    }
    const KB = Math.pow(10, 3);
    const MB = Math.pow(10, 6);
    const GB = Math.pow(10, 9);
    const TB = Math.pow(10, 12);
    const fsize: selectionSize = size >= TB ? {
        size: size / TB,
        unit: 'TB',
    } :
        size > GB ? {
            size: size / GB,
            unit: 'GB',
        } :
            size > MB ? {
                size: size / MB,
                unit: 'MB',
            } : size > KB ? {
                size: size / KB,
                unit: 'KB',
            } : {
                size: size,
                unit: 'Byte',
            };
    return `${fsize.size.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })} ${fsize.unit.toString()}`;
}

const TextUtil = {
    getSizeText
}

export default TextUtil;