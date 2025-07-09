import Head from 'next/head';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import { Heart, Users, Award, BookOpen } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Heart,
      title: "Inovasi Kesehatan",
      description: "Memanfaatkan teknologi AI terdepan untuk merevolusi diagnosis penyakit paru-paru dan meningkatkan hasil perawatan pasien di seluruh dunia."
    },
    {
      icon: Users,
      title: "Tim Ahli",
      description: "Tim kami menggabungkan tenaga medis profesional, peneliti AI, dan insinyur perangkat lunak untuk memberikan solusi yang akurat dan dapat diandalkan."
    },
    {
      icon: Award,
      title: "Akurasi Tinggi",
      description: "Model CNN kami mencapai tingkat akurasi terdepan di industri melalui teknik transfer learning yang canggih."
    },
    {
      icon: BookOpen,
      title: "Berbasis Penelitian",
      description: "Dibangun berdasarkan penelitian medis yang ekstensif dan dataset yang tervalidasi untuk memastikan relevansi klinis dan keandalan."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Kepala Bagian Medis",
      description: "Dokter spesialis paru dengan pengalaman 15+ tahun dalam kedokteran respiratori dan aplikasi AI."
    },
    {
      name: "Alex Chen",
      role: "Pemimpin Penelitian AI",
      description: "PhD dalam Machine Learning dengan keahlian dalam analisis citra medis dan deep learning."
    },
    {
      name: "Maria Rodriguez",
      role: "Insinyur Perangkat Lunak",
      description: "Full-stack developer yang mengkhususkan diri dalam aplikasi kesehatan dan desain pengalaman pengguna."
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Tentang Kami - AI Diagnosis Penyakit Paru-paru</title>
        <meta name="description" content="Pelajari tentang misi kami untuk merevolusi diagnosis penyakit paru-paru menggunakan kecerdasan buatan dan pencitraan medis." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tentang Misi Kami
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Kami berdedikasi untuk mentransformasi layanan kesehatan melalui diagnosis penyakit paru-paru bertenaga AI, 
              membuat analisis medis yang akurat dapat diakses oleh penyedia layanan kesehatan di seluruh dunia.
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Misi Kami</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Deteksi dini penyakit paru-paru dapat menyelamatkan nyawa. Platform bertenaga AI kami menyediakan 
                  tenaga medis profesional dengan alat diagnostik canggih yang menganalisis foto rontgen dada 
                  dengan akurasi yang luar biasa, membantu mengidentifikasi kondisi seperti pneumonia, COVID-19, 
                  dan penyakit pernapasan lainnya.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Dengan menggabungkan jaringan saraf konvolusional terdepan dengan teknik transfer learning, 
                  kami telah menciptakan sistem yang dapat membantu tenaga medis profesional dalam membuat 
                  diagnosis yang lebih cepat dan akurat, pada akhirnya meningkatkan perawatan dan hasil pasien.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Statistik Utama</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Akurasi Diagnostik</span>
                    <span className="font-semibold text-blue-600">95.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waktu Pemrosesan</span>
                    <span className="font-semibold text-blue-600">&lt; 30 detik</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kondisi yang Didukung</span>
                    <span className="font-semibold text-blue-600">8+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mitra Kesehatan</span>
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
              Yang Membedakan Kami
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
              Kenali Tim Kami
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
