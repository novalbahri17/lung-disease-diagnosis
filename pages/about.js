import Head from 'next/head';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import { Heart, Users, Award, BookOpen } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Heart,
      title: "Healthcare Innovation",
      description: "Leveraging cutting-edge AI technology to revolutionize lung disease diagnosis and improve patient outcomes worldwide."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our team combines medical professionals, AI researchers, and software engineers to deliver accurate and reliable solutions."
    },
    {
      icon: Award,
      title: "High Accuracy",
      description: "Our CNN-based models achieve industry-leading accuracy rates through advanced transfer learning techniques."
    },
    {
      icon: BookOpen,
      title: "Research-Based",
      description: "Built on extensive medical research and validated datasets to ensure clinical relevance and reliability."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      description: "Pulmonologist with 15+ years of experience in respiratory medicine and AI applications."
    },
    {
      name: "Alex Chen",
      role: "AI Research Lead",
      description: "PhD in Machine Learning with expertise in medical image analysis and deep learning."
    },
    {
      name: "Maria Rodriguez",
      role: "Software Engineer",
      description: "Full-stack developer specializing in healthcare applications and user experience design."
    }
  ];

  return (
    <Layout>
      <Head>
        <title>About Us - Lung Disease Diagnosis AI</title>
        <meta name="description" content="Learn about our mission to revolutionize lung disease diagnosis using artificial intelligence and medical imaging." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Our Mission
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're dedicated to transforming healthcare through AI-powered lung disease diagnosis, 
              making accurate medical analysis accessible to healthcare providers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Early detection of lung diseases can save lives. Our AI-powered platform provides 
                  healthcare professionals with advanced diagnostic tools that analyze chest X-rays 
                  with remarkable accuracy, helping to identify conditions like pneumonia, COVID-19, 
                  and other respiratory ailments.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  By combining state-of-the-art convolutional neural networks with transfer learning 
                  techniques, we've created a system that can assist medical professionals in making 
                  faster, more accurate diagnoses, ultimately improving patient care and outcomes.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diagnostic Accuracy</span>
                    <span className="font-semibold text-blue-600">95.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="font-semibold text-blue-600">&lt; 30 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supported Conditions</span>
                    <span className="font-semibold text-blue-600">8+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Healthcare Partners</span>
                    <span className="font-semibold text-blue-600">50+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What Sets Us Apart
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6 h-full">
                  <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Technology
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our platform is built on advanced machine learning architectures, including:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Convolutional Neural Networks
                </h3>
                <p className="text-gray-600">
                  Deep CNN architectures optimized for medical image analysis and pattern recognition.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Transfer Learning
                </h3>
                <p className="text-gray-600">
                  Pre-trained models fine-tuned on medical datasets for superior diagnostic accuracy.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
