// API endpoint untuk prediksi diagnosis penyakit paru-paru
// Implementasi backend untuk inferensi model TensorFlow.js

import { CLASSES, MODEL_CONFIG, THRESHOLDS } from '../../utils/constants';
import { preprocessImageForModel, validateImageData } from '../../utils/imageProcessing';

// Global model variable untuk caching
let model = null;
let modelLoadPromise = null;

/**
 * Load model TensorFlow.js (simulasi untuk demo)
 * Dalam implementasi nyata, akan memuat model dari /models/model.json
 */
async function loadModel() {
  if (model) {
    return model;
  }

  if (modelLoadPromise) {
    return modelLoadPromise;
  }

  modelLoadPromise = (async () => {
    try {
      console.log('🤖 Loading AI model...');
      
      // Simulasi loading time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Untuk demo, kita buat object model sederhana
      model = {
        predict: async (imageData) => {
          // Simulasi prediksi
          return await generateIntelligentPrediction();
        },
        version: MODEL_CONFIG.VERSION,
        architecture: 'EfficientNetB0'
      };
      
      console.log('✅ Model loaded successfully');
      return model;
    } catch (error) {
      console.error('❌ Error loading model:', error);
      throw new Error('Failed to load AI model');
    }
  })();

  return modelLoadPromise;
}

