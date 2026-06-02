"use client"

import { motion } from "framer-motion"
import { Shield, Lock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CerberSection() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 w-20 h-20 flex items-center justify-center mb-6 text-purple-500">
              <Shield className="h-10 w-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Cerber <span className="gradient-text">Security Integration</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We partner with Cerber Security to provide enterprise-grade security solutions for all our digital
              products.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-purple-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Advanced Threat Protection</h3>
                  <p className="text-gray-400">
                    Our solutions include real-time monitoring and protection against the latest cyber threats.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-purple-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Data Encryption</h3>
                  <p className="text-gray-400">
                    End-to-end encryption ensures your sensitive data remains secure at all times.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-purple-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Compliance & Certification</h3>
                  <p className="text-gray-400">
                    Our security measures align with recognized standards including GDPR, HIPAA, and ISO 27001.
                  </p>
                </div>
              </div>
            </div>
            <Link href={'/security'}>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-8 py-6">
              Learn More About Our Security
            </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-96 glass-card rounded-2xl overflow-hidden p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10"></div>

              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center mb-8">
                  <Lock className="h-16 w-16 text-purple-500" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-center">Cerber Security Shield</h3>
                <p className="text-gray-400 text-center mb-6">
                  Our partnership with Cerber Security ensures that all our digital solutions are built with security at
                  their core.
                </p>

                <div className="flex space-x-2">
                  <div className="px-4 py-2 bg-gray-800 rounded-full text-sm">GDPR Compliant</div>
                  <div className="px-4 py-2 bg-gray-800 rounded-full text-sm">ISO 27001</div>
                  <div className="px-4 py-2 bg-gray-800 rounded-full text-sm">HIPAA Ready</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
