import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  User,
  Mail,
  Building,
  Sparkles,
  Plus,
  X,
  Github,
  Globe,
  Check,
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Clock,
  Briefcase,
  Code2
} from 'lucide-react';
import Button from '../../components/Button';

// Recommended skills quick-add list
const POPULAR_SKILLS = [
  'React',
  'Node.js',
  'JavaScript',
  'Python',
  'MongoDB',
  'Express',
  'Tailwind CSS',
  'Docker',
  'TypeScript',
  'Git',
  'FastAPI',
  'SQL',
  'Figma',
  'GraphQL',
  'Next.js',
  'Machine Learning'
];

// Standard role options for student collaboration
const ROLE_OPTIONS = [
  'Frontend',
  'Backend',
  'Database',
  'Designer',
  'QA',
  'Deployment Lead'
];

// Availability options
const AVAILABILITY_OPTIONS = [
  {
    value: 'Available',
    label: 'Available',
    desc: 'Ready to join new project squads and take on active tasks.',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500'
  },
  {
    value: 'Partially Available',
    label: 'Partially Available',
    desc: 'Can contribute limited hours alongside other semester workload.',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotClass: 'bg-amber-500'
  },
  {
    value: 'Not Available',
    label: 'Not Available',
    desc: 'Currently at full capacity or preparing for examinations.',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    dotClass: 'bg-rose-500'
  }
];

