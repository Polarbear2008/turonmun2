import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe,
  Calendar,
  School,
  MapPin,
  Award
} from 'lucide-react';

const Analytics = () => {
  return (
    <AdminLayout title="Analytics Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Registration trends, demographics, and conference insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Registrations</p>
                <p className="text-2xl font-semibold text-gray-900">247</p>
                <p className="text-xs text-green-600">↑ 12% from last week</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Schools Participating</p>
                <p className="text-2xl font-semibold text-gray-900">45</p>
                <p className="text-xs text-green-600">↑ 8% from last year</p>
              </div>
              <School className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Countries Represented</p>
                <p className="text-2xl font-semibold text-gray-900">28</p>
                <p className="text-xs text-blue-600">Global diversity</p>
              </div>
              <Globe className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Acceptance Rate</p>
                <p className="text-2xl font-semibold text-gray-900">78%</p>
                <p className="text-xs text-orange-600">Quality maintained</p>
              </div>
              <Award className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registration Timeline */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Registration Timeline</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Registration timeline chart would display here</p>
                <p className="text-sm text-gray-400">Shows daily registration trends</p>
              </div>
            </div>
          </div>

          {/* Committee Distribution */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Committee Distribution</h3>
              <Globe className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-4">
              {[
                { name: 'ECOSOC', delegates: 45, percentage: 35 },
                { name: 'Security Council', delegates: 32, percentage: 25 },
                { name: 'General Assembly', delegates: 28, percentage: 22 },
                { name: 'Human Rights Council', delegates: 23, percentage: 18 }
              ].map((committee) => (
                <div key={committee.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">{committee.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${committee.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{committee.delegates}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
            <MapPin className="h-5 w-5 text-purple-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Top Regions</h4>
              <div className="space-y-2">
                {[
                  { region: 'North America', count: 89, percentage: 36 },
                  { region: 'Europe', count: 67, percentage: 27 },
                  { region: 'Asia', count: 54, percentage: 22 },
                  { region: 'Others', count: 37, percentage: 15 }
                ].map((region) => (
                  <div key={region.region} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{region.region}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{region.count}</span>
                      <span className="text-xs text-gray-500">({region.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Experience Levels</h4>
              <div className="space-y-2">
                {[
                  { level: 'Beginner', count: 98, color: 'bg-green-500' },
                  { level: 'Intermediate', count: 89, color: 'bg-yellow-500' },
                  { level: 'Advanced', count: 60, color: 'bg-red-500' }
                ].map((level) => (
                  <div key={level.level} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${level.color} rounded-full`}></div>
                      <span className="text-sm text-gray-600">{level.level}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{level.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">School Types</h4>
              <div className="space-y-2">
                {[
                  { type: 'High School', count: 156 },
                  { type: 'University', count: 67 },
                  { type: 'International School', count: 24 }
                ].map((type) => (
                  <div key={type.type} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{type.type}</span>
                    <span className="text-sm font-medium text-gray-900">{type.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
            <div className="space-y-3">
              {[
                { status: 'Accepted', count: 189, color: 'bg-green-500' },
                { status: 'Pending', count: 33, color: 'bg-yellow-500' },
                { status: 'Waitlist', count: 18, color: 'bg-blue-500' },
                { status: 'Rejected', count: 7, color: 'bg-red-500' }
              ].map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-900">{item.status}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
            <div className="space-y-3">
              {[
                { status: 'Paid', count: 156, color: 'bg-green-500' },
                { status: 'Pending', count: 67, color: 'bg-yellow-500' },
                { status: 'Overdue', count: 24, color: 'bg-red-500' }
              ].map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-900">{item.status}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
