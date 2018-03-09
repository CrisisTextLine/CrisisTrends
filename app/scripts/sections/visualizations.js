(function() {
  let loaded = false;

  window.addEventListener('scroll', loadDashboard);
  window.addEventListener('resize-complete', reflowDashboard);
  window.addEventListener('message', messageHandler);

  /**
   * @param {Event} e Message event object
   */
  function messageHandler(e) {
    const {origin, data} = e;
    const domain = window.config.visualizations.domain;

    if (origin !== domain || data.event_type !== 'dashboard_resize') {
      return;
    }

    adjustHeight(data.dashboard_height);
  }

  /**
   * @return {string} size
   */
  function getDashboardSizeName() {
    const viewportWidths = config.visualizations.constants.viewportWidths;
    const width = window.innerWidth;
    const size = Object.entries(viewportWidths)
      .filter(([name, size]) => width < size)   // Remove viewport sizes smaller than current viewport
      .reduce((currentLargest, currentSize) => {
        // If the current size is bigger than the largest size seen so far,
        // then return that one, otherwise return the existing largest seen so far
        return currentSize[1] > currentLargest[1] ? currentSize : currentLarget;
      }, ['desktop', width]); // Start with the smallest size to start width

    return size[0];
  }

  /**
   * Gets the dahsboard url for a given size
   * @param {string} size Name of size to get dashboard for
   * @return {string} dashboardUrl
   */
  function getDashboardUrl(size = getDashboardSizeName()) {
    const domain = window.config.visualizations.domain;
    const dashboardId = window.config.visualizations.dashboards[size];

    return `${domain}/shared/${dashboardId}?embed=true`;
  }

  /**
   * Load the dashboard if it hasn't been loaded yet.
   *
   * @param {boolean} reload true if we want to force reloading the dashboard
   */
  function loadDashboard(reload) {
    if (!loaded || reload === true) {
      document.getElementById('viz').src = getDashboardUrl();
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
   * @param {number} height The height of the iframed document
   */
  function adjustHeight(height = getDefaultVizHeight()) {
    const viz = document.getElementById('viz');
    viz.style.height = `${height + 15}px`;
  }

  /**
   * @return {number} height
   */
  function getDefaultVizHeight() {
    const heights = config.visualizations.constants.vizHeights;
    const size = getDashboardSizeName();

    return heights[size];
  }
})();
