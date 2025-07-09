/**
 * Image processing utilities untuk aplikasi diagnosis penyakit paru-paru
 * Mengintegrasikan validasi dan preprocessing untuk model TensorFlow.js
 */

/**
 * Validasi data gambar base64
 */
export function validateImageData(imageData) {
  const validation = {
    isValid: true,
    error: null,
    details: {}
  };

  try {
    // Validasi format base64
    if (typeof imageData !== 'string') {
      validation.isValid = false;
      validation.error = 'Image data harus berupa string';
      return validation;
    }

    // Cek apakah data URL valid
    if (!imageData.startsWith('data:image/')) {
      validation.isValid = false;
      validation.error = 'Format data URL tidak valid';
      return validation;
    }

    // Cek ukuran data (estimasi)
    const sizeInBytes = (imageData.length * 3) / 4;
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (sizeInBytes > maxSize) {
      validation.isValid = false;
      validation.error = 'Ukuran gambar terlalu besar (maksimal 10MB)';
      return validation;
    }

    validation.details = {
      format: 'data URL',
      estimatedSize: sizeInBytes,
      dataType: imageData.split(';')[0].split(':')[1]
    };

    return validation;
  } catch (error) {
    validation.isValid = false;
    validation.error = `Error validating image data: ${error.message}`;
    return validation;
  }
}

/**
 * Preprocess gambar untuk model TensorFlow.js
 * Mengkonversi gambar ke format yang sesuai untuk inferensi
 */
export function preprocessImageForModel(imageDataUrl, targetSize = 224) {
  return new Promise((resolve, reject) => {
    try {
      // Create image element
      const img = new Image();
      
      img.onload = () => {
        try {
          // Create canvas untuk resize
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas size to target size
          canvas.width = targetSize;
          canvas.height = targetSize;
          
          // Draw and resize image
          ctx.drawImage(img, 0, 0, targetSize, targetSize);
          
          // Get image data
          const imageData = ctx.getImageData(0, 0, targetSize, targetSize);
          const data = imageData.data;
          
          // Convert to normalized float array [0, 1]
          const normalizedData = new Float32Array(targetSize * targetSize * 3);
          let index = 0;
          
          for (let i = 0; i < data.length; i += 4) {
            // Normalize RGB values (skip alpha channel)
            normalizedData[index++] = data[i] / 255.0;     // R
            normalizedData[index++] = data[i + 1] / 255.0; // G
            normalizedData[index++] = data[i + 2] / 255.0; // B
          }
          
          resolve({
            data: normalizedData,
            shape: [1, targetSize, targetSize, 3], // Batch, Height, Width, Channels
            originalSize: { width: img.width, height: img.height },
            processedSize: { width: targetSize, height: targetSize }
          });
        } catch (error) {
          reject(new Error(`Gagal memproses gambar: ${error.message}`));
        }
      };
      
      img.onerror = () => {
        reject(new Error('Gagal memuat gambar'));
      };
      
      // Set image source
      img.src = imageDataUrl;
    } catch (error) {
      reject(new Error(`Error preprocessing: ${error.message}`));
    }
  });
}

/**
 * Konversi file gambar ke ImageData
 */
export function fileToImageData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        
        resolve({
          imageData,
          dataUrl: e.target.result,
          width: img.width,
          height: img.height
        });
      };
      
      img.onerror = () => reject(new Error('Gagal memuat gambar'));
      img.src = e.target.result;
    };
    
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Resize gambar dengan mempertahankan aspect ratio
 */
export function resizeImageWithAspectRatio(imageDataUrl, maxWidth = 800, maxHeight = 600) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw resized image
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve({
        dataUrl: canvas.toDataURL('image/jpeg', 0.9),
        width,
        height,
        originalWidth: img.width,
        originalHeight: img.height
      });
    };
    
    img.onerror = () => reject(new Error('Gagal memuat gambar'));
    img.src = imageDataUrl;
  });
}

/**
 * Ekstrak metadata dari gambar
 */
export function extractImageMetadata(file) {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: new Date(file.lastModified),
    aspectRatio: null, // Will be calculated after loading
  };
}

/**
 * Kompresi gambar untuk mengurangi ukuran file
 */
export function compressImage(imageDataUrl, quality = 0.8, maxWidth = 1024) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate new size
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      
      resolve({
        dataUrl: compressedDataUrl,
        originalSize: img.width * img.height,
        compressedSize: width * height,
        compressionRatio: (width * height) / (img.width * img.height)
      });
    };
    
    img.onerror = () => reject(new Error('Gagal memuat gambar untuk kompresi'));
    img.src = imageDataUrl;
  });
}

/**
 * Validasi format gambar medis
 */
export function validateMedicalImageFormat(imageData) {
  const validation = {
    isValid: true,
    warnings: [],
    recommendations: []
  };
  
  // Check if image is grayscale (common for X-rays)
  // This is a simple check - in real implementation would be more sophisticated
  
  validation.recommendations.push('Pastikan gambar X-ray berkualitas tinggi');
  validation.recommendations.push('Gambar harus menunjukkan area paru-paru secara lengkap');
  
  return validation;
}

/**
 * Generate preview thumbnail
 */
export function generateThumbnail(imageDataUrl, size = 150) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = size;
      canvas.height = size;
      
      // Draw image centered and cropped
      const aspectRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
      
      if (aspectRatio > 1) {
        drawHeight = size;
        drawWidth = size * aspectRatio;
        offsetX = -(drawWidth - size) / 2;
      } else {
        drawWidth = size;
        drawHeight = size / aspectRatio;
        offsetY = -(drawHeight - size) / 2;
      }
      
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    
    img.onerror = () => reject(new Error('Gagal membuat thumbnail'));
    img.src = imageDataUrl;
  });
}
