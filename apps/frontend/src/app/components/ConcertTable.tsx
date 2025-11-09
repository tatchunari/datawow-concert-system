export interface ConcertTableRow {
  dateTime: string;
  username: string;
  concertName: string;
  action: string;
}

interface ConcertTableProps {
  data: ConcertTableRow[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function ConcertTable({
  data,
  isLoading = false,
  emptyMessage = "No records found",
}: ConcertTableProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-full p-4 flex justify-center items-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full max-w-full p-4">
        <div className="bg-white border border-gray-400 rounded-lg p-8 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full p-4">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto border border-gray-400 rounded-lg">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-400">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-400">
                Date time
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-400">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-400">
                Concert name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index !== data.length - 1 ? "border-b border-gray-400" : ""
                } hover:bg-gray-50 transition-colors`}
              >
                <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-400">
                  {row.dateTime}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-400">
                  {row.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-400">
                  {row.concertName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data.map((row, index) => (
          <div
            key={index}
            className="bg-white border border-gray-400 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    Date time
                  </p>
                  <p className="text-sm text-gray-900">{row.dateTime}</p>
                </div>
                <div className="ml-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      row.action === "Cancel"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {row.action}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  Username
                </p>
                <p className="text-sm text-gray-900">{row.username}</p>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  Concert name
                </p>
                <p className="text-sm text-gray-900">{row.concertName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
