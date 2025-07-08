# Development Guide

This guide provides detailed information for developers working on the Lung Disease Diagnosis AI application.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Development Setup](#development-setup)
3. [Adding AI/ML Integration](#adding-aiml-integration)
4. [API Development](#api-development)
5. [Component Development](#component-development)
6. [Testing](#testing)
7. [Best Practices](#best-practices)

## Project Structure

```
lung-disease-diagnosis/
├── components/           # Reusable React components
│   ├── ui/              # Basic UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── Loading.jsx
│   ├── DiagnosisResult.jsx
│   ├── ImageUpload.jsx
│   └── Layout.jsx
├── docs/                # Documentation
│   ├── deployment.md
│   └── development.md
├── pages/               # Next.js pages (routing)
│   ├── api/            # API routes
│   │   ├── health.js
│   │   └── predict.js
│   ├── _app.js         # App wrapper
│   ├── _document.js    # HTML document
│   ├── about.js        # About page
│   ├── contact.js      # Contact page
│   └── index.js        # Home page
├── public/             # Static assets
├── styles/             # CSS styles
│   └── globals.css
├── utils/              # Utility functions
│   ├── constants.js
│   ├── imageProcessing.js
│   └── validation.js
├── .env.example        # Environment variables template
├── .env.local          # Local environment variables
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md          # Project documentation
```

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git for version control
- VS Code (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lung-disease-diagnosis.git
cd lung-disease-diagnosis

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

## Adding AI/ML Integration

### Current Implementation

The current implementation uses a mock AI service for demonstration. To integrate real AI/ML:

### Option 1: TensorFlow.js (Client-side)

1. **Install TensorFlow.js**
```bash
npm install @tensorflow/tfjs @tensorflow/tfjs-node
```

2. **Create model loader utility**
```javascript
// utils/modelLoader.js
import * as tf from '@tensorflow/tfjs';

export class ModelLoader {
  constructor() {
    this.model = null;
    this.isLoaded = false;
  }

  async loadModel(modelUrl) {
    try {
      console.log('Loading model from:', modelUrl);
      this.model = await tf.loadLayersModel(modelUrl);
      this.isLoaded = true;
      console.log('Model loaded successfully');
      return this.model;
    } catch (error) {
      console.error('Error loading model:', error);
      throw error;
    }
  }

  async predict(imageData) {
    if (!this.isLoaded || !this.model) {
      throw new Error('Model not loaded');
    }

    try {
      // Preprocess image
      const tensor = tf.browser.fromPixels(imageData)
        .resizeBilinear([224, 224])
        .expandDims(0)
        .div(255.0);

      // Make prediction
      const prediction = await this.model.predict(tensor);
      const result = await prediction.data();
      
      // Cleanup tensors
      tensor.dispose();
      prediction.dispose();

      return result;
    } catch (error) {
      console.error('Prediction error:', error);
      throw error;
    }
  }
}
```

3. **Update prediction API**
```javascript
// pages/api/predict.js
import { ModelLoader } from '../../utils/modelLoader';

const modelLoader = new ModelLoader();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Load model if not already loaded
    if (!modelLoader.isLoaded) {
      await modelLoader.loadModel('/models/lung-disease-model.json');
    }

    const { imageData } = req.body;
    const prediction = await modelLoader.predict(imageData);
    
    // Process prediction results
    const confidence = Math.max(...prediction);
    const predictedClass = prediction.indexOf(confidence);
    
    const classes = ['Normal', 'Pneumonia', 'COVID-19', 'Tuberculosis'];
    
    res.status(200).json({
      prediction: classes[predictedClass],
      confidence: confidence * 100,
      allProbabilities: prediction.map((prob, idx) => ({
        class: classes[idx],
        probability: prob * 100
      }))
    });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Prediction failed' });
  }
}
```

### Option 2: External AI Service Integration

1. **Python/Flask AI Service**
```python
# ai-service/app.py
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)

# Load model
model = tf.keras.models.load_model('path/to/your/model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get image from request
        image_data = request.json['image']
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Preprocess image
        image = image.resize((224, 224))
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        
        # Make prediction
        prediction = model.predict(image_array)
        
        classes = ['Normal', 'Pneumonia', 'COVID-19', 'Tuberculosis']
        predicted_class = classes[np.argmax(prediction)]
        confidence = float(np.max(prediction))
        
        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence * 100,
            'all_probabilities': [
                {'class': cls, 'probability': float(prob * 100)}
                for cls, prob in zip(classes, prediction[0])
            ]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

2. **Update Next.js API to call external service**
```javascript
// pages/api/predict.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;
    
    // Call external AI service
    const response = await fetch('http://your-ai-service.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Prediction failed' });
  }
}
```

### Adding Grad-CAM Visualization

```javascript
// utils/gradcam.js
import * as tf from '@tensorflow/tfjs';

export async function generateGradCAM(model, image, classIndex) {
  // Get the last convolutional layer
  const lastConvLayer = model.layers.find(layer => 
    layer.getClassName() === 'Conv2D'
  );
  
  // Create a model that maps the input image to the activations
  const gradModel = tf.model({
    inputs: model.inputs,
    outputs: [lastConvLayer.output, model.output]
  });

  // Compute gradients
  const tape = tf.variableGrads(() => {
    const [convOutputs, predictions] = gradModel.predict(image);
    return predictions.gather([classIndex], 1);
  });

  const gradients = tape.grads[lastConvLayer.output.id];
  
  // Generate heatmap
  const pooledGradients = tf.mean(gradients, [0, 1, 2]);
  const convOutputs = gradModel.predict(image)[0];
  
  // Multiply each channel by the corresponding gradient
  const heatmap = tf.sum(
    tf.mul(convOutputs, pooledGradients), 
    -1
  );

  return heatmap;
}
```

## API Development

### Adding New Endpoints

1. **Create API route file**
```javascript
// pages/api/new-endpoint.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGet(req, res) {
  try {
    // Implementation
    res.status(200).json({ data: 'success' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Error Handling

```javascript
// utils/apiErrorHandler.js
export function handleApiError(error, res) {
  console.error('API Error:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.message
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }

  return res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
}
```

## Component Development

### Creating New Components

1. **Follow naming conventions**
```
PascalCase for component files: MyComponent.jsx
camelCase for utility functions: myUtilFunction.js
kebab-case for page routes: my-page.js
```

2. **Component template**
```javascript
// components/MyComponent.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ prop1, prop2, children }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <div className="my-component">
      {children}
    </div>
  );
};

MyComponent.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number,
  children: PropTypes.node
};

MyComponent.defaultProps = {
  prop2: 0
};

export default MyComponent;
```

### Styling Guidelines

1. **Use Tailwind CSS classes**
2. **Responsive design first**
3. **Consistent spacing (4, 8, 12, 16px)**
4. **Semantic color usage**

```javascript
// Good
<div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
  <h2 className="text-xl font-semibold text-gray-900 mb-2">Title</h2>
  <p className="text-gray-600">Content</p>
</div>

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## Testing

### Unit Testing Setup

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

### Example Tests

```javascript
// __tests__/components/Button.test.js
import { render, screen } from '@testing-library/react';
import Button from '../../components/ui/Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies variant classes', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
  });
});
```

## Best Practices

### Code Organization

1. **One component per file**
2. **Group related components in folders**
3. **Use barrel exports for cleaner imports**
4. **Keep components small and focused**

### Performance

1. **Use React.memo for expensive components**
```javascript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});
```

2. **Lazy load components**
```javascript
const LazyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loading />
});
```

3. **Optimize images**
```javascript
import Image from 'next/image';

<Image
  src="/image.jpg"
  width={500}
  height={300}
  alt="Description"
  priority={isAboveFold}
/>
```

### Security

1. **Validate all inputs**
2. **Sanitize user data**
3. **Use environment variables for secrets**
4. **Implement proper error boundaries**

### Accessibility

1. **Use semantic HTML**
2. **Add proper ARIA labels**
3. **Ensure keyboard navigation**
4. **Maintain color contrast ratios**

```javascript
<button
  aria-label="Upload chest X-ray image"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  Upload Image
</button>
```

## Contributing

1. **Create feature branch**: `git checkout -b feature/new-feature`
2. **Follow coding standards**
3. **Write tests for new features**
4. **Update documentation**
5. **Create pull request**

### Commit Message Format

```
type(scope): description

feat(api): add new prediction endpoint
fix(ui): resolve mobile responsive issues
docs(readme): update installation instructions
```

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [Jest Testing Framework](https://jestjs.io/docs)

---

For questions or contributions, please open an issue or contact the development team.
