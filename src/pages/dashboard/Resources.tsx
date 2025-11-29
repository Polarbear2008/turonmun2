import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Search, 
  Filter,
  Eye,
  Star,
  Clock,
  Users,
  Tag
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', count: 24 },
    { id: 'handbook', name: 'Handbooks', count: 5 },
    { id: 'guide', name: 'Guides', count: 8 },
    { id: 'sample', name: 'Samples', count: 6 },
    { id: 'rules', name: 'Rules & Procedures', count: 3 },
    { id: 'background', name: 'Background Guides', count: 2 }
  ];

  const resources = [
    {
      id: 1,
      title: 'Delegate Handbook 2024',
      description: 'Complete guide for first-time and experienced delegates',
      category: 'handbook',
      type: 'PDF',
      size: '3.2 MB',
      downloadCount: 1247,
      rating: 4.8,
      uploadDate: '2024-01-15',
      tags: ['beginner', 'essential', 'rules'],
      featured: true
    },
    {
      id: 2,
      title: 'Position Paper Writing Guide',
      description: 'Step-by-step guide to writing effective position papers',
      category: 'guide',
      type: 'PDF',
      size: '1.8 MB',
      downloadCount: 892,
      rating: 4.9,
      uploadDate: '2024-01-20',
      tags: ['writing', 'position-paper', 'tips'],
      featured: true
    },
    {
      id: 3,
      title: 'Sample ECOSOC Resolution',
      description: 'Well-formatted resolution example from previous conference',
      category: 'sample',
      type: 'PDF',
      size: '0.9 MB',
      downloadCount: 634,
      rating: 4.6,
      uploadDate: '2024-02-01',
      tags: ['resolution', 'ecosoc', 'format'],
      featured: false
    },
    {
      id: 4,
      title: 'Rules of Procedure',
      description: 'Official rules and procedures for all committees',
      category: 'rules',
      type: 'PDF',
      size: '2.1 MB',
      downloadCount: 1156,
      rating: 4.7,
      uploadDate: '2024-01-10',
      tags: ['rules', 'procedure', 'official'],
      featured: true
    },
    {
      id: 5,
      title: 'Research Methodology Guide',
      description: 'How to conduct effective research for MUN topics',
      category: 'guide',
      type: 'PDF',
      size: '1.5 MB',
      downloadCount: 445,
      rating: 4.5,
      uploadDate: '2024-02-05',
      tags: ['research', 'methodology', 'sources'],
      featured: false
    },
    {
      id: 6,
      title: 'ECOSOC Background Guide',
      description: 'Comprehensive background guide for ECOSOC committee',
      category: 'background',
      type: 'PDF',
      size: '4.1 MB',
      downloadCount: 723,
      rating: 4.8,
      uploadDate: '2024-02-10',
      tags: ['ecosoc', 'background', 'topics'],
      featured: false
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'ppt': return '📊';
      default: return '📄';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-gold-400 fill-current' : 'text-white/30'}`}
      />
    ));
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
          Resources
        </h1>
        <p className="text-white/70">
          Access handbooks, guides, samples, and other helpful materials
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 glass-panel text-white placeholder-white/50 border-white/20 focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50 transition-all rounded-lg"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-white/70" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="glass-panel px-4 py-2 text-white border-white/20 focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50 transition-all rounded-lg"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Featured Resources */}
      {selectedCategory === 'all' && (
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold text-white mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResources.map((resource) => (
              <motion.div
                key={resource.id}
                className="glass-card p-4 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute top-2 right-2">
                  <div className="bg-gold-400/20 text-gold-400 px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 mb-3">
                  <div className="text-2xl">{getFileIcon(resource.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm mb-1 truncate">{resource.title}</h3>
                    <p className="text-white/60 text-xs line-clamp-2">{resource.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/50 mb-3">
                  <span>{resource.size} • {resource.type}</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(resource.rating)}
                    <span className="ml-1">({resource.rating})</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    className="flex-1 bg-gold-500 hover:bg-gold-600 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="h-3 w-3 inline mr-1" />
                    Download
                  </motion.button>
                  <motion.button
                    className="glass-panel text-white hover:bg-white/20 py-2 px-3 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="h-3 w-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Resources */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <span className="text-white/60 text-sm">
            {filteredResources.length} resources found
          </span>
        </div>

        <div className="space-y-3">
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              className="glass-card p-4"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className="text-2xl flex-shrink-0">{getFileIcon(resource.type)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-medium truncate">{resource.title}</h3>
                      {resource.featured && (
                        <span className="bg-gold-400/20 text-gold-400 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm mb-2 line-clamp-1">{resource.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-white/50">
                      <span>{resource.size} • {resource.type}</span>
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>{resource.downloadCount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(resource.rating)}
                        <span className="ml-1">({resource.rating})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{resource.uploadDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="text-white/50 text-xs">+{resource.tags.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                  <motion.button
                    className="glass-panel text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    className="bg-gold-500 hover:bg-gold-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="h-4 w-4 inline mr-1" />
                    Download
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="glass-card p-8 text-center">
            <BookOpen className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60">No resources found matching your criteria.</p>
            <p className="text-white/40 text-sm mt-1">Try adjusting your search or filter settings.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
