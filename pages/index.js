import React, {useEffect, useState} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

export default function Home() {
    let [photo, setPhoto, fullscreen = false] = useState(null);

    useEffect(() => {
        setupVideo();
    }, [photo]);

    const setupVideo = () => {
        const video = document.getElementById("camera");

        navigator.mediaDevices
            .getUserMedia({video: true, audio: false})
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((error) => {
                console.log("Video error", error);
            });
    };

    const takePicture = (e) => {
        e.preventDefault();

        const canvas = document.getElementById("canvas");
        const video = document.getElementById("camera");
        const context = canvas.getContext("2d");
        const width = video?.videoWidth;
        const height = video?.videoHeight;

        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            const data = canvas.toDataURL("image/png");
              document.exitFullscreen();
              fullscreen = false
        


            setPhoto(data);
        } else {
            setPhoto(null);
        }
    };

    const goFullscreen = () => {
      fullscreen = !fullscreen;
      console.log(fullscreen);
        let video = document.getElementById("cam-container");
        fullscreen ? video.requestFullscreen() : document.exitFullscreen();
        
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Webcam Selfie</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Selfie Test</h1>
                <canvas id="canvas" className={styles.canvas} />

                {photo ? (
                    <div>
                        <img className={styles.photo} alt="Your selfie" src={photo} />
                        <button onClick={takePicture}>{photo ? "Clear Photo" : "Take Photo"}</button>
                    </div>
                ) : (
                    <div id="cam-container" className={`${styles.vid_container}`}>
                        <video className={styles.camera} id="camera"></video>
                        <div className={styles.video_bar}>
                            <div onClick={goFullscreen} className={styles.full}>
                                Full Screen
                            </div>
                            <button onClick={takePicture}>{photo ? "Clear Photo" : "Take Photo"}</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
