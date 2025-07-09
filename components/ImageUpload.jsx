// ImageUpload component untuk upload gambar X-ray dengan drag & drop

import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image, AlertCircle, CheckCircle } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

const ImageUpload = ({ onImageSelect, disabled = false, className = '' }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Supported file types
  const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  // Handle file validation
  const validateFile = (file) => {
    const errors = [];

    if (!supportedTypes.includes(file.type)) {
      errors.push('Tipe file tidak didukung. Gunakan JPEG, PNG, atau WebP');
    }

    if (file.size > maxFileSize) {
      errors.push('Ukuran file terlalu besar. Maksimal 10MB');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Process uploaded file
  const processFile = useCallback(async (file) => {
    const validation = validateFile(file);
    
    if (!validation.isValid) {
      setUploadStatus({
        type: 'error',
        message: validation.errors.join(', ')
      });
      return;
    }

    try {
      setUploadStatus({
        type: 'processing',
        message: 'Memproses gambar...'
      });

      // Create file reader
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const imageData = {
          file,
          dataUrl,
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        };

        setPreview(dataUrl);
        setUploadStatus({
          type: 'success',
          message: 'Gambar berhasil diupload'
        });

        // Call parent callback
        if (onImageSelect) {
          onImageSelect(imageData, file);
        }
      };

      reader.onerror = () => {
        setUploadStatus({
          type: 'error',
          message: 'Gagal membaca file'
        });
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing file:', error);
      setUploadStatus({
        type: 'error',
        message: 'Terjadi kesalahan saat memproses file'
      });
    }
  }, [onImageSelect]);

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [disabled, processFile]);

  // Handle file input change
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  // Handle click to upload
  const handleUploadClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Clear uploaded image
  const handleClear = () => {
    setPreview(null);
    setUploadStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Status icon
  const getStatusIcon = () => {
    if (!uploadStatus) return null;
    
    switch (uploadStatus.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return null;
    }
  };

  // Status color
  const getStatusColor = () => {
    if (!uploadStatus) return '';
    
    switch (uploadStatus.type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'processing':
        return 'text-blue-600';
      default:
        return '';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <Card className="p-6">
        {/* Upload Area */}
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
            ${dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : preview 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={supportedTypes.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled}
          />

          {preview ? (
            // Preview Image
            <div className="space-y-4">
              <div className="relative inline-block">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full max-h-64 rounded-lg shadow-sm"
                />
                <Button
                  variant="danger"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="absolute -top-2 -right-2"
                  icon={X}
                >
                </Button>
              </div>
            </div>
          ) : (
            // Upload Prompt
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-12 h-12 text-gray-400" />
                <div className="text-lg font-medium text-gray-900">
                  Upload Gambar X-ray Paru-paru
                </div>
                <div className="text-sm text-gray-500">
                  Drag & drop atau klik untuk memilih file
                </div>
              </div>
              
              <div className="text-xs text-gray-400 space-y-1">
                <div>Format yang didukung: JPEG, PNG, WebP</div>
                <div>Ukuran maksimal: 10MB</div>
              </div>
            </div>
          )}
        </div>

        {/* Status Message */}
        {uploadStatus && (
          <div className={`mt-4 flex items-center space-x-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-sm font-medium">
              {uploadStatus.message}
            </span>
          </div>
        )}

        {/* Upload Button (Alternative) */}
        {!preview && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={handleUploadClick}
              disabled={disabled}
              icon={Image}
            >
              Pilih File
            </Button>
          </div>
        )}

        {/* Guidelines */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Panduan Upload Gambar X-ray:
          </h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Pastikan gambar X-ray berkualitas tinggi dan jelas</li>
            <li>• Gambar harus menunjukkan area paru-paru secara lengkap</li>
            <li>• Hindari gambar yang blur atau terpotong</li>
            <li>• Format file yang didukung: JPEG, PNG, WebP</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ImageUpload;
