import React from "react";
import { motion } from "framer-motion";
import MembershipBackground from "./MembershipBackground";
import MembershipContent from "./MembershipContent";
import MembershipBenefits from "./MembershipBenefits";
import MembershipForm from "./MembershipForm";

const MembershipSection = () => {
  return (
    <section className="w-full py-20 sm:py-24 px-4 sm:px-6">
      <div className="relative max-w-7xl mx-auto rounded-[40px] overflow-hidden">
        <MembershipBackground />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-10 sm:p-14 lg:p-20">
          <div className="flex flex-col gap-8">
            <MembershipContent />
            <MembershipBenefits />
            <MembershipForm />
          </div>

          {/* floating sneaker + soft lighting + blurred decorative shapes */}
          <div className="relative hidden lg:flex items-center justify-center h-[420px]">
            <div className="absolute w-72 h-72 rounded-full bg-[#CFFF04]/10 blur-[100px]" />
            <div className="absolute top-8 right-10 w-24 h-24 rounded-full bg-[#FF4526]/10 blur-3xl" />
            <div className="absolute bottom-10 left-6 w-20 h-20 rounded-full border border-[#CFFF04]/15" />

            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ rotate: 8 }}
            >
              <svg
                viewBox="0 0 420 260"
                className="w-80 sm:w-96 h-auto drop-shadow-[0_35px_45px_rgba(0,0,0,0.5)]"
              >
                <path
                  d="M40 190 C 40 150, 70 140, 110 138 C 150 136, 170 110, 220 100
                     C 270 90, 300 95, 330 115 C 360 135, 380 150, 380 175
                     L 380 195 C 380 205, 372 210, 360 210
                     L 60 210 C 48 210, 40 202, 40 190 Z"
                  fill="#F5F3EE"
                />
                <path
                  d="M110 138 C 150 136, 170 110, 220 100 C 250 94, 272 95, 292 102"
                  stroke="#CFFF04"
                  strokeWidth="7"
                  fill="none"
                  strokeLinecap="round"
                />
                <rect
                  x="60"
                  y="196"
                  width="300"
                  height="14"
                  rx="7"
                  fill="#CFFF04"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
