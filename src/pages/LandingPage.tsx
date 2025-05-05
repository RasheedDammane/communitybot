import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../stores/authStore';
import { BotIndustry } from '../stores/botStore';
import { 
  MessageSquare, 
  BarChart, 
  Headphones, 
  PieChart, 
  Bot,
  Brain, 
  Shield, 
  Globe, 
  ChevronRight, 
  CheckCircle, 
  ArrowRight,
  Star,
  Users,
  Clock,
  Zap,
  BookOpen,
  Award,
  Sparkles,
  Code,
  Rocket,
  Heart,
  Coffee,
  Laptop,
  Settings,
  Target,
  TrendingUp,
  Lightbulb,
  Repeat,
  Workflow
} from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getCategoryIcon, industryNames } from '../utils/industryUtils';

// Sample industry icons to showcase on the landing page
const showcaseIndustries: BotIndustry[] = [
  'medical_services',
  'financial_services',
  'legal_advice',
  'dentist_services',
  'real_estate_services',
  'travel_services'
] as BotIndustry[];

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Customer Service Director",
    company: "Global Finance Corp",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    quote: "OuiBooking has transformed our customer service. Our response times are down 80% and customer satisfaction is up 45%."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "TechStart Solutions",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    quote: "The multilingual support is incredible. We're now serving customers in 12 languages with just our AI agents."
  },
  {
    name: "Emma Rodriguez",
    role: "Operations Manager",
    company: "Healthcare Plus",
    image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg",
    quote: "Setting up our virtual assistant was incredibly easy. The ROI has been amazing - we saved 60% on support costs."
  }
];

// Blog posts data
const blogPosts = [
  {
    title: "The Future of Customer Service: AI and Human Collaboration",
    excerpt: "Discover how AI agents and human teams can work together to deliver exceptional service...",
    image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
    category: "Trends",
    readTime: "5 min"
  },
  {
    title: "Implementing Voice AI in Your Contact Center",
    excerpt: "A step-by-step guide to modernizing your contact center with voice AI technology...",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    category: "Guide",
    readTime: "8 min"
  },
  {
    title: "Multilingual Support: Breaking Language Barriers",
    excerpt: "How AI is helping businesses provide seamless support across multiple languages...",
    image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
    category: "Case Study",
    readTime: "6 min"
  }
];

// Supported languages with flags
const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
];

// Implementation steps
const implementationSteps = [
  {
    number: "01",
    title: "Sign Up & Configure",
    description: "Create your account and configure your AI agent's basic settings",
    icon: Settings,
    color: "blue"
  },
  {
    number: "02",
    title: "Train Your AI",
    description: "Upload your knowledge base and train your AI on your specific use cases",
    icon: Brain,
    color: "purple"
  },
  {
    number: "03",
    title: "Test & Refine",
    description: "Test your AI agent's responses and refine its behavior",
    icon: Target,
    color: "green"
  },
  {
    number: "04",
    title: "Go Live",
    description: "Deploy your AI agent to your preferred channels",
    icon: Rocket,
    color: "red"
  }
];

// Solution benefits
const benefits = [
  {
    icon: Clock,
    title: "Quick Setup",
    description: "Get your AI agent up and running in less than 10 minutes",
    color: "blue"
  },
  {
    icon: Globe,
    title: "Multilingual",
    description: "Support customers in 50+ languages with native-level fluency",
    color: "green"
  },
  {
    icon: Users,
    title: "24/7 Availability",
    description: "Provide round-the-clock support without increasing costs",
    color: "purple"
  },
  {
    icon: Zap,
    title: "Instant Scaling",
    description: "Handle unlimited concurrent conversations without delay",
    color: "yellow"
  },
  {
    icon: Brain,
    title: "Smart Learning",
    description: "AI that continuously learns from interactions",
    color: "pink"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security and data protection",
    color: "red"
  }
];

// Pricing plans
const pricingPlans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfect for small businesses",
    features: [
      "Up to 1,000 conversations/month",
      "2 AI agents",
      "5 languages",
      "Basic analytics",
      "Email support"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Professional",
    price: "149",
    description: "For growing teams",
    features: [
      "Up to 10,000 conversations/month",
      "10 AI agents",
      "All languages",
      "Advanced analytics",
      "Priority support",
      "Custom training"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited conversations",
      "Unlimited AI agents",
      "All languages",
      "Custom analytics",
      "24/7 dedicated support",
      "Custom integration",
      "SLA guarantee"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const LandingPage = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500 bg-opacity-20 rounded-full mb-8">
              <Sparkles className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">AI-Powered Customer Service Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Customer Experience with AI-Powered Conversations
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Intelligent voice and chat agents that understand, engage, and delight your customers in any language
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/signup" 
                    className="px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition-colors text-center text-lg"
                  >
                    Start Free Trial
                  </Link>
                  <Link 
                    to="/demo" 
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-center text-lg"
                  >
                    Watch Demo
                  </Link>
                </>
              ) : (
                <Link 
                  to="/dashboard" 
                  className="px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition-colors text-center text-lg"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-xl text-gray-600">Simple implementation process, powerful results</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {implementationSteps.map((step, index) => (
              <div key={index} className="relative">
                {index < implementationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gray-200 transform translate-x-1/2">
                    <div className="absolute top-1/2 right-0 w-3 h-3 bg-gray-200 transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                )}
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative z-10">
                  <div className={`w-12 h-12 rounded-full bg-${step.color}-100 flex items-center justify-center mb-4`}>
                    <step.icon className={`h-6 w-6 text-${step.color}-600`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-200 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language Support Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Reach, Local Touch</h2>
            <p className="text-xl text-gray-600">Supporting 50+ Languages with Native-Level Understanding</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {supportedLanguages.map((lang) => (
              <div key={lang.code} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
                <span className="text-3xl">{lang.flag}</span>
                <div>
                  <p className="font-medium text-gray-900">{lang.name}</p>
                  <p className="text-sm text-gray-500">{lang.code.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose OuiBooking</h2>
            <p className="text-xl text-gray-600">Everything you need to deliver exceptional customer service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-full bg-${benefit.color}-100 flex items-center justify-center mb-6`}>
                  <benefit.icon className={`h-7 w-7 text-${benefit.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that works best for your business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-xl ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-600">/month</span>}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={isAuthenticated ? "/dashboard" : "/signup"}
                    className={`block w-full py-3 px-6 text-center rounded-lg font-medium ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600">See what our customers have to say about OuiBooking</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Insights</h2>
              <p className="text-gray-600">Expert advice and industry trends</p>
            </div>
            <Link 
              to="/blog" 
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              View all posts <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm ml-4 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link 
                    to="/blog/post" 
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    Read more <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Transform Your Customer Experience?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join thousands of businesses already using OuiBooking to automate customer interactions and provide exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/signup" 
                  className="px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition-colors text-center text-lg"
                >
                  Start Free Trial
                </Link>
                <Link 
                  to="/demo" 
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-center text-lg"
                >
                  Schedule a Demo
                </Link>
              </>
            ) : (
              <Link 
                to="/dashboard" 
                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition-colors text-center text-lg"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;