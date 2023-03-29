import React, { useState } from "react";
import styles from "./ImageGenerater.module.css";

const ImageGenerate = () => {
  const [prompt, setPrompt] = useState("");
  const [imageSize, setImageSize] = useState("small");
  const [imageUrl, setImageUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  async function imgCreate(e) {
    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt, imageSize: imageSize }),
      });
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const url = await response.json();

      return url.data.trim();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await imgCreate(prompt, imageSize);

    setImageUrl(response);
    setPrompt("");
  };
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Image Generation</h1>
        <form onSubmit={handleSubmit} className={styles.imageForm}>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">
              Prompt
            </span>
            <input
              required
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              value={prompt}
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="EX:一隻可愛的貓咪SAY HI"
            />
          </div>

          <div className={`${styles.size} form-floating`}>
            <select
              class="form-select"
              name="size"
              id="size"
              defaultValue={imageSize}
              onChange={(e) => setImageSize(e.target.value)}
              aria-label="Floating label select example"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
            <label for="floatingSelect" style={{ color: "gray" }}>
              Size with selects
            </label>
          </div>
          <button
            type="submit"
            className={`${styles.generate} btn btn-success`}
          >
            Generate Image
          </button>
        </form>

        <div className={styles.imageSide}>
          {imageUrl && (
            <img
              src={imageUrl}
              className={styles.pic}
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
        {isOpen && (
          <div className={styles.modal}>
            <span className={styles.close} onClick={handleClose}>
              &times;
            </span>
            <img className={styles.modalContent} src={imageUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerate;
