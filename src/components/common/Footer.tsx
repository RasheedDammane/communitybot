import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Twitter, Facebook, Instagram, Linkedin, Mail, Phone, Globe } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerSections = {
    platform: {
      title: 'Platform',
      links: [
        { name: 'Voice AI Agent (Voicebot)', href: '/platform/voice-agent' },
        { name: 'Chat AI Agent (Chatbot)', href: '/platform/chat-agent' },
        { name: 'Real-Time Agent Assist', href: '/platform/agent-assist' },
        { name: 'Live Chat with Co-Browsing', href: '/platform/live-chat' },
        { name: 'OuiBooking UNO', href: '/platform/uno' },
        { name: 'OuiBooking NEO', href: '/platform/neo' },
        { name: 'OuiBooking Armor', href: '/platform/armor' },
        { name: 'Pricing', href: '/pricing' }
      ]
    },
    useCases: {
      title: 'Use Cases',
      links: [
        { name: 'Increase Digital Sales', href: '/use-cases/digital-sales' },
        { name: 'Automate Claim Submissions', href: '/use-cases/claims' },
        { name: 'Corporate Banking', href: '/use-cases/corporate-banking' },
        { name: 'Retail Banking', href: '/use-cases/retail-banking' },
        { name: 'Automated Debt Collection', href: '/use-cases/debt-collection' }
      ]
    },
    industries: {
      title: 'Industries',
      links: [
        { name: 'Insurance', href: '/industries/insurance' },
        { name: 'Collections', href: '/industries/collections' },
        { name: 'Healthcare', href: '/industries/healthcare' },
        { name: 'Banking', href: '/industries/banking' },
        { name: 'Lending', href: '/industries/lending' },
        { name: 'BPO', href: '/industries/bpo' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'Contact', href: '/contact' },
        { name: 'Support', href: '/support' },
        { name: 'Careers', href: '/careers', badge: 'Hiring!' },
        { name: 'Partner', href: '/partner' },
        { name: 'About', href: '/about' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' },
        { name: 'Tech', href: '/tech' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Dev Center', href: '/developers' },
        { name: 'Academy', href: '/academy' }
      ]
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-white mb-6">
              <MessageSquare className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">OuiBooking</span>
            </Link>
            <p className="text-gray-400 mb-6">
              AI Agent Platform for Enterprises and Contact Center Automation. Elevating customer experience with conversational workflow AI agents.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      {link.name}
                      {link.badge && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-pink-500 text-white rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Globe className="h-5 w-5 text-gray-400" />
              <select 
                className="bg-transparent text-gray-400 border-none focus:ring-0"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} OuiBooking. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms
                </Link>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy
                </Link>
                <Link to="/security" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Security
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;