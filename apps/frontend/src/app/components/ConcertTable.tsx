export default function ConcertTable() {
  const data = [
    {
      dateTime: "12/09/2024 15:00:00",
      username: "Sara John",
      concertName: "The festival Int 2024",
      action: "Cancel",
    },
    {
      dateTime: "12/09/2024 10:39:20",
      username: "Sara John",
      concertName: "The festival Int 2024",
      action: "Reserve",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="overflow-x-auto border border-gray-400 rounded-lg">
        <table className="w-full">
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
    </div>
  );
}
