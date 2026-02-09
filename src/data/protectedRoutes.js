/**
 * Certified Protection Configuration
 * Manage password-protected routes and folders here.
 */

const protectedRoutes = [
  {
    // Protect entire documentation
    path: '/docs',
    accessKey: 'TM-iam-2026!',
    storageKey: 'tm-docs-access',
    title: 'Talents Mapping Documentation',
    description: 'This documentation is protected. Please enter your access key to continue.',
  },
];

export default protectedRoutes;
