import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingContact } from './components/layout/FloatingContact';
import { QuoteModal } from './components/common/QuoteModal';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SmoothScrollProvider } from './components/common/SmoothScrollProvider';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Sustainability } from './pages/Sustainability';
import { QualityCompliance } from './pages/QualityCompliance';
import { CustomSolutions } from './pages/CustomSolutions';
import { Industries } from './pages/Industries';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteDefaultProduct, setQuoteDefaultProduct] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (productName?: string) => {
    setQuoteDefaultProduct(productName);
    setQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setQuoteModalOpen(false);
    setQuoteDefaultProduct(undefined);
  };

  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          {/* Sticky Header */}
          <Header onOpenQuoteModal={() => handleOpenQuoteModal()} />

          {/* Main Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} />
              <Route path="/about" element={<About onOpenQuoteModal={() => handleOpenQuoteModal()} />} />
              <Route path="/products" element={<Products onOpenQuoteModal={handleOpenQuoteModal} />} />
              <Route path="/products/:slug" element={<ProductDetail onOpenQuoteModal={handleOpenQuoteModal} />} />
              <Route path="/sustainability" element={<Sustainability onOpenQuoteModal={() => handleOpenQuoteModal()} />} />
              <Route path="/quality" element={<QualityCompliance onOpenQuoteModal={() => handleOpenQuoteModal()} />} />
              <Route path="/custom-solutions" element={<CustomSolutions onOpenQuoteModal={() => handleOpenQuoteModal()} />} />
              <Route path="/industries" element={<Industries onOpenQuoteModal={handleOpenQuoteModal} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Floating Quick Contact Widget */}
          <FloatingContact onOpenQuote={() => handleOpenQuoteModal()} />

          {/* Commercial Quote Modal */}
          <QuoteModal
            isOpen={quoteModalOpen}
            onClose={handleCloseQuoteModal}
            defaultProduct={quoteDefaultProduct}
          />
        </div>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
};

export default App;
