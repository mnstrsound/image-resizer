import WatermarkPositions from '../constants/watermark-positions';
import ImageFormats from '../constants/image-formats';

const Rules = {
    resize: {
        width: 'required|integer|between:1,10000',
        height: 'required|integer|between:1,10000',
        crop: 'required|boolean'
    },
    preview: {
        width: 'required|integer|between:1,10000',
        height: 'required|integer|between:1,10000',
        postfix: 'required',
        use: 'required|boolean'
    },
    watermark: {
        image: '',
        opacity: 'required|integer|between:1,100',
        size: 'required|integer|between:1,100',
        positionX: `required|in:${Object.keys(WatermarkPositions.horizontal).join(',')}`,
        positionY: `required|in:${Object.keys(WatermarkPositions.vertical).join(',')}`,
        use: 'required|boolean'
    },
    naming: {
        prefix: '',
        indexation: 'required|integer',
        format: `required|in:${Object.keys(ImageFormats).join(',')}`
    }
};

export default Rules;
