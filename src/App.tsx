import { CIDRCalculator } from "./components/CIDR";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow items-center justify-center">
        <CIDRCalculator />
      </div>
      <Footer />
    </div>
  );
}

export default App;
