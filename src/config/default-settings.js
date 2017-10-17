import ImageFormats from '../constants/image-formats';
import WatermarkPositions from '../constants/watermark-positions';

export default {
    resize: {
        width: 100,
        height: 100,
        crop: true
    },
    watermark: {
        image: null,
        opacity: 50,
        size: 50,
        positionX: WatermarkPositions.horizontal.CENTER.value,
        positionY: WatermarkPositions.vertical.CENTER.value
    },
    naming: {
        prefix: '',
        indexation: 0,
        format: ImageFormats.JPG.value
    }
};
