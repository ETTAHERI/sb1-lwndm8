import { Users, BookOpen, Bus, Calendar } from 'lucide-react';

const stats = [
  { name: 'Total Students', value: '2,500', icon: Users },
  { name: 'Total Teachers', value: '150', icon: BookOpen },
  { name: 'Active Buses', value: '25', icon: Bus },
  { name: 'Classes Today', value: '180', icon: Calendar },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to MySchool Management System
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activities
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-600">
                    New student registration completed
                  </p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Parent-Teacher Meeting
                  </p>
                  <p className="text-xs text-gray-500">March 15, 2024</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}