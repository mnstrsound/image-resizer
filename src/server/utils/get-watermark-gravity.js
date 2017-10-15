import WatermarkPositions from '../../constants/watermark-positions';

export default (positionX, positionY) => {
    let gravity = '';

    if (positionY === WatermarkPositions.vertical.CENTER.value
        && positionX === WatermarkPositions.horizontal.CENTER.value
    ) gravity += WatermarkPositions.horizontal.CENTER.alias;

    if (positionY !== WatermarkPositions.vertical.CENTER.value) {
        gravity += WatermarkPositions.vertical[positionY].alias;
    }

    if (positionX !== WatermarkPositions.horizontal.CENTER.value) {
        gravity += WatermarkPositions.horizontal[positionX].alias;
    }
    return gravity;
};