export default function StudentProfilePage() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: [],
    preferredRoles: [],
    availability: 'Available',
    githubUrl: '',
    portfolioUrl: '',
  });

  const [newSkillInput, setNewSkillInput] = useState('');
  const [skillError, setSkillError] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch student profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get('/users/profile');
        if (data.success && data.user) {
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            department: data.user.department || '',
            skills: Array.isArray(data.user.skills) ? data.user.skills : [],
            preferredRoles: Array.isArray(data.user.preferredRoles) ? data.user.preferredRoles : [],
            availability: data.user.availability || 'Available',
            githubUrl: data.user.githubUrl || '',
            portfolioUrl: data.user.portfolioUrl || '',
          });
        }
      } catch (err) {
        setErrorMessage(
          err.response?.data?.message || 'Failed to load profile data. Please refresh.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Text inputs handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
    if (successMessage) setSuccessMessage('');
  };

  // Add a skill
  const handleAddSkill = (skillToAdd) => {
    const skillName = (skillToAdd || newSkillInput).trim();
    if (!skillName) return;

    // Duplicate check (case-insensitive)
    const exists = formData.skills.some(
      (s) => s.toLowerCase() === skillName.toLowerCase()
    );

    if (exists) {
      setSkillError(`"${skillName}" is already in your skills list.`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skillName],
    }));

    setNewSkillInput('');
    setSkillError('');
    if (successMessage) setSuccessMessage('');
  };

  // Remove a skill
  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
    if (successMessage) setSuccessMessage('');
  };

  // Toggle Preferred Role
  const handleToggleRole = (role) => {
    setFormData((prev) => {
      const exists = prev.preferredRoles.includes(role);
      return {
        ...prev,
        preferredRoles: exists
          ? prev.preferredRoles.filter((r) => r !== role)
          : [...prev.preferredRoles, role],
      };
    });
    if (successMessage) setSuccessMessage('');
  };

  // Select Availability
  const handleSelectAvailability = (avail) => {
    setFormData((prev) => ({ ...prev, availability: avail }));
    if (successMessage) setSuccessMessage('');
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSkillError('');

    // Basic frontend validations
    if (!formData.name.trim()) {
      setErrorMessage('Full Name is required.');
      return;
    }

    if (!formData.department.trim()) {
      setErrorMessage('Department is required.');
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        name: formData.name.trim(),
        department: formData.department.trim(),
        skills: formData.skills,
        preferredRoles: formData.preferredRoles,
        availability: formData.availability,
        githubUrl: formData.githubUrl.trim(),
        portfolioUrl: formData.portfolioUrl.trim(),
      };

      const { data } = await api.put('/users/profile', payload);

      if (data.success && data.user) {
        setSuccessMessage('Profile updated successfully! Your changes are saved to MongoDB.');
        // Update context so app-wide state stays in sync
        updateUser(data.user);
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-9 h-9 text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading student profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Student Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Profile & Skills
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Keep your technical skills, role preferences, and availability updated for accurate team matching.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            icon={isSaving ? Loader2 : Save}
            iconPosition="left"
            onClick={handleSubmit}
            disabled={isSaving}
            className="shadow-sm shadow-indigo-500/20"
          >
            {isSaving ? 'Saving Changes...' : 'Save Profile'}
          </Button>
        </div>
      </div>

      {/* Feedback Alerts */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-sm shadow-xs animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Success:</span> {successMessage}
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage('')}
            className="text-emerald-500 hover:text-emerald-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm shadow-xs animate-fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Error:</span> {errorMessage}
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage('')}
            className="text-rose-500 hover:text-rose-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Basic Information Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Academic & Personal Info</h2>
              <p className="text-xs text-slate-500">Your core institutional identity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Alex Rivera"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Email (Read-Only) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  Institutional Email
                </label>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <Lock className="w-3 h-3" /> Read-only
                </span>
              </div>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  disabled
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed select-none"
                />
              </div>
            </div>

            {/* Department */}
            <div className="sm:col-span-2">
              <label
                htmlFor="department"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Department / Major <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Building className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Computer Science & Engineering"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Technical Skills Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Technical Skills</h2>
                <p className="text-xs text-slate-500">
                  Used by our matching engine to recommend complementary teammates
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
              {formData.skills.length} {formData.skills.length === 1 ? 'Skill' : 'Skills'}
            </span>
          </div>

          {/* Skill Add Input */}
          <div>
            <label
              htmlFor="skillInput"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Add a Technical Skill
            </label>
            <div className="flex gap-2">
              <div className="relative flex-grow shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                </div>
                <input
                  type="text"
                  id="skillInput"
                  value={newSkillInput}
                  onChange={(e) => {
                    setNewSkillInput(e.target.value);
                    if (skillError) setSkillError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="e.g. React, Docker, Python, PostgreSQL"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                size="md"
                icon={Plus}
                onClick={() => handleAddSkill()}
              >
                Add
              </Button>
            </div>
            {skillError && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {skillError}
              </p>
            )}
          </div>

          {/* Current Skills Tags */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Your Current Skills
            </span>
            {formData.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                {formData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-indigo-700 border border-indigo-200 shadow-xs group hover:border-indigo-300 transition-colors"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="p-0.5 rounded-full text-indigo-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title={`Remove ${skill}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-slate-500 text-sm">
                No skills added yet. Type a skill above or click from suggestions below.
              </div>
            )}
          </div>

          {/* Popular Skill Suggestions */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Popular Quick-Add Suggestions
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SKILLS.map((popularSkill, idx) => {
                const isSelected = formData.skills.some(
                  (s) => s.toLowerCase() === popularSkill.toLowerCase()
                );
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isSelected}
                    onClick={() => handleAddSkill(popularSkill)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                        : 'bg-white text-slate-700 hover:text-indigo-600 hover:border-indigo-300 border border-slate-200 hover:bg-indigo-50/50 shadow-xs cursor-pointer'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Plus className="w-3 h-3 text-slate-400" />
                    )}
                    {popularSkill}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Preferred Roles Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Preferred Project Roles</h2>
              <p className="text-xs text-slate-500">
                Select the team roles you are most interested in executing
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ROLE_OPTIONS.map((role, idx) => {
              const isSelected = formData.preferredRoles.includes(role);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleToggleRole(role)}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-500 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                      : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-sm font-semibold">{role}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Availability Status Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Project Availability</h2>
              <p className="text-xs text-slate-500">
                Signals your bandwidth to leaders recruiting for semester projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AVAILABILITY_OPTIONS.map((opt, idx) => {
              const isSelected = formData.availability === opt.value;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectAvailability(opt.value)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-50/60 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'bg-slate-50/80 hover:bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${opt.badgeClass}`}>
                        <span className={`w-2 h-2 rounded-full ${opt.dotClass}`}></span>
                        {opt.label}
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {opt.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. External Proof Links (GitHub & Portfolio) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Developer Proof Links</h2>
              <p className="text-xs text-slate-500">
                Optional links to your GitHub profile and online portfolio
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* GitHub URL */}
            <div>
              <label
                htmlFor="githubUrl"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                GitHub Profile URL
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Github className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/yourusername"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Portfolio URL */}
            <div>
              <label
                htmlFor="portfolioUrl"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Portfolio / Personal Website URL
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Globe className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.dev"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Action Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Changes will update your developer skill profile immediately.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              to="/student/dashboard"
              variant="outline"
              size="md"
              className="w-full sm:w-auto justify-center"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={isSaving ? Loader2 : Save}
              iconPosition="left"
              disabled={isSaving}
              className="w-full sm:w-auto justify-center shadow-sm shadow-indigo-500/20"
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
