import * as faceapi from 'face-api.js';
import { Users } from '../../faceid/users';

const IMAGE_LOCATION = './src/faceid/labeled_images/';

export const loadLabeledImages = () => {
  return Promise.all(
    Object.keys(Users).map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 4; i++) {
        const img = await faceapi.fetchImage(
          `${IMAGE_LOCATION}${label}/${i}.jpg`,
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        descriptions.push(detections.descriptor);
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    }),
  );
};
