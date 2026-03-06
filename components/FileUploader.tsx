"use client"

import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { convertFileToUrl } from "@/lib/utils"

type FileUploaderProps = {
  files: File[] | undefined
  onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // ✅ Logic unchanged: still pass files up
    onChange(acceptedFiles)
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,

    // 🔐 SECURITY: allow only safe image types
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },

    // 🔐 SECURITY: prevent large uploads (5MB)
    maxSize: 5 * 1024 * 1024,

    // 🔐 SECURITY: single file only
    multiple: false,
  })

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />

      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />

          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload</span> or drag and drop
            </p>
            <p>
              PNG or JPG (max 5MB)
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default FileUploader