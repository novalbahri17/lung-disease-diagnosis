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
      title: "Dukungan Email",
      content: "novalbahri17@gmail.com",
      description: "Dapatkan bantuan untuk masalah teknis atau pertanyaan umum"
    },
    {
      icon: Phone,
      title: "Dukungan Telepon",
      content: "+62 857-4879-5707",
      description: "Senin - Jumat, 09:00 - 18:00 WIB"
    },
    {
      icon: MapPin,
      title: "Lokasi Kantor",
      content: "Jl. Semolowaru No.45, Menur Pumpungan, Kec. Sukolilo, Surabaya, Jawa Timur 60118",
      description: "Kunjungi kami untuk konsultasi langsung"
    },
    {
      icon: Clock,
      title: "Waktu Respons",
      content: "< 24 jam",
      description: "Kami berusaha merespons semua pertanyaan dengan cepat"
    }
  ];

  const faqItems = [
    {
      question: "Seberapa akurat diagnosis AI ini?",
      answer: "Model AI kami mencapai akurasi lebih dari 95% pada dataset yang tervalidasi. Namun, ini harus selalu digunakan sebagai bantuan diagnostik bersama dengan penilaian medis profesional."
    },
    {
      question: "Format gambar apa saja yang didukung?",
      answer: "Kami mendukung format JPEG, PNG, dan DICOM. Gambar harus berupa foto rontgen dada dengan kualitas baik dan orientasi yang tepat."
    },
    {
      question: "Apakah data medis saya aman?",
      answer: "Ya, kami menggunakan enkripsi tingkat enterprise dan mematuhi regulasi HIPAA. Data Anda tidak pernah disimpan secara permanen di server kami."
    },
    {
      question: "Bisakah saya mengintegrasikan ini dengan sistem rumah sakit?",
      answer: "Ya, kami menawarkan integrasi API dan solusi khusus untuk institusi kesehatan. Hubungi tim enterprise kami untuk detail lebih lanjut."
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Hubungi Kami - AI Diagnosis Penyakit Paru-paru</title>
        <meta name="description" content="Hubungi tim kami untuk dukungan, kemitraan, atau pertanyaan tentang platform diagnosis penyakit paru-paru bertenaga AI kami." />
      </Head>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              Hubungi Kami
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-gray-600">
              Ada pertanyaan tentang platform diagnosis AI kami? Kami siap membantu. 
              Hubungi tim kami untuk dukungan, kemitraan, atau pertanyaan teknis.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Information */}
              <div>
                <h2 className="mb-8 text-3xl font-bold text-gray-900">
                  Informasi Kontak
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-start space-x-4">
                        <info.icon className="flex-shrink-0 w-6 h-6 mt-1 text-blue-600" />
                        <div>
                          <h3 className="mb-1 text-lg font-semibold text-gray-900">
                            {info.title}
                          </h3>
                          <p className="mb-1 font-medium text-gray-900 whitespace-pre-line">
                            {info.content}
                          </p>
                          <p className="text-sm text-gray-600">
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
                  <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    Kirim Pesan
                  </h2>
                  
                  {isSubmitted ? (
                    <div className="py-8 text-center">
                      <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">
                        Pesan Berhasil Dikirim!
                      </h3>
                      <p className="text-gray-600">
                        Terima kasih telah menghubungi kami. Kami akan merespons dalam 24 jam.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Input
                          label="Nama Lengkap"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Nama lengkap Anda"
                        />
                        <Input
                          label="Alamat Email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="email.anda@contoh.com"
                        />
                      </div>
                      
                      <Input
                        label="Jenis Pertanyaan"
                        type="select"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        options={[
                          { value: 'general', label: 'Pertanyaan Umum' },
                          { value: 'technical', label: 'Dukungan Teknis' },
                          { value: 'partnership', label: 'Kemitraan' },
                          { value: 'enterprise', label: 'Solusi Enterprise' },
                          { value: 'feedback', label: 'Masukan' }
                        ]}
                      />
                      
                      <Input
                        label="Subjek"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Deskripsi singkat pertanyaan Anda"
                      />
                      
                      <Input
                        label="Pesan"
                        type="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Silakan berikan detail tentang pertanyaan Anda..."
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
                            <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Kirim Pesan
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
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
              Pertanyaan yang Sering Diajukan
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index} className="p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    {item.question}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
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
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center border-blue-200 bg-blue-50">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Solusi Enterprise
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                Ingin mengintegrasikan platform diagnosis AI kami ke dalam sistem kesehatan Anda? 
                Kami menawarkan solusi khusus, akses API, dan dukungan khusus untuk klien enterprise.
              </p>
              <Button variant="primary" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Hubungi Tim Enterprise
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
