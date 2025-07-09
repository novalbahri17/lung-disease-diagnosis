// DiagnosisResult component - Menampilkan hasil diagnosis AI dan rekomendasi

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Heart, 
  TrendingUp, 
  FileText, 
  Shield,
  Info,
  ExternalLink,
  Download,
  Share2,
  Clock,
  User,
  Stethoscope,
  Upload
} from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { DISEASE_INFO } from '../utils/constants';

const DiagnosisResult = ({ result, imageData, onReset, validationResults }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);

  if (!result) return null;

  const { 
    prediction, 
    confidence, 
    confidence_scores, 
    processing_time, 
    model_info,
    recommendations = [],
    metadata = {}
  } = result;

  // Ambil informasi penyakit
  const diseaseInfo = DISEASE_INFO[prediction] || DISEASE_INFO.Normal;
  
  // Tentukan severity berdasarkan confidence dan jenis penyakit
  const getSeverityLevel = () => {
    if (prediction === 'Normal') return 'low';
    if (confidence > 0.8) return 'high';
    if (confidence > 0.6) return 'medium';
    return 'low';
  };

  const severityLevel = getSeverityLevel();
  
  // Styling berdasarkan severity
  const getSeverityStyles = () => {
    switch (severityLevel) {
      case 'high':
        return {
          border: 'border-red-200',
          bg: 'bg-red-50',
          icon: 'text-red-500',
          text: 'text-red-700'
        };
      case 'medium':
        return {
          border: 'border-orange-200',
          bg: 'bg-orange-50',
          icon: 'text-orange-500',
          text: 'text-orange-700'
        };
      default:
        return {
          border: 'border-green-200',
          bg: 'bg-green-50',
          icon: 'text-green-500',
          text: 'text-green-700'
        };
    }
  };

  const styles = getSeverityStyles();

  // Format timestamp
  const formatTimestamp = () => {
    return new Date().toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Export hasil diagnosis
  const handleExport = () => {
    const exportData = {
      timestamp: formatTimestamp(),
      diagnosis: {
        prediction,
        confidence: Math.round(confidence * 100),
        severity: severityLevel
      },
      details: {
        confidence_scores,
        processing_time,
        model_info
      },
      recommendations,
      metadata: {
        ...metadata,
        image_validation: validationResults
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagnosis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Hasil Diagnosis */}
      <Card className={`${styles.border} ${styles.bg} border-2`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {prediction === 'Normal' ? (
              <CheckCircle className={`w-8 h-8 ${styles.icon}`} />
            ) : (
              <AlertTriangle className={`w-8 h-8 ${styles.icon}`} />
            )}
            <div>
              <h2 className={`text-2xl font-bold ${styles.text}`}>
                {diseaseInfo.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Kepercayaan: {Math.round(confidence * 100)}%
              </p>
            </div>
          </div>
          
          <div className="text-right text-sm text-gray-500">
            <p className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatTimestamp()}
            </p>
            <p className="flex items-center mt-1">
              <Stethoscope className="w-4 h-4 mr-1" />
              {processing_time}ms
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className={`text-lg ${styles.text}`}>
            {diseaseInfo.description}
          </p>
        </div>
      </Card>

      {/* Confidence Breakdown */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            Skor Kepercayaan
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Sembunyikan' : 'Tampilkan'} Detail
          </Button>
        </div>

        <div className="space-y-3">
          {Object.entries(confidence_scores || {}).map(([disease, score]) => {
            const percentage = Math.round(score * 100);
            const isMain = disease === prediction;
            
            return (
              <div key={disease} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isMain ? 'font-semibold' : 'text-gray-600'}`}>
                    {DISEASE_INFO[disease]?.name || disease}
                  </span>
                  <span className={`text-sm ${isMain ? 'font-semibold' : 'text-gray-600'}`}>
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isMain ? 'bg-blue-500' : 'bg-gray-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {showDetails && model_info && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Model Information</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Model: {model_info.name || 'EfficientNetB0'}</p>
              <p>Version: {model_info.version || '1.0.0'}</p>
              <p>Input Shape: {model_info.input_shape || '224x224x3'}</p>
              <p>Classes: {model_info.num_classes || '4 diseases'}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Validation Results */}
      {validationResults && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-500" />
              Hasil Validasi Gambar
            </h3>
          </div>

          <div className="space-y-3">
            {/* Validation Status */}
            <div className={`p-3 rounded-lg ${
              validationResults.isValid 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center space-x-2">
                {validationResults.isValid ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                )}
                <span className={`font-medium ${
                  validationResults.isValid ? 'text-green-800' : 'text-red-800'
                }`}>
                  {validationResults.isValid ? 'Gambar Valid' : 'Gambar Tidak Valid'}
                </span>
              </div>
            </div>

            {/* Quality Metrics */}
            {validationResults.quality && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Metrik Kualitas:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Resolusi:</span>
                    <span className="ml-2 font-medium">
                      {validationResults.quality.width}×{validationResults.quality.height}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Format:</span>
                    <span className="ml-2 font-medium">{validationResults.quality.format}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Ukuran:</span>
                    <span className="ml-2 font-medium">
                      {(validationResults.quality.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Kualitas:</span>
                    <span className="ml-2 font-medium">
                      {validationResults.quality.quality || 'Baik'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Warnings */}
            {validationResults.warnings && validationResults.warnings.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-orange-800 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Peringatan:
                </h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  {validationResults.warnings.map((warning, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {validationResults.recommendations && validationResults.recommendations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  Rekomendasi:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  {validationResults.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Errors */}
            {validationResults.errors && validationResults.errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-red-800 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Error:
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {validationResults.errors.map((error, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Rekomendasi Medis */}
      {recommendations.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Rekomendasi Medis
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRecommendations(!showRecommendations)}
            >
              {showRecommendations ? 'Hide' : 'Show'}
            </Button>
          </div>

          {showRecommendations && (
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900">{rec.title}</h4>
                    <p className="text-sm text-blue-700 mt-1">{rec.description}</p>
                    {rec.urgency && (
                      <span className={`inline-block text-xs px-2 py-1 rounded-full mt-2 ${
                        rec.urgency === 'urgent' 
                          ? 'bg-red-100 text-red-700' 
                          : rec.urgency === 'moderate'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {rec.urgency === 'urgent' ? 'Segera' : 
                         rec.urgency === 'moderate' ? 'Moderate' : 'Normal'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Medical Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">
              Disclaimer Medis Penting
            </h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p>
                🏥 <strong>Hasil diagnosis AI ini bukan pengganti konsultasi medis profesional.</strong>
              </p>
              <p>
                👨‍⚕️ Selalu konsultasikan hasil dengan dokter spesialis radiologi atau pulmonologi 
                untuk diagnosis yang akurat dan rencana pengobatan yang tepat.
              </p>
              <p>
                ⚠️ Model AI dapat mengalami error atau bias. Jangan menggunakan hasil ini 
                sebagai satu-satunya dasar keputusan medis.
              </p>
              <p>
                📞 Jika mengalami gejala darurat (sesak napas berat, nyeri dada), 
                segera hubungi layanan darurat medis.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={handleExport}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Hasil</span>
        </Button>

        <Button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Hasil Diagnosis AI',
                text: `Diagnosis: ${diseaseInfo.name} (${Math.round(confidence * 100)}% confidence)`,
              });
            }
          }}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Bagikan</span>
        </Button>

        <Button
          onClick={onReset}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Diagnosis Baru</span>
        </Button>
      </div>
    </div>
  );
};

export default DiagnosisResult;
