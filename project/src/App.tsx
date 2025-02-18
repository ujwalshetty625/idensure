import React, { useState } from 'react';
import { Shield, Lock, Database, ChevronRight, Wallet, Key, Upload, FileCheck, FileWarning, CheckCircle, XCircle, Link, FileText, Building2, UserCircle, Search } from 'lucide-react';

function App() {
  const [userType, setUserType] = useState(null);
  const [activeSection, setActiveSection] = useState('main');
  const [documentStatus, setDocumentStatus] = useState({
    passport: false,
    license: false,
    address: false
  });
  const [zkpDemo, setZkpDemo] = useState({
    age: '',
    isVerifying: false,
    isVerified: false
  });
  const [blockchainDemo, setBlockchainDemo] = useState({
    selectedDoc: null,
    isHashing: false,
    isVerified: false,
    hash: ''
  });
  const [verificationRequests, setVerificationRequests] = useState([
    { id: 1, user: "John Doe", type: "Age Verification", status: "pending", date: "2024-03-15" },
    { id: 2, user: "Alice Smith", type: "Identity Proof", status: "approved", date: "2024-03-14" },
    { id: 3, user: "Bob Wilson", type: "Address Verification", status: "rejected", date: "2024-03-13" }
  ]);

  // Role selection screen
  if (userType === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#2D1B69] to-[#1E3A8A] gradient-animate flex items-center justify-center px-4">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center slide-up">
            <Shield className="w-16 h-16 text-cyan-400 mx-auto animate-float" />
            <h1 className="mt-6 text-4xl font-bold text-white">Select Your Role</h1>
            <p className="mt-2 text-xl text-gray-300">Choose how you want to use IdEnsure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setUserType("user")}
              className="p-6 bg-black/40 backdrop-blur-lg rounded-lg border border-cyan-400/20 hover:border-cyan-400 transition-all card-hover slide-up stagger-1"
            >
              <UserCircle className="w-12 h-12 text-cyan-400 mb-4 spin-hover" />
              <h2 className="text-xl font-bold text-white mb-2">I am a User</h2>
              <p className="text-gray-400">Create your digital identity wallet and manage verifications</p>
            </button>

            <button
              onClick={() => setUserType("agency")}
              className="p-6 bg-black/40 backdrop-blur-lg rounded-lg border border-cyan-400/20 hover:border-cyan-400 transition-all card-hover slide-up stagger-2"
            >
              <Building2 className="w-12 h-12 text-cyan-400 mb-4 spin-hover" />
              <h2 className="text-xl font-bold text-white mb-2">I am an Agency/Service</h2>
              <p className="text-gray-400">Request and validate user identity proofs</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Agency Dashboard
  if (userType === "agency") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#2D1B69] to-[#1E3A8A] gradient-animate">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8 slide-up">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-cyan-400 animate-float" />
              <h1 className="text-2xl font-bold text-white ml-2">Agency Dashboard</h1>
            </div>
            <button
              onClick={() => setUserType(null)}
              className="px-4 py-2 bg-black/40 text-white rounded-lg hover:bg-black/60 transition-colors button-glow"
            >
              Switch Role
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Pending Requests", value: "5", color: "yellow", delay: "stagger-1" },
              { label: "Approved Verifications", value: "12", color: "green", delay: "stagger-2" },
              { label: "Total Requests", value: "18", color: "blue", delay: "stagger-3" }
            ].map((stat, index) => (
              <div key={index} className={`bg-black/40 backdrop-blur-lg rounded-lg p-6 card-hover slide-up ${stat.delay}`}>
                <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                <p className={`text-2xl font-bold text-${stat.color}-400 mt-2`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Verification Requests */}
          <div className="bg-black/40 backdrop-blur-lg rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Verification Requests</h2>
              <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                New Request
              </button>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 pl-10 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {verificationRequests.map((request) => (
                <div key={request.id} className="p-4 bg-black/60 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white font-medium">{request.user}</h4>
                      <p className="text-sm text-gray-400">{request.type}</p>
                      <p className="text-xs text-gray-500 mt-1">{request.date}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        request.status === "approved"
                          ? "bg-green-400/10 text-green-400"
                          : request.status === "rejected"
                          ? "bg-red-400/10 text-red-400"
                          : "bg-yellow-400/10 text-yellow-400"
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Integration */}
          <div className="bg-black/40 backdrop-blur-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">API Integration</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
                <input
                  type="text"
                  value="sk_test_idensure_xxxxxxxxxxxx"
                  readOnly
                  className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Webhook URL</label>
                <input
                  type="text"
                  value="https://api.yourdomain.com/idensure/webhook"
                  className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div className="p-4 border border-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-2">Quick Start</h4>
                <pre className="text-sm text-gray-400 overflow-x-auto">
                  {`curl -X POST https://api.idensure.com/v1/verify \\
  -H "Authorization: Bearer sk_test_idensure_xxxxxxxxxxxx" \\
  -d "user_id=123" \\
  -d "type=age_verification"`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#2D1B69] to-[#1E3A8A] gradient-animate">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 slide-up">
          <h1 className="text-4xl font-bold text-white">SECURE YOUR DIGITAL IDENTITY</h1>
          <button
            onClick={() => setUserType(null)}
            className="px-4 py-2 bg-black/40 text-white rounded-lg hover:bg-black/60 transition-colors button-glow"
          >
            Switch Role
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Digital Wallet Section */}
          <div
            className="p-6 bg-black/40 backdrop-blur-lg rounded-lg cursor-pointer hover:bg-black/50 transition-all card-hover slide-up stagger-1"
            onClick={() => setActiveSection('wallet')}
          >
            <Wallet className="w-12 h-12 text-cyan-400 mb-4 spin-hover" />
            <h2 className="text-xl font-bold text-white mb-2">Digital Wallet</h2>
            <p className="text-gray-400">Securely store and manage your digital identity documents</p>
            <ChevronRight className="w-6 h-6 text-cyan-400 mt-4" />
          </div>

          {/* ZKP Demo Section */}
          <div
            className="p-6 bg-black/40 backdrop-blur-lg rounded-lg cursor-pointer hover:bg-black/50 transition-all card-hover slide-up stagger-2"
            onClick={() => setActiveSection('zkp')}
          >
            <Key className="w-12 h-12 text-cyan-400 mb-4 spin-hover" />
            <h2 className="text-xl font-bold text-white mb-2">ZKP Demo</h2>
            <p className="text-gray-400">Experience zero-knowledge proofs in action</p>
            <ChevronRight className="w-6 h-6 text-cyan-400 mt-4" />
          </div>

          {/* Blockchain Security Section */}
          <div
            className="p-6 bg-black/40 backdrop-blur-lg rounded-lg cursor-pointer hover:bg-black/50 transition-all card-hover slide-up stagger-3"
            onClick={() => setActiveSection('blockchain')}
          >
            <Lock className="w-12 h-12 text-cyan-400 mb-4 spin-hover" />
            <h2 className="text-xl font-bold text-white mb-2">Blockchain Security</h2>
            <p className="text-gray-400">Explore how blockchain protects your identity</p>
            <ChevronRight className="w-6 h-6 text-cyan-400 mt-4" />
          </div>
        </div>

        {/* Digital Wallet Interface */}
        {activeSection === 'wallet' && (
          <div className="mt-8 p-6 bg-black/40 backdrop-blur-lg rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Digital Wallet</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-black/60 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Passport</h3>
                  {documentStatus.passport ? (
                    <FileCheck className="w-6 h-6 text-green-400" />
                  ) : (
                    <Upload
                      className="w-6 h-6 text-cyan-400 cursor-pointer"
                      onClick={() => handleDocumentUpload('passport')}
                    />
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {documentStatus.passport ? 'Verified' : 'Upload your passport'}
                </p>
              </div>

              <div className="p-4 bg-black/60 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Driver's License</h3>
                  {documentStatus.license ? (
                    <FileCheck className="w-6 h-6 text-green-400" />
                  ) : (
                    <Upload
                      className="w-6 h-6 text-cyan-400 cursor-pointer"
                      onClick={() => handleDocumentUpload('license')}
                    />
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {documentStatus.license ? 'Verified' : "Upload your driver's license"}
                </p>
              </div>

              <div className="p-4 bg-black/60 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Address Proof</h3>
                  {documentStatus.address ? (
                    <FileCheck className="w-6 h-6 text-green-400" />
                  ) : (
                    <Upload
                      className="w-6 h-6 text-cyan-400 cursor-pointer"
                      onClick={() => handleDocumentUpload('address')}
                    />
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {documentStatus.address ? 'Verified' : 'Upload address proof'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ZKP Demo Interface */}
        {activeSection === 'zkp' && (
          <div className="mt-8 p-6 bg-black/40 backdrop-blur-lg rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Zero-Knowledge Proof Demo</h2>
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Enter your age (it won't be revealed)
                </label>
                <input
                  type="number"
                  value={zkpDemo.age}
                  onChange={(e) => setZkpDemo({ ...zkpDemo, age: e.target.value })}
                  className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white"
                  placeholder="Enter age"
                />
              </div>
              <button
                onClick={() => verifyAge()}
                className="w-full px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                disabled={zkpDemo.isVerifying}
              >
                {zkpDemo.isVerifying ? 'Verifying...' : 'Prove Age (18+)'}
              </button>
              {zkpDemo.isVerified && (
                <div className="mt-4 p-4 bg-green-400/10 border border-green-400 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <p className="text-green-400">Age verified without revealing the actual number!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blockchain Security Interface */}
        {activeSection === 'blockchain' && (
          <div className="mt-8 p-6 bg-black/40 backdrop-blur-lg rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Blockchain Security</h2>
            <div className="space-y-6">
              <div className="p-4 bg-black/60 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Document Verification</h3>
                <div className="space-y-4">
                  {['passport', 'license', 'address'].map((doc) => (
                    <div key={doc} className="flex items-center justify-between">
                      <span className="text-gray-400 capitalize">{doc} Document</span>
                      <button
                        onClick={() => simulateBlockchainVerification(doc)}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                        disabled={blockchainDemo.isHashing}
                      >
                        Verify on Blockchain
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {blockchainDemo.isHashing && (
                <div className="p-4 bg-yellow-400/10 border border-yellow-400 rounded-lg">
                  <div className="flex items-center">
                    <FileWarning className="w-5 h-5 text-yellow-400 mr-2" />
                    <p className="text-yellow-400">Verifying document on blockchain...</p>
                  </div>
                </div>
              )}

              {blockchainDemo.isVerified && (
                <div className="p-4 bg-green-400/10 border border-green-400 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <p className="text-green-400">Document verified on blockchain!</p>
                  </div>
                  <p className="text-sm text-gray-400">Transaction Hash: {blockchainDemo.hash}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;