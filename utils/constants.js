// Constants and configuration for lung disease diagnosis app

// Application Configuration
export const APP_CONFIG = {
  NAME: 'AI Diagnosis Paru-paru',
  VERSION: '1.0.0',
  DESCRIPTION: 'Diagnosis penyakit paru-paru bertenaga AI dari gambar X-ray',
  AUTHOR: 'Tim AI Medis',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  MODEL_INPUT_SIZE: 224,
  CONFIDENCE_THRESHOLD: 0.5
};

// Disease Information and Classifications
export const DISEASE_INFO = {
  Normal: {
    name: 'Normal',
    description: 'Paru-paru terlihat sehat tanpa tanda-tanda penyakit yang signifikan.',
    severity: 'low',
    color: 'green',
    recommendations: [
      {
        title: 'Pemeliharaan Kesehatan',
        description: 'Pertahankan gaya hidup sehat dengan olahraga teratur dan tidak merokok.',
        urgency: 'normal'
      },
      {
        title: 'Pemeriksaan Rutin',
        description: 'Lakukan pemeriksaan kesehatan rutin setiap tahun.',
        urgency: 'normal'
      }
    ]
  },
  Pneumonia: {
    name: 'Pneumonia',
    description: 'Infeksi yang menyebabkan peradangan pada kantong udara di salah satu atau kedua paru-paru.',
    severity: 'high',
    color: 'red',
    recommendations: [
      {
        title: 'Konsultasi Segera',
        description: 'Segera hubungi dokter untuk diagnosis dan pengobatan yang tepat.',
        urgency: 'urgent'
      },
      {
        title: 'Istirahat Total',
        description: 'Perbanyak istirahat dan konsumsi cairan untuk mempercepat pemulihan.',
        urgency: 'urgent'
      },
      {
        title: 'Monitoring Gejala',
        description: 'Pantau gejala seperti demam, batuk, dan kesulitan bernapas.',
        urgency: 'urgent'
      }
    ]
  },
  COVID: {
    name: 'COVID-19',
    description: 'Infeksi virus SARS-CoV-2 yang dapat menyebabkan pneumonia dan komplikasi pernapasan.',
    severity: 'high',
    color: 'red',
    recommendations: [
      {
        title: 'Isolasi Mandiri',
        description: 'Lakukan isolasi mandiri sesuai protokol kesehatan yang berlaku.',
        urgency: 'urgent'
      },
      {
        title: 'Konsultasi Medis',
        description: 'Hubungi tenaga medis untuk mendapatkan panduan pengobatan.',
        urgency: 'urgent'
      },
      {
        title: 'Monitoring Saturasi',
        description: 'Pantau saturasi oksigen dan segera ke rumah sakit jika memburuk.',
        urgency: 'urgent'
      }
    ]
  },
  Tuberculosis: {
    name: 'Tuberkulosis (TB)',
    description: 'Infeksi bakteri yang terutama menyerang paru-paru dan dapat menular.',
    severity: 'high',
    color: 'orange',
    recommendations: [
      {
        title: 'Pengobatan Segera',
        description: 'Mulai pengobatan anti-TB sesuai resep dokter dan jalani hingga tuntas.',
        urgency: 'urgent'
      },
      {
        title: 'Pencegahan Penularan',
        description: 'Gunakan masker dan hindari kontak dekat dengan orang lain.',
        urgency: 'urgent'
      },
      {
        title: 'Nutrisi dan Istirahat',
        description: 'Perbaiki nutrisi dan istirahat yang cukup untuk mendukung pemulihan.',
        urgency: 'moderate'
      }
    ]
  }
};

// Image Validation Configuration
export const IMAGE_VALIDATION = {
  MIN_WIDTH: 64,
  MIN_HEIGHT: 64,
  MAX_WIDTH: 4096,
  MAX_HEIGHT: 4096,
  MIN_QUALITY_SCORE: 0.3,
  REQUIRED_CHANNELS: 3, // RGB
  BRIGHTNESS_RANGE: {
    MIN: 20,
    MAX: 240
  }
};

// Processing Steps for UI
export const PROCESSING_STEPS = [
  'Memvalidasi gambar X-ray...',
  'Memproses dan mengoptimalkan gambar...',
  'Memuat model AI EfficientNetB0...',
  'Menjalankan inferensi neural network...',
  'Menganalisis pola penyakit...',
  'Menghitung confidence score...',
  'Menyiapkan rekomendasi medis...',
  'Menyelesaikan diagnosis...'
];

