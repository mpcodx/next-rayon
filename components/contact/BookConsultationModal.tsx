"use client"

import BookConsultationModalV2 from "@/components/book-consultation-modal"

interface BookConsultationModalProps {
  showModal: boolean
  onClose: () => void
}

export default function BookConsultationModal({ showModal, onClose }: BookConsultationModalProps) {
  return <BookConsultationModalV2 isOpen={showModal} onClose={onClose} />
}
