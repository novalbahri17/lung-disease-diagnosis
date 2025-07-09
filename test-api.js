// Quick test script to check API response structure

async function testAPI() {
  try {
    // Create a simple test image data URL (1x1 pixel)
    const testImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    
    const response = await fetch('http://localhost:3007/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: testImageData,
        filename: 'test_image.png',
        options: {
          enhance: true,
          debug: true
        }
      })
    });

    const data = await response.json();
    
    console.log('=== API Response Structure ===');
    console.log('Status:', response.status);
    console.log('Success:', data.success);
    
    if (data.success && data.prediction) {
      console.log('\n=== Prediction Object ===');
      console.log('Prediction:', data.prediction.prediction);
      console.log('Confidence:', data.prediction.confidence);
      console.log('Confidence Scores Keys:', Object.keys(data.prediction.confidence_scores || {}));
      console.log('Confidence Scores:', data.prediction.confidence_scores);
      console.log('Recommendations Count:', data.prediction.recommendations?.length || 0);
      console.log('Model Info:', data.prediction.model_info);
    } else {
      console.log('Error:', data.error || data.message);
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAPI();
