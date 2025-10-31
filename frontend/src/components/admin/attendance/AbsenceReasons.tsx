import { AbsenceReason } from '@/lib/types';

interface AbsenceReasonsProps {
  absenceReasons: AbsenceReason[];
}

export default function AbsenceReasons({ absenceReasons }: AbsenceReasonsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Absence Reasons</h3>
      <div className="space-y-4">
        {absenceReasons.slice(0, 3).map((reason) => (
          <div key={reason.reason}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">{reason.reason}</span>
              <span className="text-sm font-medium text-gray-900">{reason.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${reason.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}