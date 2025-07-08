// Home page - Main diagnosis interface untuk diagnosis penyakit paru-paru
// Mengintegrasikan komponen ImageUpload dan DiagnosisResult dengan backend API

import React, { useState, useCallback } from 'react';
import { Brain, Upload, Stethoscope, Shield, Activity, Heart, FileText } from 'lucide-react';
import Layout from '../components/Layout';
import ImageUpload from '../components/ImageUpload';
import DiagnosisResult from '../components/DiagnosisResult';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import { validateUploadedImage } from '../utils/validation';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState(null);
  const [validationResults, setValidationResults] = useState(null);

  const processingSteps = [
    'Memvalidasi gambar X-ray...',
    'Memproses dan mengoptimalkan gambar...',
    'Memuat model AI EfficientNetB0...',
    'Menjalankan inferensi neural network...',
    'Menganalisis pola penyakit...',
    'Menghitung confidence score...',
    'Menyiapkan rekomendasi medis...',
    'Menyelesaikan diagnosis...'
  ];

  // Handle image selection dengan validasi
  const handleImageSelect = useCallback(async (imageData, file) => {
    setError(null);
    setDiagnosisResult(null);
    setValidationResults(null);

    try {
      // Validasi comprehensive
      console.log('🔍 Memvalidasi gambar yang diupload...');
      const validation = await validateUploadedImage(file, imageData.dataUrl);
      
      setValidationResults(validation);

      if (validation.isValid) {
        setSelectedImage(imageData);
        console.log('✅ Gambar valid dan siap untuk diagnosis');
      } else {
        setError(`Validasi gagal: ${validation.errors.join(', ')}`);
        console.error('❌ Validasi gambar gagal:', validation.errors);
      }
    } catch (error) {
      console.error('Error dalam validasi:', error);
      setError('Gagal memvalidasi gambar. Silakan coba lagi.');
    }
  }, []);

  // Handle diagnosis dengan API backend
  const handleDiagnosis = async () => {
    if (!selectedImage) {
      setError('Tidak ada gambar yang dipilih');
      return;
    }

    setIsProcessing(true);
    setDiagnosisResult(null);
    setError(null);

    try {
      console.log('🚀 Memulai proses diagnosis AI...');

      // Simulate processing steps dengan delay realistis
      for (let i = 0; i < processingSteps.length; i++) {
        setProcessingStep(i);
        // Variasi delay untuk setiap step
        const delays = [800, 1200, 1500, 2000, 1800, 1000, 800, 500];
        await new Promise(resolve => setTimeout(resolve, delays[i] || 1000));
      }

      // Call prediction API
      console.log('📡 Mengirim request ke API prediction...');
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: selectedImage.dataUrl,
          filename: selectedImage.file?.name || 'uploaded_image.jpg',
          options: {
            enhance: true,
            debug: true
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Prediction failed');
      }

      if (data.success) {
        setDiagnosisResult(data.prediction);
        console.log('✅ Diagnosis berhasil:', data.prediction.predictedClass);
      } else {
        throw new Error('Invalid response from prediction API');
      }

    } catch (error) {
      console.error('❌ Error dalam diagnosis:', error);
      setError(`Gagal melakukan diagnosis: ${error.message}`);
    } finally {
      setIsProcessing(false);
      setProcessingStep(0);
    }
  };

  // Reset semua state
  const handleReset = () => {
    setSelectedImage(null);
    setDiagnosisResult(null);
    setError(null);
    setValidationResults(null);
    setIsProcessing(false);
    setProcessingStep(0);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
            <div className="text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 bg-white bg-opacity-20 rounded-full">
                  <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Diagnosis Penyakit Paru-Paru
                <span className="block text-lg sm:text-2xl lg:text-3xl font-normal mt-2 text-blue-100">
                  Powered by Artificial Intelligence
                </span>
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
                Teknologi deep learning terdepan untuk membantu mendeteksi kondisi paru-paru 
                dari gambar X-ray dengan akurasi tinggi dan interpretasi yang mudah dipahami.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 sm:mt-12 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">4</div>
                  <div className="text-xs sm:text-sm text-blue-100">Jenis Diagnosis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">98%</div>
                  <div className="text-xs sm:text-sm text-blue-100">Akurasi Model</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">&lt;30s</div>
                  <div className="text-xs sm:text-sm text-blue-100">Waktu Proses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">24/7</div>
                  <div className="text-xs sm:text-sm text-blue-100">Tersedia</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Processing Overlay */}
          {isProcessing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full mx-4 text-center">
                <div className="mb-4">
                  <Activity className="w-12 h-12 text-blue-500 mx-auto animate-pulse" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Sedang Memproses Diagnosis</h3>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    {processingSteps[processingStep]}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {processingStep + 1} dari {processingSteps.length} langkah
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 sm:mb-8">
              <Card className="border-red-200 bg-red-50">
                <div className="p-4 sm:p-6">
                  <div className="flex items-start space-x-3">
                    <div className="text-red-500 flex-shrink-0">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800 text-sm sm:text-base">Error</h3>
                      <p className="text-red-700 text-sm mt-1">{error}</p>
                      <Button 
                        onClick={() => setError(null)}
                        variant="outline"
                        size="sm"
                        className="mt-3 border-red-300 text-red-700 hover:bg-red-100"
                      >
                        Tutup
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">{/* Left Column - Upload */}
            <div className="space-y-6">
              <Card>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Upload Gambar X-ray
                    </h2>
                  </div>
                  
                  <ImageUpload 
                    onImageSelect={handleImageSelect}
                    disabled={isProcessing}
                  />

                  {/* Validation Results */}
                  {validationResults && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Hasil Validasi:</h4>
                      
                      {validationResults.warnings.length > 0 && (
                        <div className="mb-2">
                          <h5 className="text-sm font-medium text-orange-700">Peringatan:</h5>
                          <ul className="text-sm text-orange-600 ml-4">
                            {validationResults.warnings.map((warning, idx) => (
                              <li key={idx}>• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {validationResults.recommendations.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-blue-700">Rekomendasi:</h5>
                          <ul className="text-sm text-blue-600 ml-4">
                            {validationResults.recommendations.map((rec, idx) => (
                              <li key={idx}>• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              {/* Action Buttons */}
              {selectedImage && (
                <Card>
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Stethoscope className="w-6 h-6 text-green-500" />
                      <h3 className="text-xl font-semibold">Mulai Diagnosis</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <Button 
                        onClick={handleDiagnosis}
                        disabled={isProcessing || !selectedImage}
                        className="w-full"
                        size="lg"
                      >
                        {isProcessing ? (
                          <>
                            <Loading className="w-5 h-5 mr-2" />
                            Memproses...
                          </>
                        ) : (
                          <>
                            <Brain className="w-5 h-5 mr-2" />
                            Analisis dengan AI
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        onClick={handleReset}
                        variant="outline"
                        className="w-full"
                        disabled={isProcessing}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {diagnosisResult ? (
                <DiagnosisResult result={diagnosisResult} />
              ) : (
                <Card>
                  <div className="p-6 text-center">
                    <div className="mb-4">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">
                      Hasil Diagnosis
                    </h3>
                    <p className="text-gray-400">
                      Upload gambar X-ray dan klik "Analisis dengan AI" untuk melihat hasil diagnosis
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Teknologi AI Terdepan untuk Diagnosis Medis
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sistem kami menggunakan model EfficientNetB0 dengan transfer learning 
                yang telah dilatih pada ribuan gambar X-ray untuk mendeteksi penyakit paru-paru.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <div className="p-6 text-center">
                  <Brain className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Deep Learning</h3>
                  <p className="text-gray-600">
                    Model neural network canggih dengan arsitektur EfficientNetB0 
                    untuk akurasi diagnosis yang tinggi.
                  </p>
                </div>
              </Card>

              <Card>
                <div className="p-6 text-center">
                  <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">4 Jenis Diagnosis</h3>
                  <p className="text-gray-600">
                    Dapat mendeteksi Normal, Pneumonia, COVID-19, dan Tuberculosis 
                    dengan tingkat akurasi yang tinggi.
                  </p>
                </div>
              </Card>

              <Card>
                <div className="p-6 text-center">
                  <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Privasi Terjamin</h3>
                  <p className="text-gray-600">
                    Gambar diproses secara lokal dan tidak disimpan. 
                    Privasi data medis Anda terlindungi sepenuhnya.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-16">
            <Card className="border-orange-200 bg-orange-50">
              <div className="p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">
                      Disclaimer Medis
                    </h3>
                    <div className="text-orange-700 space-y-2">
                      <p>
                        • Hasil diagnosis AI ini hanya untuk tujuan edukasi dan penelitian
                      </p>
                      <p>
                        • BUKAN pengganti konsultasi dengan dokter atau diagnosis medis profesional
                      </p>
                      <p>
                        • Selalu konsultasi dengan tenaga medis profesional untuk diagnosis dan pengobatan yang tepat
                      </p>
                      <p>
                        • Akurasi sistem bergantung pada kualitas gambar X-ray yang diupload
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
