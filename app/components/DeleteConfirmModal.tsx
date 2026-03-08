// Sdílený modální dialog pro potvrzení smazání
// Používá se v galerii, moodboardech, učení a dalších stránkách

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Trash2 } from "lucide-react"
import { DELETE_RED, DELETE_HOVER } from "@/lib/colors"

interface Props {
  /** Zda je modal otevřený */
  isOpen: boolean
  /** Callback pro zavření (tlačítko Zrušit / klik na overlay) */
  onCancel: () => void
  /** Callback pro potvrzení smazání */
  onConfirm: () => void
  /** Nadpis modalu (výchozí: "Smazat?") */
  title?: string
  /** Text zprávy (výchozí: "Tato akce je nevratná.") */
  message?: string
}

export default function DeleteConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
  title = "Smazat?",
  message = "Tato akce je nevratná.",
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="modal-content modal-content-small"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 size={48} color={DELETE_RED} className="modal-icon" />
            <h2 className="modal-title">{title}</h2>
            <p className="modal-text">{message}</p>
            <div className="modal-buttons modal-buttons-center">
              <motion.button
                onClick={onCancel}
                className="modal-btn-cancel"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                Zrušit
              </motion.button>
              <motion.button
                onClick={onConfirm}
                className="modal-btn-delete"
                whileHover={{ backgroundColor: DELETE_HOVER }}
              >
                Smazat
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
