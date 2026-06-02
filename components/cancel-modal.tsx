"use client"

import { AlertCircle, X } from "lucide-react"

interface CancelModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CancelModal({ isOpen, onClose }: CancelModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl max-w-md w-full animate-in fade-in-50 zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-white">Cannot Cancel</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded transition-colors">
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Sorry, your order has been dispatched now. If you try to cancel, we will send your order to the alternate
              address.
            </p>

            {/* Alternate Address Info */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-xs font-semibold text-yellow-400 mb-1">ALTERNATE DELIVERY ADDRESS</p>
              <p className="text-sm text-gray-300">Online, Worldwide</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-800">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              OK, Got it
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
