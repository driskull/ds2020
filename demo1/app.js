require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/FeatureTable"
], function(WebMap, MapView, Legend, FeatureTable) {
  let view, table;

  const map = new WebMap({
    portalItem: { id: "f5a89635bb394f7da2f9c82cdd73e459" }
  });

  map.load().then(function() {
    view = new MapView({
      container: "viewDiv",
      center: [-73.98, 40.75],
      zoom: 11,
      map: map
    });

    const legend = new Legend({
      view: view
    });
    view.ui.add(legend, "top-right");

    const customAction = {
      title: "Table",
      id: "table-action",
      className: "esri-icon-table"
    };
    view.popup.actions.push(customAction);

    // Event handler that fires each time an action is clicked.
    view.popup.on("trigger-action", function(event) {
      // Execute the openTable() function if the 'table-action' action is clicked
      if (event.action.id === "table-action") {
        openTable(event);
        view.popup.close();
      }
    });

    function openTable(event) {
      const layer = event.target.selectedFeature.layer;

      if (table) {
        table.destroy();
        table = null;
      }

      const tableDiv = document.createElement("div");
      tableDiv.className = "table-container";
      view.ui.add(tableDiv, "manual");

      table = new FeatureTable({
        layer: layer,
        container: tableDiv
      });
    }
  });
});
