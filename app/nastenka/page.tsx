"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/useAuth"
import Loading from "@/app/loading"
import ProtectedRoute from "@/app/components/ProtectedRoute"
import { Palette, Image, Layout, BookOpen, Heart, Settings, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

function NastenkaContent() {
  return (
    <div className="nastenka-page">
    </div>
  )
}

export default function NastenkaPage() {
  return (
    <ProtectedRoute>
      <NastenkaContent />
    </ProtectedRoute>
  )
}
