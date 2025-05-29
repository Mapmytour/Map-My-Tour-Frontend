
export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative">
        {/* Main Loading Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 space-y-8 transition-all duration-500">
          
          {/* Loading Icon */}
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center py-4">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                Loading Authentication
              </h1>
              <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
                Please wait while we prepare your secure authentication experience...
              </p>
            </div>
          </div>

          {/* Loading Animation */}
          <div className="flex items-center justify-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-center text-sm text-gray-500">
              Securing your connection...
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 gap-3 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secure SSL Connection</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
              <span>Two-Factor Authentication</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
              <span>Advanced Security</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -z-10 top-10 right-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute -z-10 bottom-10 left-10 w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute -z-10 top-1/2 left-0 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-1000"></div>
      </div>
    </div>
  );
}