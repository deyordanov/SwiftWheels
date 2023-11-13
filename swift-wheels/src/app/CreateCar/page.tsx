"use client";

import React, { useState } from "react";

const FileUploadComponent = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const uploadToDrive = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(
                    "http://localhost:3030/api/googleDrive",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log("File uploaded successfully:", result);
            } catch (error) {
                console.error("Upload failed:", error);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadToDrive}>Upload to Drive</button>
        </div>
    );
};

export default FileUploadComponent;
