export type CardSize = 'tiny';

export function getCardImageSizes(desiredSize?: CardSize) {
    if (desiredSize === 'tiny') {
        return {
            default: 60,
        };
    }

    return undefined;
}

export function getStoryImageSizes() {
    return {
        mobile: 420,
        default: 680,
    };
}