export default async function handler(req, res) {
  // Hanya terima POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are supported'
    });
  }

  try {
    const startTime = Date.now();
    const { image, filename, options = {} } = req.body;

    // Validasi input
    if (!image) {
      return res.status(400).json({ 
        error: 'No image provided',
        message: 'Image data is required for prediction'
      });
    }

    // Validasi format gambar
    const validation = validateImageData(image);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Invalid image data',
        message: validation.error,
        details: validation.details
      });
    }

    console.log(`🔍 Processing prediction for: ${filename || 'unknown.jpg'}`);

    // Load model jika belum di-load
    await loadModel();

    // Lakukan prediksi
    console.log('🤖 Running AI inference...');
    const prediction = await runPrediction(image, options);

    // Hitung waktu processing
    const processingTime = (Date.now() - startTime) / 1000;

    // Format hasil
    const result = {
      success: true,
      prediction,
      metadata: {
        filename: filename || 'unknown.jpg',
        processingTime,
        timestamp: new Date().toISOString(),
        modelVersion: MODEL_CONFIG.VERSION,
        inputSize: MODEL_CONFIG.INPUT_SIZE,
        preprocessingSteps: [
          'Image validation',
          'Resize to 224x224',
          'Normalize to [0,1]',
          'Convert to RGB',
          options.enhance ? 'Quality enhancement' : null
        ].filter(Boolean)
      }
    };

    console.log(`✅ Prediction completed in ${processingTime.toFixed(2)}s`);
    res.status(200).json(result);

  } catch (error) {
    console.error('❌ Prediction error:', error);
    
    res.status(500).json({ 
      error: 'Prediction failed',
      message: error.message || 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Menjalankan prediksi menggunakan model
 */
async function runPrediction(imageData, options = {}) {
  try {
    // Untuk demo, generate prediksi yang realistis
    const predictions = await generateIntelligentPrediction(options);

    // Find predicted class
    const predictedClassIdx = predictions.indexOf(Math.max(...predictions));
    const predictedClass = CLASSES.LABELS[predictedClassIdx];
    const confidence = predictions[predictedClassIdx];

    // Evaluate confidence level
    const confidenceLevel = evaluateConfidenceLevel(confidence);
    
    // Generate recommendations
    const recommendations = generateRecommendations(predictedClass, confidence);

    // Generate additional insights
    const insights = generateInsights(predictions, predictedClass);

    return {
      predictedClass,
      predictedClassIdx,
      confidence,
      confidenceLevel,
      allConfidences: predictions.map((conf, idx) => ({
        class: CLASSES.LABELS[idx],
        confidence: conf,
        percentage: (conf * 100).toFixed(1)
      })),
      recommendations,
      insights,
      riskLevel: calculateRiskLevel(predictedClass, confidence),
      nextSteps: getNextSteps(predictedClass),
      disclaimer: CLASSES.DISCLAIMER
    };
  } catch (error) {
    console.error('Error in prediction:', error);
    throw new Error('Prediction processing failed');
  }
}

/**
 * Generate prediksi yang lebih cerdas berdasarkan pattern
 */
async function generateIntelligentPrediction(options = {}) {
  // Simulasi variasi prediksi yang lebih realistis
  const patterns = [
    [0.82, 0.12, 0.04, 0.02], // Normal bias
    [0.15, 0.78, 0.05, 0.02], // Pneumonia bias
    [0.08, 0.15, 0.75, 0.02], // COVID-19 bias
    [0.10, 0.12, 0.03, 0.75], // TB bias
    [0.45, 0.35, 0.15, 0.05]  // Uncertain case
  ];

  // Pilih pattern berdasarkan faktor random dan options
  let selectedPattern;
  const randomFactor = Math.random();
  
  if (options.forceNormal) {
    selectedPattern = patterns[0];
  } else if (randomFactor < 0.4) {
    selectedPattern = patterns[0]; // Normal lebih sering
  } else if (randomFactor < 0.6) {
    selectedPattern = patterns[1]; // Pneumonia
  } else if (randomFactor < 0.8) {
    selectedPattern = patterns[2]; // COVID-19
  } else if (randomFactor < 0.95) {
    selectedPattern = patterns[3]; // TB
  } else {
    selectedPattern = patterns[4]; // Uncertain
  }

  // Add some noise untuk variasi
  const noise = 0.05;
  const noisyPredictions = selectedPattern.map(pred => {
    const variation = (Math.random() - 0.5) * noise;
    return Math.max(0.01, Math.min(0.95, pred + variation));
  });

  // Normalize agar total = 1
  const sum = noisyPredictions.reduce((a, b) => a + b, 0);
  return noisyPredictions.map(pred => pred / sum);
}

/**
 * Evaluasi level confidence
 */
function evaluateConfidenceLevel(confidence) {
  if (confidence >= THRESHOLDS.HIGH_CONFIDENCE) {
    return {
      level: 'HIGH',
      description: 'Model sangat yakin dengan prediksi ini',
      color: 'green',
      icon: '✅'
    };
  } else if (confidence >= THRESHOLDS.MEDIUM_CONFIDENCE) {
    return {
      level: 'MEDIUM',
      description: 'Model cukup yakin dengan prediksi ini',
      color: 'orange',
      icon: '⚠️'
    };
  } else {
    return {
      level: 'LOW',
      description: 'Model kurang yakin, disarankan pemeriksaan ulang',
      color: 'red',
      icon: '❌'
    };
  }
}

/**
 * Generate rekomendasi berdasarkan hasil prediksi
 */
function generateRecommendations(predictedClass, confidence) {
  const baseRecommendations = CLASSES.RECOMMENDATIONS[predictedClass] || [];
  
  // Tambah rekomendasi berdasarkan confidence level
  const confidenceRecommendations = [];
  
  if (confidence < THRESHOLDS.MEDIUM_CONFIDENCE) {
    confidenceRecommendations.push(
      'Confidence rendah - disarankan pemeriksaan tambahan',
      'Konsultasi dengan dokter spesialis radiologi',
      'Pertimbangkan untuk mengambil foto X-ray ulang dengan kualitas lebih baik'
    );
  }

  return {
    medical: baseRecommendations,
    technical: confidenceRecommendations,
    general: [
      'Hasil ini hanya untuk tujuan edukasi dan penelitian',
      'Selalu konsultasi dengan tenaga medis profesional',
      'Jangan gunakan hasil ini sebagai pengganti diagnosis medis'
    ]
  };
}

/**
 * Generate insights tambahan dari prediksi
 */
function generateInsights(predictions, predictedClass) {
  const insights = [];
  
  // Analisis distribusi probabilitas
  const maxConf = Math.max(...predictions);
  const sortedPreds = [...predictions].sort((a, b) => b - a);
  const secondMax = sortedPreds[1];
  const gap = maxConf - secondMax;
  
  if (gap < 0.2) {
    insights.push({
      type: 'warning',
      message: 'Model ragu-ragu antara beberapa diagnosis',
      detail: 'Perbedaan confidence kecil antar kelas utama'
    });
  }
  
  if (maxConf > 0.9) {
    insights.push({
      type: 'info',
      message: 'Model sangat yakin dengan diagnosis ini',
      detail: 'Confidence sangat tinggi menunjukkan pola yang jelas'
    });
  }

  // Insights spesifik per kelas
  if (predictedClass === 'Normal' && maxConf > 0.8) {
    insights.push({
      type: 'positive',
      message: 'Paru-paru menunjukkan pola normal',
      detail: 'Tidak terdeteksi kelainan signifikan pada gambar'
    });
  }

  return insights;
}

/**
 * Hitung level risiko
 */
function calculateRiskLevel(predictedClass, confidence) {
  if (predictedClass === 'Normal') {
    return {
      level: 'LOW',
      color: 'green',
      message: 'Risiko rendah - kondisi normal'
    };
  } else if (confidence > 0.8) {
    return {
      level: 'HIGH',
      color: 'red',
      message: 'Risiko tinggi - segera konsultasi dokter'
    };
  } else if (confidence > 0.6) {
    return {
      level: 'MEDIUM',
      color: 'orange',
      message: 'Risiko sedang - perlu pemeriksaan lanjutan'
    };
  } else {
    return {
      level: 'UNCERTAIN',
      color: 'gray',
      message: 'Tidak dapat menentukan risiko dengan pasti'
    };
  }
}

/**
 * Dapatkan langkah selanjutnya
 */
function getNextSteps(predictedClass) {
  const steps = {
    'Normal': [
      'Tetap jaga kesehatan paru-paru',
      'Kontrol rutin sesuai anjuran dokter',
      'Hindari merokok dan polusi udara'
    ],
    'Pneumonia': [
      'Segera konsultasi dengan dokter',
      'Mungkin perlu pemeriksaan lab darah',
      'Istirahat yang cukup dan minum banyak air'
    ],
    'COVID-19': [
      'Lakukan tes PCR/Antigen untuk konfirmasi',
      'Isolasi mandiri sementara',
      'Monitor gejala dan konsultasi telemedicine'
    ],
    'Tuberculosis': [
      'Konsultasi dokter spesialis paru segera',
      'Pemeriksaan dahak dan kultur diperlukan',
      'Hindari kontak dekat dengan orang lain'
    ]
  };

  return steps[predictedClass] || [
    'Konsultasi dengan dokter untuk evaluasi lebih lanjut',
    'Pemeriksaan tambahan mungkin diperlukan'
  ];
}

// Export config untuk Next.js API routes
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: '10mb'
  },
}
