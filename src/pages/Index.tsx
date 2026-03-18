import AtmosphereLayer from "@/components/AtmosphereLayer";
import GreetingHeader from "@/components/GreetingHeader";
import CartoonCake from "@/components/CartoonCake";
import SideFireworks from "@/components/SideFireworks";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-between py-[8vh]">
      <AtmosphereLayer />
      <SideFireworks side="left" />
      <SideFireworks side="right" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-between flex-1 w-full max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="pt-4">
          <GreetingHeader />
          <p
            className="font-body text-center mt-4 font-medium tracking-wide"
            style={{
              color: "hsl(var(--birthday-magenta))",
              fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
              opacity: 0.7,
            }}
          >
            Wishing you a wonderful day! ✨
          </p>
        </div>

        {/* Cake */}
        <div className="flex items-end justify-center pb-4">
          <CartoonCake />
        </div>
      </div>
    </div>
  );
};

export default Index;
