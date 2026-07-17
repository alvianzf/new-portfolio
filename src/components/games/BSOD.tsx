import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@mui/material';

interface BSODProps {
  error: string;
  onRestart: () => void;
}

export default function BSOD({ error, onRestart }: BSODProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0078D7] text-white flex flex-col items-center justify-center p-8 font-mono cursor-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="max-w-3xl w-full space-y-8"
      >
        <div className="text-9xl mb-8">:(</div>
        <h1 className="text-4xl">Your PC ran into a problem and needs to restart.</h1>
        <p className="text-2xl">We're just collecting some error info, and then we'll restart for you.</p>
        <div className="text-xl pt-8">
          <p>0% complete</p>
          <div className="mt-8 flex items-start gap-4">
            <div className="w-24 h-24 bg-white p-2">
              <div className="w-full h-full bg-[#0078D7] flex items-center justify-center border-4 border-[#0078D7]">
                <div className="w-16 h-16 bg-white" />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p>For more information about this issue and possible fixes, visit https://www.windows.com/stopcode</p>
              <p>If you call a support person, give them this info:</p>
              <p>Stop code: {error}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={onRestart}
          variant="contained"
          startIcon={<RefreshCcw className="w-5 h-5" />}
          sx={{ mt: 6, px: 4, py: 1.5, bgcolor: 'white', color: '#0078D7', fontWeight: 'bold', borderRadius: 1, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' } }}
        >
          MANUAL REBOOT
        </Button>
      </motion.div>
    </div>
  );
}
