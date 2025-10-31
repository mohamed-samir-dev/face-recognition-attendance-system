interface DepartmentSelectorProps {
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
}

export default function DepartmentSelector({ selectedDepartment, onDepartmentChange }: DepartmentSelectorProps) {
  const departments = ['All', 'IT', 'HR', 'Finance', 'Marketing', 'Sales'];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Team / Department</h2>
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => onDepartmentChange(dept)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDepartment === dept
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>
    </div>
  );
}