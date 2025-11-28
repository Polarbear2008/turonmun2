import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Upload, 
  Download, 
  Save, 
  RefreshCw, 
  MapPin, 
  Globe, 
  Check, 
  X, 
  Lock,
  Unlock,
  AlertTriangle,
  Filter,
  Search
} from 'lucide-react';

interface CountryAvailability {
  country: string;
  committees: {
    [committee: string]: {
      available: boolean;
      assigned: boolean;
      assignedTo?: string;
    };
  };
}

const CountryMatrix = () => {
  const [matrix, setMatrix] = useState<CountryAvailability[]>([]);
  const [committees] = useState(['ECOSOC', 'Security Council', 'General Assembly', 'Human Rights Council']);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAssigned, setFilterAssigned] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock data
  useEffect(() => {
    const mockMatrix: CountryAvailability[] = [
      {
        country: 'United Kingdom',
        committees: {
          'ECOSOC': { available: true, assigned: true, assignedTo: 'Alex Johnson' },
          'Security Council': { available: true, assigned: false },
          'General Assembly': { available: true, assigned: false },
          'Human Rights Council': { available: false, assigned: false }
        }
      },
      {
        country: 'United States',
        committees: {
          'ECOSOC': { available: true, assigned: false },
          'Security Council': { available: true, assigned: true, assignedTo: 'Sarah Williams' },
          'General Assembly': { available: true, assigned: false },
          'Human Rights Council': { available: true, assigned: false }
        }
      },
      {
        country: 'China',
        committees: {
          'ECOSOC': { available: true, assigned: false },
          'Security Council': { available: true, assigned: true, assignedTo: 'David Chen' },
          'General Assembly': { available: true, assigned: false },
          'Human Rights Council': { available: true, assigned: false }
        }
      },
      {
        country: 'France',
        committees: {
          'ECOSOC': { available: true, assigned: false },
          'Security Council': { available: true, assigned: false },
          'General Assembly': { available: true, assigned: false },
          'Human Rights Council': { available: true, assigned: false }
        }
      },
      {
        country: 'Germany',
        committees: {
          'ECOSOC': { available: true, assigned: false },
          'Security Council': { available: false, assigned: false },
          'General Assembly': { available: true, assigned: false },
          'Human Rights Council': { available: true, assigned: false }
        }
      },
      {
        country: 'Japan',
        committees: {
          'ECOSOC': { available: true, assigned: false },
          'Security Council': { available: false, assigned: false },
          'General Assembly': { available: true, assigned: false },
          'Human Rights Council': { available: true, assigned: false }
        }
      }
    ];
    setMatrix(mockMatrix);
  }, []);

  const toggleAvailability = (country: string, committee: string) => {
    setMatrix(prev => prev.map(item => {
      if (item.country === country) {
        return {
          ...item,
          committees: {
            ...item.committees,
            [committee]: {
              ...item.committees[committee],
              available: !item.committees[committee].available,
              assigned: item.committees[committee].available ? false : item.committees[committee].assigned
            }
          }
        };
      }
      return item;
    }));
  };

  const filteredMatrix = matrix.filter(item => {
    const matchesSearch = item.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAssigned === 'all' || 
      (filterAssigned === 'assigned' && Object.values(item.committees).some(c => c.assigned)) ||
      (filterAssigned === 'available' && Object.values(item.committees).some(c => c.available && !c.assigned));
    return matchesSearch && matchesFilter;
  });

  const getStats = () => {
    const totalSlots = matrix.length * committees.length;
    const availableSlots = matrix.reduce((acc, country) => 
      acc + Object.values(country.committees).filter(c => c.available).length, 0
    );
    const assignedSlots = matrix.reduce((acc, country) => 
      acc + Object.values(country.committees).filter(c => c.assigned).length, 0
    );
    
    return { totalSlots, availableSlots, assignedSlots };
  };

  const stats = getStats();

  return (
    <AdminLayout title="Country Matrix Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Country Matrix</h2>
            <p className="text-gray-600">Manage country availability across committees</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Upload className="h-4 w-4" />
              Upload CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" />
              Export Matrix
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Slots</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalSlots}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-semibold text-green-600">{stats.availableSlots}</p>
              </div>
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assigned</p>
                <p className="text-2xl font-semibold text-purple-600">{stats.assignedSlots}</p>
              </div>
              <Lock className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utilization</p>
                <p className="text-2xl font-semibold text-orange-600">
                  {Math.round((stats.assignedSlots / stats.availableSlots) * 100)}%
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterAssigned}
                  onChange={(e) => setFilterAssigned(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Countries</option>
                  <option value="assigned">Has Assignments</option>
                  <option value="available">Has Available Slots</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                    Country
                  </th>
                  {committees.map(committee => (
                    <th key={committee} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {committee}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Summary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMatrix.map((country) => (
                  <tr key={country.country} className="hover:bg-gray-50">
                    <td className="px-4 py-4 sticky left-0 bg-white z-10 border-r">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{country.country}</span>
                      </div>
                    </td>
                    {committees.map(committee => {
                      const slot = country.committees[committee];
                      return (
                        <td key={committee} className="px-4 py-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => toggleAvailability(country.country, committee)}
                              disabled={slot.assigned}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                slot.assigned 
                                  ? 'bg-purple-100 text-purple-600 cursor-not-allowed' 
                                  : slot.available 
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                  : 'bg-red-100 text-red-600 hover:bg-red-200'
                              }`}
                              title={
                                slot.assigned 
                                  ? `Assigned to ${slot.assignedTo}` 
                                  : slot.available 
                                  ? 'Available - Click to disable' 
                                  : 'Unavailable - Click to enable'
                              }
                            >
                              {slot.assigned ? (
                                <Lock className="h-4 w-4" />
                              ) : slot.available ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </button>
                            {slot.assigned && (
                              <span className="text-xs text-purple-600 font-medium">
                                {slot.assignedTo?.split(' ')[0]}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-4 py-4 text-center">
                      <div className="text-sm">
                        <div className="text-green-600 font-medium">
                          {Object.values(country.committees).filter(c => c.available).length} available
                        </div>
                        <div className="text-purple-600">
                          {Object.values(country.committees).filter(c => c.assigned).length} assigned
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Available</p>
                <p className="text-sm text-gray-600">Country can be assigned to this committee</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Assigned</p>
                <p className="text-sm text-gray-600">Country is assigned to a delegate</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <X className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Unavailable</p>
                <p className="text-sm text-gray-600">Country not available for this committee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Enable All Available Slots
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Disable All Unassigned Slots
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Auto-Balance Committees
            </button>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              Reset to Default Matrix
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CountryMatrix;
