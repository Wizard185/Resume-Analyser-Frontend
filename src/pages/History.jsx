import { useEffect, useState } from "react";
import { Loader2, Trash2, Calendar, FileText } from "lucide-react";
import { clsx } from "clsx";
import { getAnalysisHistory, deleteAnalysis, deleteAllAnalysis } from "../api/resume.api";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await getAnalysisHistory();
      // res.data.data.results contains the array
      setHistory(res.data.data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteAnalysis(id);
      setHistory(history.filter(h => h._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };
  const handleClearAll = async () => {
  if (!window.confirm("This will delete all analysis history. Continue?")) return;
  try {
    await deleteAllAnalysis();
    setHistory([]);
  } catch (err) {
    alert("Failed to clear history");
  }
};

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-blue-500" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
  <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>

  {history.length > 0 && (
    <button
      onClick={handleClearAll}
      className="text-sm text-red-600 hover:text-red-700 font-medium"
    >
      Clear All
    </button>
  )}
</div>


      {history.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-gray-200">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-medium text-lg">No history found</h3>
            <p className="text-gray-500">You haven't analyzed any resumes yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-shadow hover:shadow-md">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={clsx(
                            "px-3 py-1 rounded-full text-xs font-bold",
                            item.atsScore >= 70 ? "bg-green-100 text-green-800" : item.atsScore >= 40 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                        )}>
                            Score: {item.atsScore}
                        </span>
                        <span className="flex items-center text-xs text-gray-500 gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    {/* Just basic info as job summary might not be available or long */}
                    <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">Skills Matched:</span> {item.breakdown?.skills?.matched?.length || 0}
                    </div>
                </div>
                
                <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;