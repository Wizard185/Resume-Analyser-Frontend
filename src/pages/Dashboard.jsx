import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PlusCircle, FileText, BarChart3, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.fullName}!</p>
        </div>
        <Link to="/analyze">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
            <PlusCircle className="w-5 h-5" />
            New Analysis
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Start Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg col-span-1 md:col-span-2 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Analyze your Resume</h3>
            <p className="text-indigo-100 mb-6 max-w-lg">
              Get an instant ATS score, identify missing skills, and receive AI-powered project suggestions to tailor your profile for your dream job.
            </p>
            <Link to="/analyze" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Start Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Decorative circles */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute right-20 bottom-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-y-1/2"></div>
        </div>

        {/* Stats / Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <BarChart3 className="w-6 h-6"/>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Your History</h4>
                    <p className="text-sm text-gray-500">Track your progress</p>
                </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">View past analyses to see how your resume has improved over time.</p>
            <Link to="/history" className="text-blue-600 font-medium hover:underline text-sm">View History &rarr;</Link>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: "1. Upload", desc: "Upload your resume (PDF/DOCX) and the Job Description.", icon: FileText },
                { title: "2. Analyze", desc: "Our AI scans for keywords, skills, and experience gaps.", icon: BarChart3 },
                { title: "3. Improve", desc: "Get actionable feedback and project ideas to fill the gaps.", icon: PlusCircle }
            ].map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                        <step.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;