// Metadata Configuration
export const METADATA = {
  TITLE: 'AI Diagnosis Paru-paru - Deteksi Penyakit Paru-paru',
  DESCRIPTION: 'Sistem diagnosis AI untuk mendeteksi penyakit paru-paru dari gambar X-ray menggunakan pembelajaran mendalam.',
  KEYWORDS: 'penyakit paru-paru, diagnosis AI, analisis X-ray, deteksi pneumonia, deteksi COVID-19, deteksi tuberkulosis, AI medis',
  AUTHOR: 'Tim AI Medis',
  FAVICON: '/favicon.ico',
  OG_IMAGE: '/images/og-image.jpg',
  ROBOTS: 'index, follow',
  LANGUAGE: 'id-ID'
};

// API Configuration
export const API_CONFIG = {
  ENDPOINTS: {
    PREDICT: '/api/predict',
    HEALTH: '/api/health'
  },
  TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000 // 1 second
};

// UI Constants
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 5000,
  UPLOAD_PROGRESS_STEPS: 8,
  CONFIDENCE_COLORS: {
    HIGH: 'green',
    MEDIUM: 'yellow',
    LOW: 'red'
  }
};

// Model Configuration
export const MODEL_CONFIG = {
  NAME: 'EfficientNetB0',
  VERSION: '1.0.0',
  INPUT_SHAPE: [224, 224, 3],
  NUM_CLASSES: 4,
  CLASS_NAMES: ['Normal', 'Pneumonia', 'COVID', 'Tuberculosis'],
  PREPROCESSING: {
    NORMALIZE: true,
    RESIZE_METHOD: 'bilinear',
    CENTER_CROP: true
  }
};

// Classes Configuration
export const CLASSES = {
  LABELS: ['Normal', 'Pneumonia', 'COVID', 'Tuberculosis'],
  COUNT: 4,
  NORMAL: 0,
  PNEUMONIA: 1,
  COVID: 2,
  TUBERCULOSIS: 3,
  RECOMMENDATIONS: {
    'Normal': [
      'Pertahankan gaya hidup sehat',
      'Lakukan pemeriksaan rutin tahunan',
      'Hindari paparan asap rokok',
      'Olahraga teratur untuk menjaga kesehatan paru-paru'
    ],
    'Pneumonia': [
      'Segera konsultasi dengan dokter',
      'Istirahat total dan minum banyak cairan',
      'Ikuti pengobatan antibiotik sesuai resep dokter',
      'Monitor gejala demam dan sesak napas'
    ],
    'COVID': [
      'Isolasi mandiri segera',
      'Hubungi layanan kesehatan COVID-19',
      'Monitor saturasi oksigen',
      'Minum obat sesuai protokol kesehatan'
    ],
    'Tuberculosis': [
      'Konsultasi dengan dokter spesialis paru',
      'Mulai pengobatan OAT (Obat Anti Tuberkulosis)',
      'Isolasi untuk mencegah penularan',
      'Kontrol rutin sesuai jadwal dokter'
    ]
  }
};

// Thresholds Configuration
export const THRESHOLDS = {
  CONFIDENCE: {
    HIGH: 0.8,
    MEDIUM: 0.6,
    LOW: 0.4
  },
  RISK: {
    HIGH: 0.7,
    MEDIUM: 0.5,
    LOW: 0.3
  },
  HIGH_CONFIDENCE: 0.8,
  MEDIUM_CONFIDENCE: 0.6,
  LOW_CONFIDENCE: 0.4
};

// Error Messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File terlalu besar. Maksimal 10MB.',
  INVALID_FORMAT: 'Format file tidak didukung. Gunakan JPEG, PNG, atau WebP.',
  UPLOAD_FAILED: 'Gagal mengupload gambar. Silakan coba lagi.',
  PREDICTION_FAILED: 'Gagal melakukan prediksi. Silakan coba lagi.',
  NETWORK_ERROR: 'Kesalahan jaringan. Periksa koneksi internet Anda.',
  SERVER_ERROR: 'Kesalahan server. Silakan coba lagi nanti.',
  INVALID_IMAGE: 'Gambar tidak valid atau rusak.',
  LOW_QUALITY: 'Kualitas gambar terlalu rendah untuk analisis yang akurat.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  UPLOAD_SUCCESS: 'Gambar berhasil diupload!',
  PREDICTION_SUCCESS: 'Diagnosis berhasil dilakukan!',
  VALIDATION_PASSED: 'Gambar telah divalidasi dan siap untuk dianalisis.'
};

// Default Export for backward compatibility
const constants = {
  APP_CONFIG,
  DISEASE_INFO,
  IMAGE_VALIDATION,
  PROCESSING_STEPS,
  METADATA,
  API_CONFIG,
  UI_CONFIG,
  MODEL_CONFIG,
  CLASSES,
  THRESHOLDS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
};

export default constants;
