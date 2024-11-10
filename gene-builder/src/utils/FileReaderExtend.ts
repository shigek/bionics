export const readAsText = (blob: Blob): Promise<string> => {
    const data = new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsText(blob)
    })
    return data as Promise<string>;
}

export const readAsDataURL = (blob: Blob) => {
    const data = new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
    })
    return data;
}

export const readAsArrayBuffer = (blob: Blob) => {
    const data = new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsArrayBuffer(blob)
    })
    return data;
}
