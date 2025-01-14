import {useState} from "react";
import {Pencil, Eye, Trash2, Search, X} from "lucide-react";

interface SeriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitText: string;
  initialValue?: string;
}

const SeriesModal: React.FC<SeriesModalProps> = ({
  isOpen,
  onClose,
  title,
  submitText,
  initialValue = "",
}) => {
  const [value, setValue] = useState(initialValue);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Series Name*
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Series = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSeries, setEditingSeries] = useState("");

  const seriesList = [
    "Series 1",
    "Series 2",
    "Series 3",
    "Series 4",
    "Series 5",
    "Series 6",
    "Series 7",
    "Series 8",
  ];

  const handleEdit = (series: string) => {
    setEditingSeries(series);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Marketplace</span>
        <span>/</span>
        <span className="text-gray-700">Series</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Series</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Series
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Series Grid */}
      <div className="grid grid-cols-2 gap-4">
        {seriesList.map((series, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 flex items-center justify-between border border-gray-100"
          >
            <div className="flex items-center">
              <span className="font-medium text-gray-700">{series}</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleEdit(series)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Eye className="w-5 h-5" />
              </button>
              <button className="text-red-400 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Series Modal */}
      <SeriesModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Series"
        submitText="Save"
      />

      {/* Edit Series Modal */}
      <SeriesModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSeries("");
        }}
        title="Edit Series"
        submitText="Update"
        initialValue={editingSeries}
      />
    </div>
  );
};
