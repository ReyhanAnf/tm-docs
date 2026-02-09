import { useLocation } from '@docusaurus/router';
import ProtectedDoc from '@site/src/components/ProtectedDoc';
import protectedRoutes from '@site/src/data/protectedRoutes';

/**
 * Root component wrapper for Docusaurus
 * Automatically protects specific routes based on configuration
 */
export default function Root({ children }) {
  const location = useLocation();

  // Check if current path matches any protected route
  const protectedRoute = protectedRoutes.find(route =>
    location.pathname.startsWith(route.path)
  );

  // Debug logging
  // console.log('🔒 Root.js - Current path:', location.pathname);
  // console.log('🔒 Root.js - Protected route found:', protectedRoute);

  // If route is protected, wrap with ProtectedDoc
  if (protectedRoute) {
    return (
      <ProtectedDoc
        accessKey={protectedRoute.accessKey}
        storageKey={protectedRoute.storageKey}
        title={protectedRoute.title}
        description={protectedRoute.description}>
        {children}
      </ProtectedDoc>
    );
  }

  // Otherwise, render normally
  return <>{children}</>;
}
