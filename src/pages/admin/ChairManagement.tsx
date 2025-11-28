import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Mail, 
  Globe,
  Key,
  CheckCircle,
  XCircle
} from 'lucide-react';

const ChairManagement = () => {
  const mockChairs = [
    {
      id: '1',
      name: 'Dr. Sarah Mitchell',
      email: 'sarah.mitchell@university.edu',
      committee: 'ECOSOC',
      role: 'Chair',
      status: 'active',
      last_login: '2024-02-15',
      permissions: ['manage_committee', 'send_messages', 'view_reports']
    },
    {
      id: '2',
      name: 'Prof. James Rodriguez',
      email: 'james.rodriguez@college.edu',
      committee: 'Security Council',
      role: 'Chair',
      status: 'active',
      last_login: '2024-02-14',
      permissions: ['manage_committee', 'send_messages']
    },
    {
      id: '3',
      name: 'Ms. Emily Chen',
      email: 'emily.chen@school.edu',
      committee: 'ECOSOC',
      role: 'Co-Chair',
      status: 'pending',
      last_login: null,
      permissions: ['send_messages']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout title="Chair Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Chair Management</h2>
            <p className="text-gray-600">Manage committee chairs and their permissions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            Add Chair
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Chairs</p>
                <p className="text-2xl font-semibold text-gray-900">{mockChairs.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-semibold text-green-600">
                  {mockChairs.filter(c => c.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {mockChairs.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Committees</p>
                <p className="text-2xl font-semibold text-purple-600">
                  {new Set(mockChairs.map(c => c.committee)).size}
                </p>
              </div>
              <Globe className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Chairs Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chair
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Committee
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockChairs.map((chair) => (
                  <tr key={chair.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{chair.name}</div>
                        <div className="text-sm text-gray-500">{chair.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-900">{chair.committee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900">{chair.role}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(chair.status)}`}>
                        {chair.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900">
                        {chair.last_login || 'Never'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-100 rounded" title="Permissions">
                          <Shield className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-purple-600 hover:bg-purple-100 rounded" title="Send Email">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-orange-600 hover:bg-orange-100 rounded" title="Reset Password">
                          <Key className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 rounded" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permissions Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Chair Permissions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage committee delegates</li>
                <li>• Send messages to delegates</li>
                <li>• Upload committee documents</li>
                <li>• View attendance reports</li>
                <li>• Manage crisis updates</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Co-Chair Permissions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Send messages to delegates</li>
                <li>• View committee reports</li>
                <li>• Assist with attendance</li>
                <li>• Upload documents (limited)</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Crisis Director</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• All chair permissions</li>
                <li>• Create crisis updates</li>
                <li>• Manage crisis timeline</li>
                <li>• Send emergency notifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChairManagement;
