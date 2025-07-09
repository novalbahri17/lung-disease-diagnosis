/**
 * Utility functions untuk validasi file upload dan data processing
 * Mengadaptasi validasi dari kode Google Colab untuk diagnosis penyakit paru-paru
 */

/**
 * Validasi file upload untuk gambar X-ray
 */
export function validateImageFile(file) {
  const validation = {
    isValid: true,
    errors: [],
    warnings: [],
    fileInfo: {}
  };

  // Validasi basic file
  if (!file) {
    validation.isValid = false;
    validation.errors.push('File tidak ditemukan');
    return validation;
  }

  // Validasi tipe file
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'];
  if (!validTypes.includes(file.type)) {
    validation.isValid = false;
    validation.errors.push(`Format file tidak didukung: ${file.type}. Format yang didukung: JPEG, PNG, BMP`);
  }

  // Validasi ukuran file (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    validation.isValid = false;
    validation.errors.push(`Ukuran file terlalu besar: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maksimal 10MB`);
  }

  // Validasi ukuran file minimum (min 1KB)
  const minSize = 1024; // 1KB
  if (file.size < minSize) {
    validation.isValid = false;
    validation.errors.push('File terlalu kecil, kemungkinan corrupt');
  }

  // Info file
  validation.fileInfo = {
    name: file.name,
    size: file.size,
    type: file.type,
    sizeFormatted: formatFileSize(file.size),
    lastModified: new Date(file.lastModified)
  };

  return validation;
}

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

    // Extract MIME type
    const mimeMatch = imageData.match(/data:([^;]+);/);
    if (!mimeMatch) {
      validation.isValid = false;
      validation.error = 'MIME type tidak ditemukan';
      return validation;
    }

    const mimeType = mimeMatch[1];
    const validMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/bmp'];
    
    if (!validMimes.includes(mimeType)) {
      validation.isValid = false;
      validation.error = `MIME type tidak didukung: ${mimeType}`;
      return validation;
    }

    // Validasi base64 data
    const base64Data = imageData.split(',')[1];
    if (!base64Data) {
      validation.isValid = false;
      validation.error = 'Data base64 tidak ditemukan';
      return validation;
    }

    // Estimate file size from base64
    const estimatedSize = (base64Data.length * 3) / 4;
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (estimatedSize > maxSize) {
      validation.isValid = false;
      validation.error = `Data gambar terlalu besar: ${formatFileSize(estimatedSize)}. Maksimal 10MB`;
      return validation;
    }

    validation.details = {
      mimeType,
      estimatedSize,
      estimatedSizeFormatted: formatFileSize(estimatedSize),
      base64Length: base64Data.length
    };

  } catch (error) {
    validation.isValid = false;
    validation.error = `Error validasi: ${error.message}`;
  }

  return validation;
}

/**
 * Format ukuran file menjadi readable string
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Validasi dimensi gambar
 */
export function validateImageDimensions(width, height) {
  const validation = {
    isValid: true,
    warnings: [],
    recommendations: []
  };

  // Minimum dimensions untuk X-ray
  const minWidth = 224;
  const minHeight = 224;
  
  if (width < minWidth || height < minHeight) {
    validation.warnings.push(`Resolusi rendah: ${width}x${height}. Minimum yang disarankan: ${minWidth}x${minHeight}`);
    validation.recommendations.push('Gunakan gambar dengan resolusi lebih tinggi untuk hasil yang lebih akurat');
  }

  // Maximum reasonable dimensions
  const maxWidth = 4096;
  const maxHeight = 4096;
  
  if (width > maxWidth || height > maxHeight) {
    validation.warnings.push(`Resolusi sangat tinggi: ${width}x${height}. Akan di-resize untuk processing`);
    validation.recommendations.push('Gambar akan di-resize otomatis, ini mungkin mempengaruhi detail');
  }

  return validation;
}

/**
 * Validasi comprehensive untuk file upload
 */
export async function validateUploadedImage(file, imageDataUrl) {
  const results = {
    isValid: true,
    errors: [],
    warnings: [],
    recommendations: [],
    fileInfo: {},
    qualityInfo: {}
  };

  try {
    // Validasi file
    const fileValidation = validateImageFile(file);
    if (!fileValidation.isValid) {
      results.isValid = false;
      results.errors.push(...fileValidation.errors);
    }
    results.warnings.push(...fileValidation.warnings);
    results.fileInfo = fileValidation.fileInfo;

    // Validasi data
    const dataValidation = validateImageData(imageDataUrl);
    if (!dataValidation.isValid) {
      results.isValid = false;
      results.errors.push(dataValidation.error);
    }

  } catch (error) {
    results.isValid = false;
    results.errors.push(`Error dalam validasi: ${error.message}`);
  }

  return results;
}
