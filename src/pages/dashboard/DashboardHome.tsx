const DashboardHome = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Ecommerce Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's what's happening.
        </p>
      </div>

      {/* Placeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          "Total Revenue",
          "Total Orders",
          "Total Customers",
          "Total Products",
        ].map((title, i) => (
          <div key={i} className="card">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">---</p>
          </div>
        ))}
      </div>

      {/* Center Content Area */}
      <div className="mt-8 card min-h-[400px] flex items-center justify-center">
        <p className="text-gray-400 text-lg">Dashboard content goes here</p>
      </div>
    </div>
  );
};

export default DashboardHome;
