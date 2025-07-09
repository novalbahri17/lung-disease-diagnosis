// Test validation function
import { validateUploadedImage } from './utils/validation.js';

// Create a mock file object
const mockFile = {
  name: 'test-xray.jpg',
  size: 150000, // 150KB
  type: 'image/jpeg',
  lastModified: Date.now()
};

const testImageData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

async function testValidation() {
  console.log('Testing validation function...');
  
  try {
    const result = await validateUploadedImage(mockFile, testImageData);
    
    console.log('\n=== Validation Results ===');
    console.log('Is Valid:', result.isValid);
    console.log('Errors:', result.errors);
    console.log('Warnings:', result.warnings);
    console.log('Recommendations:', result.recommendations);
    console.log('File Info:', result.fileInfo);
    
    console.log('\n=== Display Test ===');
    console.log('Will show validation results?', !!result);
    console.log('Has file info?', !!result.fileInfo);
    console.log('Has warnings?', result.warnings && result.warnings.length > 0);
    console.log('Has recommendations?', result.recommendations && result.recommendations.length > 0);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testValidation();
