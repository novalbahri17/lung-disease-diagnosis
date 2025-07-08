# 🔍 API Documentation

This document describes the API endpoints available in the Lung Disease Diagnosis application.

## Base URL

**Development**: `http://localhost:3000/api`
**Production**: `https://your-domain.vercel.app/api`

## Authentication

Currently, no authentication is required for API endpoints. This is suitable for the demo/educational version.

> **Note**: For production use with real medical data, implement proper authentication and authorization.

## Endpoints

### 1. Health Check

**Endpoint**: `GET /api/health`

**Description**: Check if the API is running and responsive.

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0",
  "environment": "development"
}
```

**cURL Example**:
```bash
curl -X GET http://localhost:3000/api/health
```

---

### 2. AI Prediction

**Endpoint**: `POST /api/predict`

**Description**: Analyze a chest X-ray image and return AI diagnosis results.

**Request Body**:
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
  "metadata": {
    "filename": "chest-xray.jpg",
    "size": 2048576,
    "mimeType": "image/jpeg"
  }
}
```

**Response**:
```json
{
  "success": true,
  "prediction": {
    "condition": "Normal",
    "confidence": 87.5,
    "riskLevel": "low",
    "allProbabilities": [
      {
        "condition": "Normal",
        "probability": 87.5,
        "description": "No signs of disease detected"
      },
      {
        "condition": "Pneumonia",
        "probability": 8.2,
        "description": "Bacterial or viral lung infection"
      },
      {
        "condition": "COVID-19",
        "probability": 3.1,
        "description": "COVID-19 related pneumonia"
      },
      {
        "condition": "Tuberculosis",
        "probability": 1.2,
        "description": "Tuberculous infection"
      }
    ]
  },
  "analysis": {
    "processingTime": 1250,
    "imageQuality": "good",
    "recommendations": [
      "Image quality is good for analysis",
      "No immediate medical attention required",
      "Regular check-ups recommended"
    ]
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_IMAGE",
    "message": "Invalid image format or corrupted file",
    "details": "Supported formats: JPEG, PNG, DICOM"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
    "metadata": {
      "filename": "xray.jpg",
      "size": 1024000,
      "mimeType": "image/jpeg"
    }
  }'
```

## Request/Response Examples

### Successful Pneumonia Detection

**Request**:
```json
{
  "image": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "metadata": {
    "filename": "pneumonia-xray.jpg",
    "size": 1536000,
    "mimeType": "image/jpeg"
  }
}
```

**Response**:
```json
{
  "success": true,
  "prediction": {
    "condition": "Pneumonia",
    "confidence": 92.3,
    "riskLevel": "high",
    "allProbabilities": [
      {
        "condition": "Pneumonia",
        "probability": 92.3,
        "description": "Bacterial or viral lung infection"
      },
      {
        "condition": "Normal",
        "probability": 4.1,
        "description": "No signs of disease detected"
      },
      {
        "condition": "COVID-19",
        "probability": 2.8,
        "description": "COVID-19 related pneumonia"
      },
      {
        "condition": "Tuberculosis",
        "probability": 0.8,
        "description": "Tuberculous infection"
      }
    ]
  },
  "analysis": {
    "processingTime": 1450,
    "imageQuality": "excellent",
    "recommendations": [
      "High confidence pneumonia detection",
      "Immediate medical consultation recommended",
      "Consider antibiotic treatment",
      "Follow-up X-ray in 1-2 weeks"
    ]
  },
  "timestamp": "2024-01-15T10:35:00.000Z"
}
```

## Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INVALID_METHOD` | Invalid HTTP method | 405 |
| `MISSING_IMAGE` | No image data provided | 400 |
| `INVALID_IMAGE` | Invalid image format | 400 |
| `IMAGE_TOO_LARGE` | Image exceeds size limit | 413 |
| `PROCESSING_ERROR` | AI model processing failed | 500 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |

## Rate Limiting

**Current Limits**:
- 100 requests per hour per IP address
- 10 MB maximum image size
- Supported formats: JPEG, PNG, DICOM

## Image Requirements

### Supported Formats
- **JPEG** (.jpg, .jpeg)
- **PNG** (.png)
- **DICOM** (.dcm) - *Future implementation*

### Image Specifications
- **Minimum Size**: 224x224 pixels
- **Maximum Size**: 10 MB
- **Recommended Size**: 512x512 to 1024x1024 pixels
- **Color**: Grayscale preferred, RGB supported

### Quality Guidelines
- **Good**: Clear chest X-ray with visible lung fields
- **Acceptable**: Slightly blurred but identifiable structures
- **Poor**: Very blurry, incomplete, or non-chest images

## Client Implementation Examples

### JavaScript (Frontend)

```javascript
// Upload and predict
async function predictImage(imageFile) {
  const formData = new FormData();
  const base64 = await convertToBase64(imageFile);
  
  const response = await fetch('/api/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: base64,
      metadata: {
        filename: imageFile.name,
        size: imageFile.size,
        mimeType: imageFile.type
      }
    })
  });
  
  return await response.json();
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
```

### Python (Backend Integration)

```python
import requests
import base64

def predict_xray(image_path):
    # Read and encode image
    with open(image_path, 'rb') as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        data_uri = f"data:image/jpeg;base64,{encoded_image}"
    
    # API request
    response = requests.post('http://localhost:3000/api/predict', json={
        'image': data_uri,
        'metadata': {
            'filename': image_path.split('/')[-1],
            'size': len(encoded_image),
            'mimeType': 'image/jpeg'
        }
    })
    
    return response.json()

# Usage
result = predict_xray('chest_xray.jpg')
print(f"Diagnosis: {result['prediction']['condition']}")
print(f"Confidence: {result['prediction']['confidence']}%")
```

## Best Practices

### Client-Side
1. **Validate images** before sending to API
2. **Show loading states** during processing
3. **Handle errors gracefully** with user-friendly messages
4. **Compress large images** to reduce upload time
5. **Cache results** for recently analyzed images

### Server-Side Integration
1. **Implement retry logic** for failed requests
2. **Use rate limiting** to prevent abuse
3. **Log API usage** for monitoring
4. **Validate responses** before processing
5. **Handle timeouts** appropriately

## Future Enhancements

### Planned API Features
- [ ] User authentication and sessions
- [ ] Image history and reports
- [ ] Batch processing for multiple images
- [ ] Real-time WebSocket updates
- [ ] DICOM file support
- [ ] Integration with PACS systems

### Model Improvements
- [ ] Higher accuracy models
- [ ] Grad-CAM visualization
- [ ] Additional disease detection
- [ ] Confidence calibration
- [ ] Ensemble methods

---

**📝 Note**: This API is designed for educational and demonstration purposes. For production medical use, ensure compliance with healthcare regulations and implement proper security measures.
