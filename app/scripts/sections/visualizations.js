(function() {
  const DASHBOARD_URL = 'https://app.periscopedata.com/shared/4dff3c25-3a2d-4466-955c-3f3638b89fb9?embed=true';

  let loaded = false;

  window.addEventListener('scroll', loadDashboard);
  window.addEventListener('resize-complete', reflowDashboard);

  adjustHeight();

  /**
   * Load the dashboard if it hasn't been loaded yet.
   *
   * @param {boolean} reload true if we want to force reloading the dashboard
   */
  function loadDashboard(reload) {
    if (!loaded || reload === true) {
      document.getElementById('viz').src = DASHBOARD_URL;
      loaded = true;
    }
  }

  /**
   * Reload the dashboard in response to screen size change.
   */
  function reflowDashboard() {
    loadDashboard(true);
    adjustHeight();
  }

  /**
   * Adjust the height of the data viz.
   */
  function adjustHeight() {
    const viz = document.getElementById('viz');

    if (viz.offsetWidth <= 500) {
      viz.height = 1950;
    } else {
      viz.height = 2600;
    }
  }
})();
