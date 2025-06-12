"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, PhoneCall, Globe, ExternalLink } from "lucide-react"
import { Analytics } from "@vercel/analytics/react"


export default function CommunityFeatures() {
  return (
    <div className="mt-12">
      <Analytics />
      
      {/* Community Section */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="p-6">
          {/* Contact and Support */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Got any questions? Contact us!</p>
                <p className="text-sm text-green-600 hover:underline">
                  info@ecopulse.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
              <PhoneCall className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">24/7 Support</p>
                <p className="text-sm text-gray-600">Always here to help and build a sustainable future together 🌿</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
              <Globe className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">EcoPulse</p>
                <p className="text-sm text-gray-600">Join the eco-movement 💚</p>
                <p className="text-sm text-gray-600">Your small choices = Big impact 🌍</p>
                <p className="text-sm font-medium text-green-600">
                  👉 Ready to measure your EcoPulse?
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span>#GoGreen</span>
                  <span>#EcoPulse</span>
                  <span>#CarbonFootprint</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 