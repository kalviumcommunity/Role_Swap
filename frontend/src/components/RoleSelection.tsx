import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChefHat, 
  Palette, 
  Shield, 
  GraduationCap, 
  Plane, 
  Stethoscope, 
  Code,
  BarChart3,
  Megaphone,
  TrendingUp,
  Users,
  Heart,
  Scale,
  Building,
  Target,
  FileText,
  ArrowRight 
} from 'lucide-react';
import { roles } from '../data/roles';

const iconMap = {
  ChefHat,
  Palette,
  Shield,
  GraduationCap,
  Plane,
  Stethoscope,
  Code,
  BarChart3,
  Megaphone,
  TrendingUp,
  Users,
  Heart,
  Scale,
  Building,
  Target,
  FileText,
};

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (roleId: string) => {
    navigate(`/simulation/${roleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Career Adventure</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select a career role to experience realistic workplace scenarios and discover your professional strengths.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {roles.map((role) => {
            const IconComponent = iconMap[role.icon as keyof typeof iconMap];
            
            return (
              <div
                key={role.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className={`h-32 bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                  <IconComponent className="w-16 h-16 text-white" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{role.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">{role.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {role.scenarios.length} scenarios
                    </span>
                    <div className="flex items-center text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                      <span className="text-sm font-medium mr-1">Start Simulation</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-gray-200/50 dark:border-gray-700/50 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose Your Role</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Select from 16 diverse career paths spanning IT, healthcare, business, and creative fields</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Navigate Scenarios</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Make critical decisions in realistic workplace situations under time pressure</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Get AI Insights</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive personalized feedback on your career fit and professional development areas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}