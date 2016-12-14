/* eslint-env browser */

(function() {
  const DASHBOARD_URL = 'http://public.tableausoftware.com/views/crisistrends2dec132016/WorkingDashMobile?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableausoftware.com%2F&:tabs=no&:toolbar=top&:animate_transition=yes&:display_static_image=no&:display_spinner=yes&:display_overlay=yes&:display_count=yes&:loadOrderID=0';

  let loaded = false;

  window.addEventListener('scroll', loadDashboard);
  window.addEventListener('resize-complete', reflowDashboard);

  /**
   * Load the dashboard if it hasn't been loaded yet.
   */
  function loadDashboard(reload) {
    if (!loaded || reload === true) {
      document.getElementById('viz').src = DASHBOARD_URL;
      loaded = true;
    }
  }

  function reflowDashboard() {
    loadDashboard(true);

    const viz = document.getElementById('viz');

    if (viz.offsetWidth <= 500) {
      viz.height = 1800;
    } else {
      viz.height = 900;
    }
  }
})();
