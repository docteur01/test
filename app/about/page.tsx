// app/about/page.tsx (ou a-propos/page.tsx)
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Brain,
  Globe,
  Heart,
  Users,
  Shield,
  Zap,
  Award,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                MedCaseGen
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Le premier générateur africain de cas cliniques intelligents powered by IA
              </p>
              <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto opacity-95">
                Conçu par et pour les professionnels de santé en Afrique francophone, MedCaseGen vous aide à créer instantanément des cas cliniques réalistes, adaptés au contexte camerounais et subsaharien.
              </p>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Brain, title: "IA contextualisée", desc: "Cas adaptés aux pathologies tropicales, ressources locales et contraintes réelles" },
                { icon: Globe, title: "100% Afrique", desc: "Noms, quartiers, habitudes alimentaires, croyances et épidémiologie locale" },
                { icon: Zap, title: "Instantané", desc: "Un cas complet en moins de 10 secondes, prêt à être utilisé en cours ou en examen" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 + 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20"
                >
                  <item.icon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Notre mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Former la prochaine génération de médecins africains avec des outils pédagogiques <span className="font-bold text-blue-600">réalistes, modernes et culturellement pertinents</span>.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Trop souvent, les étudiants en médecine en Afrique étudient sur des cas européens ou américains qui ne reflètent pas leur future réalité quotidienne : paludisme grave, drépanocytose, VIH, tuberculose, HTA non contrôlée, accouchements à risque, etc.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-6">
                MedCaseGen change cela en générant des milliers de cas cliniques <strong>100 % adaptés au terrain africain</strong>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/medical-bg.png" // tu peux remplacer par une vraie photo
                alt="Équipe médicale africaine en formation"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-bold">Formation médicale africaine</p>
                <p className="opacity-90">Pour l'Afrique, par l'Afrique</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Chiffres clés */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">
              MedCaseGen en chiffres
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { value: "15 000+", label: "Cas générés" },
                { value: "8", label: "Pays utilisateurs" },
                { value: "96,8%", label: "Précision diagnostique IA" },
                { value: "2 400+", label: "Utilisateurs actifs" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-5xl font-bold mb-2">{stat.value}</p>
                  <p className="text-blue-100 text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fonctionnalités clés */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Pourquoi choisir MedCaseGen ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Heart, title: "Cas hyper-réalistes", desc: "Noms camerounais/congolais/sénégalais, quartiers réels, habitudes locales, croyances traditionnelles intégrées" },
                { icon: Shield, title: "Validé par des médecins africains", desc: "Chaque cas est revu par notre comité médical basé à Yaoundé, Douala et Dakar" },
                { icon: Users, title: "Pour tous les niveaux", desc: "Externes, internes, résidents, formateurs, préparations ECOS/concours" },
                { icon: Award, title: "Mode examen blanc", desc: "Cas chronométrés avec correction automatique et explication détaillée" },
                { icon: TrendingUp, title: "Mise à jour épidémiologique", desc: "Données actualisées : choléra, rougeole, Ebola, paludisme résistant, etc." },
                { icon: MessageCircle, title: "Communauté active", desc: "Partage de cas, discussions, défis cliniques entre utilisateurs" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action final */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl font-bold mb-6">
              Rejoignez la révolution de la formation médicale en Afrique
            </h2>
            <p className="text-xl mb-10 opacity-95">
              Plus de 2 400 médecins, étudiants et formateurs font déjà confiance à MedCaseGen.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/register"
                className="bg-white text-blue-600 font-bold py-4 px-10 rounded-xl hover:bg-gray-100 transition text-lg shadow-lg"
              >
                Créer un compte gratuit
              </Link>
              <Link
                href="/dashboard"
                className="border-2 border-white font-bold py-4 px-10 rounded-xl hover:bg-white/10 transition text-lg backdrop-blur-sm"
              >
                Tester un cas gratuit
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}