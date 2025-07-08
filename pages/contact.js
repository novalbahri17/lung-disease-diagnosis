import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      content: "support@lungdiagnosis.ai",
      description: "Get help with technical issues or general inquiries"
    },
    {
      icon: Phone,
      title: "Phone Support",
      content: "+1 (555) 123-4567",
      description: "Monday - Friday, 9:00 AM - 6:00 PM EST"
    },
    {
      icon: MapPin,
      title: "Office Location",
      content: "123 Medical Plaza, Suite 456\nBoston, MA 02101",
      description: "Visit us for in-person consultations"
    },
    {
      icon: Clock,
      title: "Response Time",
      content: "< 24 hours",
      description: "We aim to respond to all inquiries promptly"
    }
  ];

  const faqItems = [
    {
      question: "How accurate is the AI diagnosis?",
      answer: "Our AI model achieves over 95% accuracy on validated datasets. However, it should always be used as a diagnostic aid alongside professional medical judgment."
    },
    {
      question: "What image formats are supported?",
      answer: "We support JPEG, PNG, and DICOM formats. Images should be chest X-rays with good quality and proper orientation."
    },
    {
      question: "Is my medical data secure?",
      answer: "Yes, we use enterprise-grade encryption and comply with HIPAA regulations. Your data is never stored permanently on our servers."
    },
    {
      question: "Can I integrate this with my hospital system?",
      answer: "Yes, we offer API integration and custom solutions for healthcare institutions. Contact our enterprise team for more details."
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Contact Us - Lung Disease Diagnosis AI</title>
        <meta name="description" content="Get in touch with our team for support, partnerships, or questions about our AI-powered lung disease diagnosis platform." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Have questions about our AI diagnosis platform? We're here to help. 
              Reach out to our team for support, partnerships, or technical inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-start space-x-4">
                        <info.icon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {info.title}
                          </h3>
                          <p className="text-gray-900 font-medium mb-1 whitespace-pre-line">
                            {info.content}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Send us a Message
                  </h2>
                  
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Full Name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Your full name"
                        />
                        <Input
                          label="Email Address"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                      
                      <Input
                        label="Inquiry Type"
                        type="select"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        options={[
                          { value: 'general', label: 'General Inquiry' },
                          { value: 'technical', label: 'Technical Support' },
                          { value: 'partnership', label: 'Partnership' },
                          { value: 'enterprise', label: 'Enterprise Solutions' },
                          { value: 'feedback', label: 'Feedback' }
                        ]}
                      />
                      
                      <Input
                        label="Subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Brief description of your inquiry"
                      />
                      
                      <Input
                        label="Message"
                        type="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                      />
                      
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center bg-blue-50 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Enterprise Solutions
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Looking to integrate our AI diagnosis platform into your healthcare system? 
                We offer custom solutions, API access, and dedicated support for enterprise clients.
              </p>
              <Button variant="primary" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Contact Enterprise Team
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
