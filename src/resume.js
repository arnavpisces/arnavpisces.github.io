import React from "react";
import pdf from "./resume.pdf";

export default function Resume() {
  return (
    <div>
      <a href={pdf} target="_blank" rel="noreferrer">
        Download Pdf
      </a>
    </div>
  );
}