import ImageFormats from '../constants/image-formats';

export default {
    resize: {
        width: 100,
        height: 100
    },
    watermark: {
        image: null,
        opacity: 50
    },
    naming: {
        prefix: '',
        indexation: 0,
        format: ImageFormats.JPG.value
    }
};
