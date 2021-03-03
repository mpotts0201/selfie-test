import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Camera from '../components/camera'



export default function Home() {

  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    setupVideo()
  }, [])

  const setupVideo = () => {
    const video = document.getElementById('camera')

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then((stream) => {
      video.srcObject = stream
      video.play()
    })
    .catch(error => {
      console.log('Video error', error)
    })
  }

  const takePicture = (e) => {
    e.preventDefault()


  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Webcam Selfie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Selfie Test
        </h1>

        {photo ? <img alt='Your selfie' /> : <video id='camera' />}
        <button onClick={takePicture}>Take Photo</button>

        
      </main>

      
    </div>
  )
}
