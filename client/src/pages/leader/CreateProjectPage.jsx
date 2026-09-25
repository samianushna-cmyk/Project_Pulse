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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C87841] hover:text-[#A35222] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Leader Workspace
          </Link>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#1E281F] flex items-center justify-center shadow-md shadow-[#1E281F]/15">
              <FolderPlus className="w-5 h-5 text-[#FAF8F4]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1D1B] tracking-tight">
                Create New Project
              </h1>
              <p className="text-xs sm:text-sm text-[#525850]">
                Define the requirements, category, and squad capacity for your upcoming initiative.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-sm shadow-xs animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{successMessage}</div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm shadow-xs animate-fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
          <button
            type="button"
            onClick={() => setErrorMessage('')}
            className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Project Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. General Project Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/70 shadow-[0_10px_30px_rgba(28,29,27,0.04)] space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
            <div className="w-9 h-9 rounded-xl bg-[#EAF2E8] text-[#2D452E] flex items-center justify-center border border-[#2D452E]/15">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1C1D1B]">Project Overview</h2>
              <p className="text-xs text-stone-500">Provide the title, scope, and domain</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
              >
                Project Title <span className="text-[#C87841]">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g. E-Commerce Platform for Student Entrepreneurs"
                className="block w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-stone-300 rounded-xl text-sm text-[#1C1D1B] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841] focus:bg-white transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
              >
                Project Description <span className="text-[#C87841]">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Describe the problem, objectives, architecture, and expected deliverables..."
                className="block w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-stone-300 rounded-xl text-sm text-[#1C1D1B] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841] focus:bg-white transition-all resize-y"
              />
            </div>

            {/* Category & Max Team Size Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Category <span className="text-[#C87841]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="block w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-stone-300 rounded-xl text-sm text-[#1C1D1B] focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841] focus:bg-white transition-all cursor-pointer"
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
                    className="mt-2 block w-full px-3.5 py-2 bg-[#F7F5F0] border border-stone-300 rounded-xl text-sm text-[#1C1D1B] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841] focus:bg-white transition-all"
                  />
                )}
              </div>

              {/* Max Team Size */}
              <div>
                <label
                  htmlFor="maxTeamSize"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Max Team Size <span className="text-[#C87841]">*</span>
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
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
                    className="block w-full pl-10 pr-3.5 py-2.5 bg-[#F7F5F0] border border-stone-300 rounded-xl text-sm text-[#1C1D1B] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Status (Default Open) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="status"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Initial Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="block w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-stone-300 rounded-xl text-sm text-[#1C1D1B] focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <p className="mt-1 text-[11px] text-stone-500">
                  Defaults to &quot;Open&quot; for team formation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Required Skills Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/70 shadow-[0_10px_30px_rgba(28,29,27,0.04)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FBECE3] text-[#C87841] flex items-center justify-center border border-[#C87841]/20">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1C1D1B]">Required Skills</h2>
                <p className="text-xs text-stone-500">
                  Skills candidates must possess to contribute effectively
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#2D452E] bg-[#EAF2E8] border border-[#2D452E]/15 px-3 py-1 rounded-full">
              {formData.requiredSkills.length} {formData.requiredSkills.length === 1 ? 'Skill' : 'Skills'}
            </span>
          </div>

          {/* Skill Add Input */}
          <div>
            <label
              htmlFor="skillInput"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
            >
              Add Required Skill <span className="text-[#C87841]">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-grow shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Sparkles className="w-4 h-4 text-[#C87841]" />
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
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-[#F7F5F0] border border-stone-300 rounded-xl text-sm text-[#1C1D1B] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841] focus:bg-white transition-all"
                />
              </div>
              <button
                type="button"
                onClick={() => handleAddSkill()}
                className="px-4 py-2.5 rounded-xl bg-[#1E281F] hover:bg-[#151D16] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4 text-[#C87841]" />
                <span>Add</span>
              </button>
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
            <span className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Added Required Skills
            </span>
            {formData.requiredSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-[#FAF8F4] border border-stone-200/80">
                {formData.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F2EFE9] text-stone-800 border border-stone-300/60 shadow-xs group hover:border-stone-400 transition-all"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="p-0.5 rounded-full text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title={`Remove ${skill}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-dashed border-stone-300 text-center text-stone-500 text-xs">
                No skills added yet. Type a skill name above and press Enter or select from suggestions below.
              </div>
            )}
          </div>

          {/* Popular Suggestions */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
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
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed opacity-60'
                        : 'bg-white text-stone-700 hover:text-[#1E281F] hover:border-stone-400 border border-stone-200 shadow-xs cursor-pointer'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Plus className="w-3 h-3 text-stone-400" />
                    )}
                    {popularSkill}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/70 shadow-[0_10px_30px_rgba(28,29,27,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-500 text-center sm:text-left">
            Once created, the project will immediately be visible to students and faculty.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/leader/dashboard"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold text-center transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1E281F] hover:bg-[#151D16] text-white text-xs font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C87841]" />
                  <span>Creating Project...</span>
                </>
              ) : (
                <>
                  <FolderPlus className="w-4 h-4 text-[#C87841]" />
                  <span>Create Project</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
