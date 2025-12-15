import React from 'react';

interface InstallPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ onInstall, onDismiss }) => {
  return (
    <div className="fixed bottom-6 left-4 right-4 z-40 animate-slide-in sm:left-auto sm:right-6 sm:w-96">
      <div className="bg-gray-900/95 backdrop-blur-xl text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10 ring-1 ring-white/20">
        <div className="flex items-center gap-3.5">
           {/* App Icon Container */}
           <div className="h-11 w-11 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
           </div>
           <div>
               <h3 className="font-bold text-sm leading-tight text-white">Install App</h3>
               <p className="text-[11px] text-indigo-200 mt-0.5 font-medium">Get the best experience</p>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
                onClick={onDismiss}
                className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <button 
                onClick={onInstall}
                className="bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-white/10 hover:bg-gray-50 active:scale-95 transition-all whitespace-nowrap"
            >
                Download
            </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;