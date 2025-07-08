// API endpoint untuk health check

export default function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        api: 'online',
        model: 'ready',
        database: 'not_required'
      },
      system: {
        platform: process.platform,
        nodeVersion: process.version,
        memory: process.memoryUsage(),
        uptime: process.uptime()
      },
      features: {
        imageUpload: true,
        aiPrediction: true,
        reportGeneration: true,
        gradcam: process.env.NEXT_PUBLIC_ENABLE_GRADCAM === 'true'
      }
    };

    res.status(200).json(healthData);
    
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'error',
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}
