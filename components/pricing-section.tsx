"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: ["3 resume enhancements per month", "Basic templates", "PDF download", "Email support"],
      notIncluded: ["Premium templates", "Multiple formats", "Priority support", "Advanced AI features"],
      buttonText: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Best for job seekers",
      features: [
        "Unlimited resume enhancements",
        "All premium templates",
        "PDF, DOCX, PNG downloads",
        "Priority support",
        "Advanced AI matching",
        "Custom branding",
      ],
      notIncluded: [],
      buttonText: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Custom templates",
        "API access",
        "Dedicated support",
        "Analytics dashboard",
        "White-label solution",
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Start free and upgrade as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`bg-slate-800/50 border-slate-700 relative ${
                plan.popular ? "ring-2 ring-orange-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-slate-400 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-slate-300">
                      <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-center text-slate-500">
                      <div className="w-4 h-4 mr-3 flex-shrink-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      : "bg-slate-700 hover:bg-slate-600"
                  } text-white`}
                >
                  {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <div className="flex justify-center items-center space-x-6 text-sm text-slate-500">
            <span>✓ Cancel anytime</span>
            <span>✓ 30-day money back guarantee</span>
            <span>✓ No setup fees</span>
          </div>
        </div>
      </div>
    </section>
  )
}
