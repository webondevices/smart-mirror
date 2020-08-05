import React, { useRef, useEffect, useContext } from 'react';
import * as faceapi from 'face-api.js';
import { loadLabeledImages } from './helpers';
import { AppContext } from '../../appContext.js';
import { Actions } from '../../appActions';

const FaceID = ({ children }) => {
  const {
    dispatch,
    state: { faces },
  } = useContext(AppContext);
  const videoElement = useRef(null);
  let faceMatcher = null;

  const detectFaces = async () => {
    const detections = await faceapi
      .detectAllFaces(videoElement.current)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const results = detections.map((d) =>
      faceMatcher.findBestMatch(d.descriptor),
    );

    const newFaces = results
      .filter((r) => r.label !== 'unknown')
      .map((fr) => fr.label);

    dispatch({
      type: Actions.SetFaces,
      payload: newFaces,
    });
  };

  const startRecognition = () => setInterval(detectFaces, 1000);

  const startCamera = async () => {
    // Load faces
    const labeledFaceDescriptors = await loadLabeledImages();
    faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    // Start camera
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoElement.current.srcObject = stream;
  };

  useEffect(() => {
    // Load models then start camera
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri('./src/faceid/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('./src/faceid/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('./src/faceid/models'),
    ]).then(startCamera);
  }, []);

  return (
    <>
      {children}
      <video
        autoPlay
        ref={videoElement}
        onPlay={startRecognition}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default FaceID;
