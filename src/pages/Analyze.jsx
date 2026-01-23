import { useState } from "react";
import { analyzeResume } from "../api/resume.api";
import { UploadCloud, FileText, CheckCircle, XCircle, ChevronDown, ChevronUp, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from "recharts";
import { clsx } from "clsx";
import { useLocation } from "react-router-dom";
const normalizeAnalysisResult = (data) => {
  if (!data) return null;

  // If coming from fresh analysis
  if (data.jdExperience || data.candidateExperience) {
    return {
      ...data,
      experience: {
        jd: data.jdExperience,
        candidate: data.candidateExperience,
      },
    };
  }

  // If coming from history (already normalized)
  return data;
};

const Analyze = () => {
  const [resume, setResume] = useState(null);
  const location = useLocation();
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(
  normalizeAnalysisResult(location.state?.analysis) || null
);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDescription) {
      setError("Please provide both a resume and a job description.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);
      const res = await analyzeResume(formData);
      setResult(normalizeAnalysisResult(res.data.data));
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed. Please check your file and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const ScoreGauge = ({ score }) => {
    const data = [
      { name: 'Score', uv: score, fill: score >= 70 ? '#22c55e' : score >= 40 ? '#eab308' : '#ef4444' },
      { name: 'Max', uv: 100, fill: '#f3f4f6' }
    ];
    
    return (
      <div className="h-48 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="80%" outerRadius="100%" barSize={15} data={data} startAngle={180} endAngle={0}>
            <RadialBar background clockWise dataKey="uv" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-4">
          <span className={clsx("text-4xl font-bold", score >= 70 ? 'text-green-500' : score >= 40 ? 'text-yellow-500' : 'text-red-500')}>
            {score}%
          </span>
          <p className="text-gray-400 text-sm">Match Rate</p>
        </div>
      </div>
    );
  };

  const SuggestionCard = ({ title, items, icon: Icon, colorClass }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
            <div className={clsx("px-4 py-3 border-b flex items-center gap-2", colorClass)}>
                <Icon className="w-5 h-5" />
                <h4 className="font-semibold">{title}</h4>
            </div>
            <div className="p-4">
                <ul className="space-y-3">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                             <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                             <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-900">Resume Analyzer</h1>
        <p className="text-gray-500">Upload your resume and a job description to get AI-powered insights.</p>
      </div>

      {!result && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Inputs */}
          <div className="space-y-6">
            {/* File Upload */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">1. Upload Resume</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors relative">
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-900">{resume ? resume.name : "Click to upload or drag & drop"}</p>
                <p className="text-xs text-gray-500 mt-1">PDF or DOCX (Max 2MB)</p>
              </div>
            </div>

            {/* JD Input */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">2. Job Description</label>
              <textarea
                rows={12}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here..."
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-4 border resize-none"
              />
            </div>
            
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                   <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                    <Sparkles className="w-5 h-5" /> Analyze Resume
                </>
              )}
            </button>
          </div>

          {/* Right: Info/Placeholder */}
          <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-dashed border-blue-200 p-8 text-center">
             <img src="https://picsum.photos/400/300?blur=2" alt="Analysis Preview" className="rounded-xl opacity-50 mb-6 grayscale mix-blend-multiply" />
             <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to optimize?</h3>
             <p className="text-gray-600 max-w-sm">
               Our AI will analyze your skills, experience, and projects against the job description to give you a competitive edge.
             </p>
          </div>
        </form>
      )}

      {/* Results View */}
      {result && (
        <div className="animate-fade-in space-y-6">
            <button onClick={() => setResult(null)} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 mb-2">
                &larr; Start New Analysis
            </button>
          
          {/* Top Row: Score & Basic Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">ATS Compatibility</h3>
                <ScoreGauge score={result.atsScore} />
                <div className="mt-4 flex gap-4 text-sm">
                    <div className="text-center">
                        <span className="block font-bold text-gray-900">{result.breakdown.skills?.matched.length}</span>
                        <span className="text-gray-500">Skills Found</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-gray-900">{result.breakdown.skills?.missing.length}</span>
                        <span className="text-gray-500">Missing</span>
                    </div>
                </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Experience & Level</h3>
                <div className="grid grid-cols-2 gap-30">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-4">
    Experience & Level
  </h3>

  <div className="grid grid-cols-2 gap-4">
    {/* Job Requirement */}
    <div className="bg-gray-50 p-4 rounded-xl">
      <p className="text-sm text-gray-500 mb-1">Job Requires</p>
      <p className="text-xl font-bold text-gray-900">
        {result.experience?.jd?.min ?? 0}
        {result.experience?.jd?.max ?? "+"} Years
      </p>
      {result.experience?.jd?.level && (
        <span className="inline-block mt-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded font-medium">
          {result.experience.jd.level}
        </span>
      )}
    </div>

    {/* Candidate Experience */}
    <div
      className={clsx(
        "p-4 rounded-xl",
        (result.experience?.candidate?.years ?? 0) >=
          (result.experience?.jd?.min ?? 0)
          ? "bg-green-50 border border-green-100"
          : "bg-red-50 border border-red-100"
      )}
    >
      <p className="text-sm text-gray-500 mb-1">You Have</p>
      <p className="text-xl font-bold text-gray-900">
        {result.experience?.candidate?.years ?? 0} Years
      </p>
      {result.experience?.candidate?.level && (
        <span
          className={clsx(
            "inline-block mt-2 px-2 py-1 text-xs rounded font-medium",
            (result.experience?.candidate?.years ?? 0) >=
              (result.experience?.jd?.min ?? 0)
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          )}>
          {result.experience.candidate.level}
        </span>
      )}
    </div>
  </div>
</div>

                    </div>
                </div>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-green-700 mb-4">
                    <CheckCircle className="w-5 h-5"/> Matched Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                    {result.breakdown.skills?.matched.length > 0 ? (
                        result.breakdown.skills.matched.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-sm font-medium">
                                {skill}
                            </span>
                        ))
                    ) : <p className="text-gray-500 text-sm">No exact skill matches found.</p>}
                </div>
             </div>
             
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-red-600 mb-4">
                    <XCircle className="w-5 h-5"/> Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                    {result.breakdown.skills?.missing.length > 0 ? (
                        result.breakdown.skills.missing.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-red-50 text-red-700 border border-red-100 rounded-full text-sm font-medium">
                                {skill}
                            </span>
                        ))
                    ) : <p className="text-gray-500 text-sm">No missing skills detected! Great job.</p>}
                </div>
             </div>
          </div>

          {/* AI Suggestions Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" /> AI Recommendations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SuggestionCard 
                    title="Profile Summary Improvements"
                    items={result.suggestions.ai?.summary}
                    icon={FileText}
                    colorClass="bg-blue-50 text-blue-800"
                />
                
                <SuggestionCard 
                    title="Reframe Existing Projects"
                    items={result.suggestions.ai?.reframeSuggestions}
                    icon={CheckCircle}
                    colorClass="bg-green-50 text-green-800"
                />
            </div>

            {result.suggestions.ai?.projectIdeas?.length > 0 && (
                <div className="mt-6">
                     <SuggestionCard 
                        title="Suggested Projects to Build"
                        items={result.suggestions.ai.projectIdeas}
                        icon={Sparkles}
                        colorClass="bg-purple-50 text-purple-800"
                    />
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyze;