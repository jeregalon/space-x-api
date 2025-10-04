export default function Tabs({ activeTabId, moveToTab }) {
  
    const tabs = [
        { id: 0, label: "Historia" },
        { id: 1, label: "Cohetes" },
        { id: 2, label: "Cápsulas" },
        { id: 3, label: "Lanzamientos" },
    ]

  return (
    <div className="fixed w-full bg-white rounded-2xl shadow-md p-2 flex justify-around max-w-3xl mx-auto mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => moveToTab(tab.id)}
          className={`flex-1 text-center py-2 rounded-xl font-medium transition-colors duration-200
            ${
              activeTabId === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
