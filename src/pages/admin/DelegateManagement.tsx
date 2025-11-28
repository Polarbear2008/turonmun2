import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Eye, 
  Edit, 
  Check, 
  X, 
  Clock, 
  AlertTriangle,
  Users,
  School,
  MapPin,
  CreditCard,
  FileText,
  ChevronDown
} from 'lucide-react';

interface Delegate {
  id: string;
  full_name: string;
  email: string;
  school: string;
  grade: string;
  phone: string;
  committee_preference_1: string;
  committee_preference_2: string;
  committee_preference_3: string;
  country_preference: string;
  assigned_committee?: string;
  assigned_country?: string;
  application_status: 'pending' | 'accepted' | 'rejected' | 'waitlist' | 'more_info';
  payment_status: 'pending' | 'paid' | 'overdue';
  documents_submitted: boolean;
  registration_date: string;
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  dietary_requirements?: string;
  emergency_contact: string;
}

const DelegateManagement = () => {
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [filteredDelegates, setFilteredDelegates] = useState<Delegate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [committeeFilter, setCommitteeFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedDelegates, setSelectedDelegates] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with real Supabase queries
  useEffect(() => {
    const mockDelegates: Delegate[] = [
      {
        id: '1',
        full_name: 'Alex Johnson',
        email: 'alex.johnson@school.edu',
        school: 'International High School',
        grade: '12th Grade',
        phone: '+1-555-0123',
        committee_preference_1: 'ECOSOC',
        committee_preference_2: 'Security Council',
        committee_preference_3: 'General Assembly',
        country_preference: 'United Kingdom',
        assigned_committee: 'ECOSOC',
        assigned_country: 'United Kingdom',
        application_status: 'accepted',
        payment_status: 'paid',
        documents_submitted: true,
        registration_date: '2024-01-15',
        experience_level: 'intermediate',
        dietary_requirements: 'Vegetarian',
        emergency_contact: 'Jane Johnson - +1-555-9876'
      },
      {
        id: '2',
        full_name: 'Maria Garcia',
        email: 'maria.garcia@academy.edu',
        school: 'Global Academy',
        grade: '11th Grade',
        phone: '+1-555-0124',
        committee_preference_1: 'Human Rights Council',
        committee_preference_2: 'ECOSOC',
        committee_preference_3: 'Security Council',
        country_preference: 'Spain',
        application_status: 'pending',
        payment_status: 'pending',
        documents_submitted: false,
        registration_date: '2024-02-01',
        experience_level: 'beginner',
        emergency_contact: 'Carlos Garcia - +1-555-9877'
      },
      {
        id: '3',
        full_name: 'David Chen',
        email: 'david.chen@prep.edu',
        school: 'Metropolitan Prep',
        grade: '12th Grade',
        phone: '+1-555-0125',
        committee_preference_1: 'Security Council',
        committee_preference_2: 'General Assembly',
        committee_preference_3: 'ECOSOC',
        country_preference: 'China',
        assigned_committee: 'Security Council',
        assigned_country: 'China',
        application_status: 'accepted',
        payment_status: 'overdue',
        documents_submitted: true,
        registration_date: '2024-01-20',
        experience_level: 'advanced',
        emergency_contact: 'Li Chen - +1-555-9878'
      },
      {
        id: '4',
        full_name: 'Sarah Williams',
        email: 'sarah.williams@college.edu',
        school: 'City College',
        grade: 'University',
        phone: '+1-555-0126',
        committee_preference_1: 'General Assembly',
        committee_preference_2: 'Human Rights Council',
        committee_preference_3: 'ECOSOC',
        country_preference: 'Canada',
        application_status: 'waitlist',
        payment_status: 'pending',
        documents_submitted: true,
        registration_date: '2024-02-10',
        experience_level: 'intermediate',
        dietary_requirements: 'Gluten-free',
        emergency_contact: 'Robert Williams - +1-555-9879'
      }
    ];

    setDelegates(mockDelegates);
    setFilteredDelegates(mockDelegates);
    setLoading(false);
  }, []);

  // Filter delegates based on search and filters
  useEffect(() => {
    let filtered = delegates.filter(delegate => {
      const matchesSearch = 
        delegate.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delegate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delegate.school.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || delegate.application_status === statusFilter;
      const matchesCommittee = committeeFilter === 'all' || 
        delegate.committee_preference_1 === committeeFilter ||
        delegate.committee_preference_2 === committeeFilter ||
        delegate.committee_preference_3 === committeeFilter ||
        delegate.assigned_committee === committeeFilter;
      const matchesPayment = paymentFilter === 'all' || delegate.payment_status === paymentFilter;

      return matchesSearch && matchesStatus && matchesCommittee && matchesPayment;
    });

    setFilteredDelegates(filtered);
  }, [delegates, searchTerm, statusFilter, committeeFilter, paymentFilter]);

  const handleStatusChange = (delegateId: string, newStatus: Delegate['application_status']) => {
    setDelegates(prev => prev.map(delegate => 
      delegate.id === delegateId 
        ? { ...delegate, application_status: newStatus }
        : delegate
    ));
  };

  const handleAssignCommittee = (delegateId: string, committee: string, country?: string) => {
    setDelegates(prev => prev.map(delegate => 
      delegate.id === delegateId 
        ? { 
            ...delegate, 
            assigned_committee: committee,
            assigned_country: country || delegate.assigned_country,
            application_status: 'accepted'
          }
        : delegate
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'waitlist': return 'bg-yellow-100 text-yellow-800';
      case 'more_info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const committees = ['ECOSOC', 'Security Council', 'General Assembly', 'Human Rights Council'];
  const countries = ['United Kingdom', 'United States', 'China', 'France', 'Germany', 'Japan', 'Brazil', 'India', 'Canada', 'Australia'];

  return (
    <AdminLayout title="Delegate Management">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Delegate Management</h2>
            <p className="text-gray-600">Manage applications, assignments, and delegate status</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Mail className="h-4 w-4" />
              Send Email
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-semibold text-gray-900">{delegates.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accepted</p>
                <p className="text-2xl font-semibold text-green-600">
                  {delegates.filter(d => d.application_status === 'accepted').length}
                </p>
              </div>
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {delegates.filter(d => d.application_status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Payment Pending</p>
                <p className="text-2xl font-semibold text-red-600">
                  {delegates.filter(d => d.payment_status === 'pending' || d.payment_status === 'overdue').length}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-red-500" />
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
                  placeholder="Search by name, email, or school..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="waitlist">Waitlist</option>
                    <option value="more_info">More Info Needed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Committee</label>
                  <select
                    value={committeeFilter}
                    onChange={(e) => setCommitteeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Committees</option>
                    {committees.map(committee => (
                      <option key={committee} value={committee}>{committee}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
                  <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Payment Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Delegates Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDelegates(filteredDelegates.map(d => d.id));
                        } else {
                          setSelectedDelegates([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delegate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School & Grade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Committee Preferences
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignment
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      Loading delegates...
                    </td>
                  </tr>
                ) : filteredDelegates.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      No delegates found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDelegates.map((delegate) => (
                    <tr key={delegate.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedDelegates.includes(delegate.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedDelegates(prev => [...prev, delegate.id]);
                            } else {
                              setSelectedDelegates(prev => prev.filter(id => id !== delegate.id));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{delegate.full_name}</div>
                          <div className="text-sm text-gray-500">{delegate.email}</div>
                          <div className="text-xs text-gray-400">{delegate.phone}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <School className="h-3 w-3" />
                            {delegate.school}
                          </div>
                          <div className="text-sm text-gray-500">{delegate.grade}</div>
                          <div className="text-xs text-gray-400">
                            {delegate.experience_level} • {delegate.registration_date}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-blue-600">1. {delegate.committee_preference_1}</div>
                          <div className="text-xs text-gray-500">2. {delegate.committee_preference_2}</div>
                          <div className="text-xs text-gray-400">3. {delegate.committee_preference_3}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {delegate.country_preference}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {delegate.assigned_committee ? (
                          <div>
                            <div className="text-sm font-medium text-green-700">{delegate.assigned_committee}</div>
                            <div className="text-sm text-green-600">{delegate.assigned_country}</div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <select
                              onChange={(e) => handleAssignCommittee(delegate.id, e.target.value)}
                              className="text-xs border border-gray-300 rounded px-2 py-1"
                              defaultValue=""
                            >
                              <option value="">Assign Committee</option>
                              {committees.map(committee => (
                                <option key={committee} value={committee}>{committee}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delegate.application_status)}`}>
                            {delegate.application_status}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleStatusChange(delegate.id, 'accepted')}
                              className="p-1 text-green-600 hover:bg-green-100 rounded"
                              title="Accept"
                            >
                              <Check className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(delegate.id, 'rejected')}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                              title="Reject"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(delegate.id, 'waitlist')}
                              className="p-1 text-yellow-600 hover:bg-yellow-100 rounded"
                              title="Waitlist"
                            >
                              <Clock className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentColor(delegate.payment_status)}`}>
                          {delegate.payment_status}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {delegate.documents_submitted ? (
                            <span className="text-green-600">✓ Docs</span>
                          ) : (
                            <span className="text-red-600">✗ Docs</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-green-600 hover:bg-green-100 rounded"
                            title="Send Email"
                          >
                            <Mail className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedDelegates.length > 0 && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border p-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedDelegates.length} delegate(s) selected
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                  Accept All
                </button>
                <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                  Reject All
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  Send Email
                </button>
                <button
                  onClick={() => setSelectedDelegates([])}
                  className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DelegateManagement;
