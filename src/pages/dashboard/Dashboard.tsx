import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import { useBotStore, BotIndustry } from '../../stores/botStore';
import { 
  Plus, 
  ChevronRight, 
  BarChart2, 
  Users as UsersIcon, 
  MessageSquare, 
  ActivitySquare 
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { industryNames } from '../../utils/industryUtils';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const { t } = useTranslation();
  const { user, users } = useAuthStore();
  const { bots, getBotsByUserId } = useBotStore();
  const [userBots, setUserBots] = useState(getBotsByUserId(user?.id || ''));
  const [activeBotsCount, setActiveBotsCount] = useState(0);
  const [totalInteractions, setTotalInteractions] = useState(0);
  
  useEffect(() => {
    if (user) {
      const userBots = getBotsByUserId(user.id);
      setUserBots(userBots);
      setActiveBotsCount(userBots.filter(bot => bot.active).length);
      setTotalInteractions(userBots.reduce((sum, bot) => sum + bot.metrics.interactions, 0));
    }
  }, [user, getBotsByUserId]);

  // Prepare data for industry pie chart
  const industryData = () => {
    const counts: Record<string, number> = {};
    
    userBots.forEach(bot => {
      const industryName = industryNames[bot.industry] || bot.industry;
      counts[industryName] = (counts[industryName] || 0) + 1;
    });
    
    // Get top 5 industries and group the rest as "Other"
    const entries = Object.entries(counts);
    const top5 = entries.sort((a, b) => b[1] - a[1]).slice(0, 5);
    const otherCount = entries.slice(5).reduce((sum, [_, count]) => sum + count, 0);
    
    const labels = top5.map(([name]) => name);
    const data = top5.map(([_, count]) => count);
    
    if (otherCount > 0) {
      labels.push('Other');
      data.push(otherCount);
    }
    
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#3B82F6', // blue-500
            '#8B5CF6', // violet-500
            '#EC4899', // pink-500
            '#10B981', // emerald-500
            '#F59E0B', // amber-500
            '#6B7280', // gray-500
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // Prepare data for interactions bar chart
  const interactionsData = () => {
    const today = new Date();
    const labels = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }).reverse();
    
    // Generate random data for demo purposes
    const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 500) + 100);
    
    return {
      labels,
      datasets: [
        {
          label: 'Interactions',
          data,
          backgroundColor: '#3B82F6',
          borderRadius: 4,
        },
      ],
    };
  };

  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t('dashboard.welcome')}, {user?.name}!
        </h2>
        <p className="text-gray-600 mt-2">
          {userBots.length === 0 
            ? 'Create your first bot to get started.'
            : `You have ${userBots.length} bot${userBots.length > 1 ? 's' : ''} configured.`
          }
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total bots card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('dashboard.totalBots')}</p>
              <p className="text-2xl font-semibold text-gray-900">{userBots.length}</p>
            </div>
          </div>
        </div>
        
        {/* Active bots card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <ActivitySquare className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('dashboard.activeBots')}</p>
              <p className="text-2xl font-semibold text-gray-900">{activeBotsCount}</p>
            </div>
          </div>
        </div>
        
        {/* Total users card - only for admin */}
        {user?.role === 'admin' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <UsersIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{t('dashboard.totalUsers')}</p>
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Total interactions card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600">
              <BarChart2 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('dashboard.totalInteractions')}</p>
              <p className="text-2xl font-semibold text-gray-900">{totalInteractions.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create bot CTA for users with no bots */}
      {userBots.length === 0 && (
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <MessageSquare className="h-12 w-12 mx-auto text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Create your first bot</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get started by creating your first bot. Choose from multiple industries and customize it to your needs.
          </p>
          <Link 
            to="/bots/create" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-1" /> Create Bot
          </Link>
        </div>
      )}
      
      {/* Charts section - only shown if the user has bots */}
      {userBots.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Industry distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{t('dashboard.botsByIndustry')}</h3>
            <div className="h-64">
              <Pie data={industryData()} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          
          {/* Interactions over time */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Interactions</h3>
            <div className="h-64">
              <Bar 
                data={interactionsData()} 
                options={{ 
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Recent activity - only shown if user has bots */}
      {userBots.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">{t('dashboard.recentActivity')}</h3>
            <Link 
              to="/bots" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              {t('dashboard.viewAll')} <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {userBots.slice(0, 5).map(bot => (
                <li key={bot.id} className="py-4">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${bot.active ? 'bg-green-500' : 'bg-gray-300'} mr-4`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{bot.name}</p>
                      <p className="text-sm text-gray-500 truncate">{industryNames[bot.industry]}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{bot.metrics.interactions.toLocaleString()} interactions</p>
                      <p className="text-sm text-gray-500">
                        {new Date(bot.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;