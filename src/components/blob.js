import * as React from 'react'
import { blobText,blobDiv,textJustify } from '../components/blob.module.css'

const Blob = ({insideText}) =>{
    return (
        <div className={blobDiv}>
            <div className={blobText}>
            <svg viewBox="0 0 310 350">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#00ff959d" />
                <stop offset="100%" stop-color="#0000ff" />
                </linearGradient>
            </defs>
            <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" fill="url(#gradient)" />
            </svg>
            </div>
            <h1 className={textJustify}>{insideText}</h1>
        </div>
    )
}

export default Blob