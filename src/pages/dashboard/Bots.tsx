import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import { useBotStore, Bot } from '../../stores/botStore';
import { 
  Plus, 
  Search, 
  ToggleLeft, 
  ToggleRight, 
  Trash2, 
  ExternalLink, 
  MessageSquare,
  MoreVertical,
  Edit
} from 'lucide-react';
import { industryNames } from '../../utils/industryUtils';

const Bots = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { bots, updateBot, deleteBot, getBotsByUserId } = useBotStore();
  
  const [userBots, setUserBots] = useState<Bot[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [botToDelete, setBotToDelete] = useState<Bot | null>(null);
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
  
  useEffect(() => {
    if (user) {
      setUserBots(getBotsByUserId(user.id));
    }
  }, [user, bots, getBotsByUserId]);
  
  // Filter bots based on search term
  const filteredBots = userBots.filter(bot =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industryNames[bot.industry].toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.goal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle bot activation toggle
  const handleToggleActive = (bot: Bot) => {
    updateBot(bot.id, { active: !bot.active });
  };
  
  // Handle delete confirmation
  const confirmDelete = (bot: Bot) => {
    setBotToDelete(bot);
    setShowDeleteModal(true);
    setDropdownOpenId(null);
  };
  
  // Execute the delete action
  const executeDelete = () => {
    if (botToDelete) {
      deleteBot(botToDelete.id);
      setShowDeleteModal(false);
      setBotToDelete(null);
    }
  };

  // Toggle dropdown menu
  const toggleDropdown = (botId: string) => {
    setDropdownOpenId(dropdownOpenId === botId ? null : botId);
  };
  
  return (
    <div>
      {/* Header with actions */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">{t('bots.list')}</h1>
        
        <Link 
          to="/bots/create" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" /> {t('bots.create')}
        </Link>
      </div>
      
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={`${t('common.search')}...`}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Bots list */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {filteredBots.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              {searchTerm ? 'No bots found for your search' : t('bots.noBotsFound')}
            </h3>
            <p className="mt-1 text-gray-500">
              {searchTerm ? 'Try a different search term' : 'Get started by creating your first bot'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link 
                  to="/bots/create" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" /> {t('bots.create')}
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('bots.name')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('bots.industry')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('bots.languages')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('bots.status')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('bots.metrics')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBots.map((bot) => (
                  <tr key={bot.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{bot.name}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(bot.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{industryNames[bot.industry]}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{bot.goal}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {bot.languages.map(lang => (
                          <span 
                            key={lang} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {t(`languages.${lang}`)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(bot)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {bot.active ? (
                          <>
                            <ToggleRight className="h-5 w-5 text-green-500 mr-1" />
                            <span className="text-green-700">{t('bots.active')}</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="h-5 w-5 text-gray-400 mr-1" />
                            <span className="text-gray-500">{t('bots.inactive')}</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {bot.metrics.interactions.toLocaleString()} {t('bots.interactions')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {bot.metrics.successRate}% {t('bots.successRate')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => toggleDropdown(bot.id)}
                          className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        
                        {dropdownOpenId === bot.id && (
                          <div
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                            onMouseLeave={() => setDropdownOpenId(null)}
                          >
                            <div className="py-1" role="menu" aria-orientation="vertical">
                              <Link
                                to={`/bots/${bot.id}/edit`}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                              >
                                <Edit className="mr-3 h-5 w-5 text-gray-400" />
                                {t('common.edit')}
                              </Link>
                              <button
                                onClick={() => confirmDelete(bot)}
                                className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                role="menuitem"
                              >
                                <Trash2 className="mr-3 h-5 w-5 text-red-400" />
                                {t('common.delete')}
                              </button>
                              <a
                                href="#"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                              >
                                <ExternalLink className="mr-3 h-5 w-5 text-gray-400" />
                                View Details
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed z-40 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {t('bots.deleteConfirm')}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete <span className="font-medium">{botToDelete?.name}</span>? 
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={executeDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {t('common.delete')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bots;