import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  console.log('🔒 Protected Routes Plugin Loaded');
}

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({ location }) {
      console.log('🔒 Route updated:', location.pathname);
    },
  };
})();
