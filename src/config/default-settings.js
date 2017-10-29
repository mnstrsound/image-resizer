import ImageFormats from '../constants/image-formats';
import WatermarkPositions from '../constants/watermark-positions';

export default {
    resize: {
        width: 1000,
        height: 1000,
        crop: true
    },
    preview: {
        width: 100,
        height: 100,
        postfix: '',
        use: false,
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
