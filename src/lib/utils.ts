/**
 * Returns a formatted string from the given dates. Indicating a date interval.
 *
 * @param {Date} d1 The start date.
 * @param {Date} d2 Optional. The end date.
 * @return {String} The formatted date string.
 */
export const formatDate = (d1: Date, d2?: Date): String => {
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' }

    if (!!d2) {
        if (typeof d2 === 'string') {
            d2 = new Date(d2)
        }
        // @ts-ignore
        return `${d1.toLocaleDateString('sv-SE', options)} - ${d2.toLocaleDateString('sv-SE', options)}`
    } else {
        if (typeof d1 === 'string') {
            d1 = new Date(d1)
        }
        // @ts-ignore
        return `${d1.toLocaleDateString('sv-SE', options)}`
    }
}

export const getLargestImageFromFormats = (formats: any): String => {
    if (!!formats.medium) {
        return formats.large.url
    } else if (!!formats.medium) {
        return formats.medium.url
    } else if (!!formats.small) {
        return formats.small.url
    } else {
        return formats.thumbnail.url
    }
}
