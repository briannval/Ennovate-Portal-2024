import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";

interface DropzoneUploadProps {
    onFileChange: (base64Image: string) => void; // Callback to notify the parent component with the file's base64 data
    imagePreview: string | null;
    error?: string;
}

const DropzoneUpload: React.FC<DropzoneUploadProps> = ({
    onFileChange,
    imagePreview,
    error,
}) => {
    const [internalImagePreview, setInternalImagePreview] = useState<string | null>(imagePreview);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                setInternalImagePreview(base64); // Set the internal preview image
                onFileChange(base64); // Notify the parent component with the base64 data
            };
            reader.readAsDataURL(acceptedFiles[acceptedFiles.length - 1]);
        },
        [onFileChange]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <div
            {...getRootProps()}
            className={`bg-white border ${error ? "border-red-500" : "border-ennovate-gray"} text-ennovate-main text-sm rounded-md focus:ring-blue-500 focus:border-ennovate-main block w-full h-64 flex items-center justify-center cursor-pointer`}
        >
            <input {...getInputProps()} />
            {internalImagePreview ? (
                <img
                    src={internalImagePreview}
                    alt="Preview"
                    className="h-full w-full object-contain rounded-md"
                />
            ) : (
                <CameraIcon />
            )}
        </div>
    );
};

const CameraIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="gray"
        className="bi bi-camera-fill"
        viewBox="0 0 16 16"
    >
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
    </svg>
);

export default DropzoneUpload;
