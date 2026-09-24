import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createProject } from '../../services/projectService';
import {
  FolderPlus,
  ArrowLeft,
  Plus,
  X,
  Sparkles,
  Users,
  Tag,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  Crown
} from 'lucide-react';
import Button from '../../components/Button';

// Recommended categories
const CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'AI / Machine Learning',
  'Cloud & DevOps',
  'Cybersecurity',
  'IoT & Embedded Systems',
  'Blockchain & Web3',
  'Data Science & Analytics',
  'Full Stack Development',
  'Other'
];

// Popular quick-add skill suggestions
const POPULAR_SKILLS = [
  'React',
  'Node.js',
  'MongoDB',
  'Git',
  'Python',
  'TypeScript',
  'Docker',
  'Express',
  'Tailwind CSS',
  'SQL',
  'FastAPI',
  'Machine Learning'
];

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    customCategory: '',
    requiredSkills: [],
    maxTeamSize: 4,
    status: 'Open',
  });

  const [skillInput, setSkillInput] = useState('');
  const [skillError, setSkillError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle standard input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  // Add skill to requiredSkills
  const handleAddSkill = (skillToAdd) => {
    const skillName = (skillToAdd || skillInput).trim();
    if (!skillName) return;

    // Case-insensitive duplicate check
    const exists = formData.requiredSkills.some(
      (s) => s.toLowerCase() === skillName.toLowerCase()
    );

    if (exists) {
      setSkillError(`"${skillName}" is already added to required skills.`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      requiredSkills: [...prev.requiredSkills, skillName],
    }));

    setSkillInput('');
    setSkillError('');
    if (errorMessage) setErrorMessage('');
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s !== skillToRemove),
    }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSkillError('');

    // Validations
    if (!formData.title.trim()) {
      setErrorMessage('Project title is required.');
      return;
    }

    if (!formData.description.trim()) {
      setErrorMessage('Project description is required.');
      return;
    }

    const selectedCategory =
      formData.category === 'Other'
        ? formData.customCategory.trim()
        : formData.category.trim();

    if (!selectedCategory) {
      setErrorMessage('Please specify a project category.');
      return;
    }

    if (formData.requiredSkills.length === 0) {
      setSkillError('Please add at least one required skill for this project.');
      setErrorMessage('At least one required skill is required.');
      return;
    }

    const teamSizeNum = Number(formData.maxTeamSize);
    if (isNaN(teamSizeNum) || teamSizeNum < 1) {
      setErrorMessage('Maximum team size must be at least 1.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: selectedCategory,
        requiredSkills: formData.requiredSkills,
        maxTeamSize: teamSizeNum,
        status: formData.status || 'Open',
      };

      const result = await createProject(payload);

      if (result.success) {
        setSuccessMessage('Project created successfully! Redirecting to projects list...');
        setTimeout(() => {
          navigate('/projects');
        }, 1200);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to create project. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/leader/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Leader Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create New Project
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Define the requirements, category, and squad capacity for your upcoming initiative.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-sm shadow-xs animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{successMessage}</div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm shadow-xs animate-fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
          <button
            type="button"
            onClick={() => setErrorMessage('')}
            className="text-rose-500 hover:text-rose-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Project Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. General Project Details */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Project Overview</h2>
              <p className="text-xs text-slate-500">Provide the title, scope, and domain</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Project Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g. E-Commerce Platform for Student Entrepreneurs"
                className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Project Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Describe the problem, objectives, architecture, and expected deliverables..."
                className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-colors resize-y"
              />
            </div>

            {/* Category & Max Team Size Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Category <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-colors cursor-pointer"
                  >
                    {CATEGORIES.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                {formData.category === 'Other' && (
                  <input
                    type="text"
                    name="customCategory"
                    value={formData.customCategory}
                    onChange={handleInputChange}
                    placeholder="Enter custom category name"
                    className="mt-2 block w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-colors"
                  />
                )}
              </div>

              {/* Max Team Size */}
              <div>
                <label
                  htmlFor="maxTeamSize"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Max Team Size <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    id="maxTeamSize"
                    name="maxTeamSize"
                    min="1"
                    max="20"
                    value={formData.maxTeamSize}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Status (Default Open) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="status"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Initial Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <p className="mt-1 text-[11px] text-slate-500">
                  Defaults to &quot;Open&quot; for team formation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Required Skills Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Required Skills</h2>
                <p className="text-xs text-slate-500">
                  Skills candidates must possess to contribute effectively
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full">
              {formData.requiredSkills.length} {formData.requiredSkills.length === 1 ? 'Skill' : 'Skills'}
            </span>
          </div>

          {/* Skill Add Input */}
          <div>
            <label
              htmlFor="skillInput"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Add Required Skill <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-grow shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
                <input
                  type="text"
                  id="skillInput"
                  value={skillInput}
                  onChange={(e) => {
                    setSkillInput(e.target.value);
                    if (skillError) setSkillError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="e.g. React, Node.js, MongoDB, Git"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-colors"
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

          {/* Skill Chips */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Added Required Skills
            </span>
            {formData.requiredSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                {formData.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-purple-700 border border-purple-200 shadow-xs group hover:border-purple-300 transition-colors"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="p-0.5 rounded-full text-purple-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title={`Remove ${skill}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-slate-500 text-sm">
                No skills added yet. Type a skill name above and press Enter or select from recommendations below.
              </div>
            )}
          </div>

          {/* Popular Suggestions */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Suggested Skills
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SKILLS.map((popularSkill, idx) => {
                const isSelected = formData.requiredSkills.some(
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
                        : 'bg-white text-slate-700 hover:text-purple-600 hover:border-purple-300 border border-slate-200 hover:bg-purple-50/50 shadow-xs cursor-pointer'
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

        {/* Action Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Once created, the project will immediately be visible to students and faculty.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              to="/leader/dashboard"
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
              icon={isSubmitting ? Loader2 : FolderPlus}
              iconPosition="left"
              disabled={isSubmitting}
              className="w-full sm:w-auto justify-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 shadow-sm shadow-purple-500/20"
            >
              {isSubmitting ? 'Creating Project...' : 'Create Project'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
