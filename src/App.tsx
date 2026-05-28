import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/common/Toast';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { WallClock } from './components/clock/WallClock';
import { PublicPage } from './pages/PublicPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import './styles/globals.css';

function CosmicBackground() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number }>>([]);

  useEffect(() => {
    // Generate random stars
    const generatedStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <>
      {/* Floating orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      {/* Starfield */}
      <div className="starfield">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          />
        ))}
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay"></div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <CosmicBackground />
            <Routes>
              {/* Public route */}
              <Route path="/" element={<PublicPage />} />

              {/* Auth routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected admin route */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Premium cosmic widgets */}
            <WallClock />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
